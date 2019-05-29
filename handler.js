'use strict';
const productCreate = require('./controllers/product-create');
const productReadAll = require('./controllers/product-read-all');
const productReadOne = require('./controllers/product-read-one');
const todosUpdate = require('./controllers/product-update');
const todosDelete = require('./controllers/product-delete');
const writeFileDB = require ('./controllers/upload-file-db');
const writeFileS3 = require ('./controllers/upload-file-s3');

module.exports.create = (event, context, callback) => {
  productCreate(event, (err, result) => {
    if(err) callback (err);
    const response = {
      statusCode: 200,
      body: result,
    };
    callback(null,response);
  });
};

module.exports.readAll = (event, context, callback) => {
  //context.callbackWaitsForEmptyEventLoop = false; 
  productReadAll(event, (err, result) => {
    if(err) callback (err);
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    callback(null,response);
  });
};

module.exports.readSingle = (event, context, callback) => {
  productReadOne(event, (err, result) => {
    if(err) callback (err);
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    callback(null,response);
  });
};

module.exports.update = (event, context, callback) => {
  todosUpdate(event, (err, result) => {
    if(err) callback (err);
    const response = {
      statusCode: 200,
      body: result,
    };
    callback(null,response);
  });
};

module.exports.delete = (event, context, callback) => {
  todosDelete(event, (err, result) => {
    if(err) callback (err);
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    callback(null,response);
  });
};

module.exports.fileWriteDB = (event, context, callback) => {
  writeFileDB(event, (err, result) => {
    if(err) callback (err);
    const response = {
      statusCode: 200,
      body: result,
    };
    callback(null,response);
  });
};

module.exports.fileWriteS3 = (event, context, callback) => {
  writeFileS3(event, (err, result) => {
    if(err) callback (err);
    const response = {
      statusCode: 200,
      body: result,
    };
    callback(null,response);
  });
};