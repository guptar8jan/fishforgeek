import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from '../config';

var sequelize = new Sequelize(config.db.name, config.db.userName, config.db.password, {
  host: config.db.host,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var db2 = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'db.js')
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db2[model.name] = model;
    })
Object.keys(db2).forEach(function (modelName) {
    if (db2[modelName].options.hasOwnProperty('associate')) {
        db2[modelName].options.associate(db2)
        console.log(modelName);
    }
});
module.exports = Sequelize.Utils._.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db2)
