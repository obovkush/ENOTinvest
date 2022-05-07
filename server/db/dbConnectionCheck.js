const { sequelize } = require('./models');

const log = console;

module.exports = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync();
    log.log('Database ENOTinvest is up');
  } catch (error) {
    log.log('Database ENOTinvest is down', error.message);
  }
};
