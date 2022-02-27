'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const dotenv = require('dotenv');

let db = [];

dotenv.config();
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE
} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host : DB_HOST,
  dialect : 'mysql',
  operatorsAliases : 0,
  pool : {
    max:5,
    min:0,
    idle:10000,
  }
})


//models 디렉토리의 내용을 판독하기 위해 사용 
//즉, 모델들을 데이터베이스의 테이블로 맵핑하는 과정
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;
db.QueryTypes = QueryTypes;

module.exports = db;
