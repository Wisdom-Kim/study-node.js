const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.WishList = require('./wishlist')(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.User.hasMany(db.WishList);
db.WishList.belongsTo(db.User);

module.exports = db;