'use strict';


/**
 * Баланс текущего пользователя
 *
 * returns inline_response_200
 **/
exports.apiBalanceGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "balance" : 15000
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

