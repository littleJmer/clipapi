import fs from 'fs';
import path from 'path';
import CONFIG from '@config';

const mysql = require('mysql2/promise');

const { Sequelize } = require('sequelize');
const { DATABASE: {
    DB: database,
    USER: user,
    PASSWORD: password,
    HOST: host,
    PORT: port,
    DIALECT: dialect
} } = CONFIG;

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect
});

fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file)).default(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).map(modelName => db[modelName].associate(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const initDB = () => {
    mysql.createConnection({ host, port, user, password }).then((connection) => {

        connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`).then(() => {
            // Safe to use sequelize now
            sequelize
                .sync({ force: false, alter: true })
                .then(function () {
                    console.log(`<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>`);
                    console.log('Clip API is ready to be use! 🦄 🎉');
                    console.log('Developed by Manuel Escobedo 👨‍💻');
                    console.log(`<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>`);
                })
                .catch(function (error) { });
        }).catch(error => { })

    }).catch(err => {
        console.log(`MySQL container is not running yet, trying on 10 seconds again`);
        setTimeout(() => { initDB(); }, 10000);
    })
}
initDB();

export default db;
