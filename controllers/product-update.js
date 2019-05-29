'use strict';

var sql = require("mssql");
const config = require('../configurations/db-config');


module.exports = async (event, callback) => {
  const id=event.pathParameters.id;
  const { name, description, price } = JSON.parse(event.body);
  const querystring = `UPDATE product_table SET name='${name}', description='${description}', price='${price}' WHERE pid='${id}'`
  try {
    let pool = await sql.connect(config);
    let results = await pool.request()
        .query(querystring);
    sql.close();
    callback(null,event.body);
} catch (err) {
  callback(err);   
}
 
}