const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

const app = express();

const connect_db = () => {
    return mysql.createConnection({
        host: 'localhost',
        database: 'mydb',
        user: 'root',
        password: 'root'
    }).promise();
}

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const connect = connect_db();

    let data = {pizzas: []};

    connect.connect()
        .then(result => {
            const sql = 'SELECT * FROM pizzas';
            return connect.query(sql);
        })
        .then(result => {
            data.pizzas = result[0];

            const sql = 'SELECT * FROM sizes';
            return connect.query(sql);
        }).then(result => {

        for (let i = 0; i < data.pizzas.length; i++) {
            data.pizzas[i].sizes = [];
            data.pizzas[i].sizes.push({...result[0][0]});
            data.pizzas[i].sizes.push({...result[0][1]});
            data.pizzas[i].sizes.push({...result[0][2]});
        }

        const sql = 'SELECT * FROM prices';
        return connect.query(sql);
    }).then(result => {
        for (let i = 0; i < result[0].length; i++) {
            let pizza = data.pizzas.find(d => d.id === result[0][i]['pizza_id']);
            let p_sizes = pizza.sizes.find(ps => ps.size === result[0][i].size);
            p_sizes.price = result[0][i].price;
        }

        const sql = 'SELECT * FROM pizza_types';
        return connect.query(sql);
    }).then(result => {
        data.pizzas.forEach(d => {
            d.types = [];
        });
        data.pizzas.forEach((d, i) => {
            d.types[0] = result[0][0];
            d.types[1] = result[0][1];
        });

        const sql = 'SELECT pizzas.id, default_type FROM pizzas JOIN pizza_types ON pizzas.default_type = pizza_types.id';
        return connect.query(sql);
    }).then(result => {
        for (let i = 0; i < result[0].length; i++) {
            const d = data.pizzas.find(d => d.id === result[0][i].id);
            d.defaultType = result[0][i]['default_type'];
        }

        const sql = 'SELECT * FROM pizza_tastes';
        return connect.query(sql);
    }).then(result => {
        data.tastesData = {};
        data.tastesData.tastes = result[0];

        data.tastesData.tastes.unshift({id: data.tastesData.tastes[data.tastesData.tastes.length - 1].id + 1, taste: 'Все'});
        data.tastesData.activeTaste = data.tastesData.tastes[0].id;

        const sql = 'SELECT * FROM tastes';
        return connect.query(sql);
    }).then(result => {

        for (let i = 0; i < data.pizzas.length; i++) {
            data.pizzas[i].tastes = result[0].filter(item => item['pizza_id'] === data.pizzas[i].id);
        }

        res.send(data);
    })
        .catch(err => console.log(err));
});

app.get('/pizza/:id', (req, res) => {
    const defaultFilePath = path.join(__dirname, 'img', 'pizza' + 1 + '.png');
    const filePath = path.join(__dirname, 'img', 'pizza' + req.params.id + '.png');

    try {
        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        }
        throw new Error('Указаного файла не существует');
    } catch (err) {
        console.error(err);
        return res.sendFile(defaultFilePath);
    }
});

app.listen(3001);