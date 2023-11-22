'use strict';


/**
 * Список монет
 *
 * page Integer Текущая страница (optional)
 * limit Integer Размер страницы (optional)
 * title String Фильтрация по названию (optional)
 * returns inline_response_200_1
 **/
exports.apiCoinsGET = function(page,limit,title) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "id" : 89,
    "title" : "Etherium",
    "network" : 1,
    "status" : 3
  }, {
    "id" : 89,
    "title" : "Etherium",
    "network" : 1,
    "status" : 3
  } ],
  "meta" : {
    "total" : 20,
    "limit" : 5,
    "page" : 1,
    "page_count" : 4
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Стоимость монеты в центах
 *
 * id Integer Идентификатор монеты
 * returns inline_response_200_2
 **/
exports.apiCoinsIdPriceGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "price" : 1000
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Трансфер монеты
 *
 * body Id_transfer_body 
 * id Integer Идентификатор монеты
 * no response value expected for this operation
 **/
exports.apiCoinsIdTransferPOST = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

