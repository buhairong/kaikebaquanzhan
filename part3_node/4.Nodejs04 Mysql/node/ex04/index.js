const Sequelize = require('sequelize');

// 哈希算法
module.exports.initModel = async sequelize => {
  const User = sequelize.define('user', { name: Sequelize.STRING });
  const Product = sequelize.define('product', { title: Sequelize.STRING });
  Product.belongsTo(User);
  User.hasMany(Product);

  return { User, Product }
} 
