'use strict';

var sql = require("mssql");
const config = require('../configurations/db-config');


module.exports = async (event, callback) => {
  const id=event.pathParameters.id;
  const querystring=`select * from product_table where pid=${id}`;
  try {
    let pool = await sql.connect(config);
    let results = await pool.request()
        .query(querystring);
    sql.close();
    callback(null,results.recordset);
} catch (err) {
  callback(err);   
}
 
}
