const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StockENG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StockENG.init({
    title: DataTypes.STRING,
    o: DataTypes.INTEGER,
    h: DataTypes.INTEGER,
    l: DataTypes.INTEGER,
    c: DataTypes.INTEGER,
    pc: DataTypes.INTEGER,
    d: DataTypes.INTEGER,
    dp: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'StockENG',
  });
  return StockENG;
};
