const app = require('../src/app');
const sequelize = require('../src/config/database');
const Product = require('../src/models/Product');
const Category = require('../src/models/Category');

Category.hasMany(Product, {
  foreignKey: 'categoryId'
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId'
});

let databaseReady = false;

module.exports = async (req, res) => {
  if (!databaseReady) {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    databaseReady = true;
  }

  return app(req, res);
};
