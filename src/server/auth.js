const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

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
            INSERT INTO user (first_name, last_name, email, password, is_auth) 
            VALUES('${firstName}', '${lastName}', '${email}', '${hashPassword}', '${0}')
            `;

            return connect.query(sql);
        })
        .then(result => {
            return res.json({message: 'Пользователь успешно зарегистрирован', success: true});
        })
        .catch(err => {
            //return res.json({message: 'Произошла ошибка при регистрации', success: false});
        });
});

router.post('/login', (req, res) => {
    const connect = connect_db();

    if (req.cookies['token']) {
        const email = req.cookies['token'];
        const sql = `SELECT * FROM user WHERE email = "${email}"`;
        connect.query(sql)
            .then(result => {
                const user = {...result[0][0]};
                res.json({message: 'Вы успешно авторизовались', success: true, user});
            })
            .catch(err => {
                res.json({message: 'Ошибка при получении пользователя по email', success: false});
            });
    }

    if (!connect) {
        console.log('Произошла ошибка при подключении к базе данных');
    }
    console.log('Соединение с базой данной mysql успешно установлено');

    const {email, password} = req.body;

    const sql = `SELECT * FROM user WHERE email = "${email}"`;
    let user = {};
    connect.query(sql)
        .then(result => {
            if (result[0].length < 1) res.json({message: 'Пользователь не найден', success: false});

            if (result[0].length > 1) {
                res.json({message: 'Из базы данных получено больше одного пользователя', success: false});
            }

            user = {...result[0][0]};

            if (!bcrypt.compareSync(password, user.password)) {
                res.json({message: `Неверный пароль для пользователя с email ${email}`, success: false});
            }

            const sql = `UPDATE user SET is_auth=${1} WHERE email='${email}'`;
            return connect.query(sql);
        })
        .then(result => {
            user['is_auth'] = 1;
            res.cookie('token', email);
            res.json({message: 'Вы успешно авторизовались', success: true, user: user});
        })
        .catch(err => {
            //res.json({message: 'Произошла ошибка при авторизации', success: false});
        });
});

router.post('/logout', (req, res) => {
    const connect = connect_db();

    const sql = `UPDATE user SET is_auth=${0} WHERE email='${req.body.email}'`;
    connect.query(sql)
        .then(result => {
            res.clearCookie('token');
            res.json({message: 'Вы успешно вышли из профиля', success: true, 'is_auth': 0});
        })
        .catch(err => {
            res.json({message: 'Произошла ошибка при выходе из профиля', success: false});
        });
});

module.exports = router;