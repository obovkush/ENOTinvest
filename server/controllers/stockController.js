const finnhub = require('finnhub');

class StockController {

    eng(req, res, next) {
      const { api_key } = finnhub.ApiClient.instance.authentications;
      api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50';// Replace this
      const finnhubClient = new finnhub.DefaultApi();
  
      finnhubClient.quote('AAPL', (error, data, response) => {
        res.json(data);
      });
  }
}

module.exports = new StockController();
