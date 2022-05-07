const ApiError = require('../exceptions/apiError');

const log = console;

// eslint-disable-next-line func-names
module.exports = function (error, req, res) {
  log.log(error);
  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json({ message: error.message, errors: error.errors });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
