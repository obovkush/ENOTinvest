const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FavoriteAction extends Model {
    static associate({ Favorite }) {
      FavoriteAction.belongsTo(Favorite, { foreignKey: 'favoriteId' });
    }
  }
  FavoriteAction.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      favoriteId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Favorites',
        },
      },
      action: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'FavoriteAction',
      tableName: 'FavoriteActions',
    },
  );
  return FavoriteAction;
};
