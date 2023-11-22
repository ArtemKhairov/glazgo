'use strict';

var utils = require('../utils/writer.js');
var Coins = require('../service/CoinsService');

module.exports.apiCoinsGET = function apiCoinsGET (req, res, next, page, limit, title) {
  Coins.apiCoinsGET(page, limit, title)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiCoinsIdPriceGET = function apiCoinsIdPriceGET (req, res, next, id) {
  Coins.apiCoinsIdPriceGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiCoinsIdTransferPOST = function apiCoinsIdTransferPOST (req, res, next, body, id) {
  Coins.apiCoinsIdTransferPOST(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
