const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};


const sequelize = new Sequelize(
  config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    operatorsAliases: 0,
    pool: {
      max:5,
      min:0,
      idle:10000,
    }
  },
);

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
db.user = require('./user')(sequelize, Sequelize);
db.post = require('./post')(sequelize, Sequelize);
db.wishlist = require('./wishlist')(sequelize, Sequelize);

db.user.hasMany(db.post);
db.post.belongsTo(db.user);
db.user.hasMany(db.wishlist);
db.wishlist.belongsTo(db.user);

module.exports = db;