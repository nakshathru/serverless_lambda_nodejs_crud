'use strict';

var sql = require("mssql");
const config = require('../configurations/db-config');


module.exports = async (event, callback) => {
  const { name, description, price } = JSON.parse(event.body)
  const querystring = `INSERT INTO product_table (name, description, price) VALUES ('${name}', '${description}', '${price}')`
  try {
    let pool = await sql.connect(config);
    await pool.request()
        .query(querystring);
    sql.close();
    callback(null,event.body);
} catch (err) {
  callback(err);   
}
 
}
