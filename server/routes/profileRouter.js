const express = require('express');

const router = express.Router();

const TinkoffV2 = require('../tinkoff_v2');

const api = new TinkoffV2({
  token: process.env.TINKTOKEN,
});

// Ручка Тинькова
router.get('', async (req, res) => {
  try {
    const profile = await api.OperationsServicePromise.GetPortfolio({
      account_id: '2038810095',
    });
    const shares = await api.InstrumentsServicePromise.Shares({});
    const etfs = await api.InstrumentsServicePromise.Etfs({});
    res.json({ profile, shares, etfs });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
