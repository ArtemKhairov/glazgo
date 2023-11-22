'use strict';

var utils = require('../utils/writer.js');
var Balance = require('../service/BalanceService');

module.exports.apiBalanceGET = function apiBalanceGET (req, res, next) {
  Balance.apiBalanceGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
