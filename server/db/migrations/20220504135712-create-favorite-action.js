module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FavoriteActions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      favoriteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Favorites',
        },
      },
      action: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('FavoriteActions');
  },
};
