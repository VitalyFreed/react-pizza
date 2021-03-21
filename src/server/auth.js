const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const router = express.Router();

const connect_db = () => {
    return mysql.createConnection({
        host: 'localhost',
        database: 'mydb',
        user: 'root',
        password: 'root'
    }).promise();
};

router.post('/registration', (req, res) => {
    const connect = connect_db();

    if (!connect) {
        console.log('Произошла ошибка при подключении к базе данных');
    }
    console.log('Соединение с базой данной mysql успешно установлено');

    const {firstName, lastName, email, password} = req.body;

    let sql = `SELECT email FROM user WHERE email = "${email}"`;

    connect.query(sql)
        .then(result => {
            if (result[0].length > 0) {
                return res.json({message: 'Пользователь с таким email уже существует', success: false});
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            sql = `
            INSERT INTO user (first_name, last_name, email, password) 
            VALUES('${firstName}', '${lastName}', '${email}', '${hashPassword}')
            `;

            return connect.query(sql);
        })
        .then(result => {
            return res.json({message: 'Пользователь успешно зарегистрирован', success: true});
        })
        .catch(err => {
            return res.json({message: 'Произошла ошибка при регистрации', success: false});
        });
});

router.post('/login', (req, res) => {
    if (req.cookies['token']) {
        return res.json({message: 'Вы успешно авторизовались', success: true});
    }

    const connect = connect_db();

    if (!connect) {
        console.log('Произошла ошибка при подключении к базе данных');
    }
    console.log('Соединение с базой данной mysql успешно установлено');

    const {email, password} = req.body;

    const sql = `SELECT * FROM user WHERE email = "${email}"`;

    connect.query(sql)
        .then(result => {
            if (result[0].length < 1) return res.json({message: 'Пользователь не найден', success: false});

            if (result[0].length > 1) {
                return res.json({message: 'Из базы данных получено больше одного пользователя', success: false});
            }

            const user = result[0][0];

            if (!bcrypt.compareSync(password, user.password)) {
                return res.json({message: `Неверный пароль для пользователя с email ${email}`, success: false});
            }

            res.cookie('token', email);
            return res.json({message: 'Вы успешно авторизовались', success: true, user});
        })
        .catch(err => {
            return res.json({message: 'Произошла ошибка при авторизации', success: false});
        });
});

module.exports = router;