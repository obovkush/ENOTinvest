const finnhub = require('finnhub');

class StockController {

  NFLX(req, res, next) {
    const {
      api_key
    } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50';
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('NFLX', (error, data, response) => res.json(data));
  }

  INTC(req, res, next) {
    const {
      api_key
    } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50';
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('INTC', (error, data, response) => res.json(data));
  }

  NVDA(req, res, next) {
    const {
      api_key
    } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50';
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('NVDA', (error, data, response) => res.json(data));
  }

  AAPL(req, res, next) {
    const {
      api_key
    } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50';
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('AAPL', (error, data, response) => res.json(data))
  }

  TWTR(req, res, next) {
    const {
      api_key
    } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50';
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('TWTR', (error, data, response) => res.json(data))
  }

  DIS(req, res, next) {
    const {
      api_key
    } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50';
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('DIS', (error, data, response) => res.json(data))
  }

  AMZN(req, res, next) {
    const {
      api_key
    } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50';
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('AMZN', (error, data, response) => res.json(data));
  }

  TSLA(req, res, next) {
    const {
      api_key
    } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50';
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('TSLA', (error, data, response) => res.json(data));
  }
}

module.exports = new StockController();
