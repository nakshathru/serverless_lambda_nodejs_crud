'use strict';
var fs = require('fs');
var sql = require("mssql");
const config = require('../configurations/db-config');
const https = require("https");

module.exports = async (event, callback) => {
var body=JSON.parse(event.body);
if(!body){
    callback(null,`{"message":"URL not found"}`);
}
else {
    var url=body.url;
    const file = fs.createWriteStream("sample.png");
await https.get(url, response => {
        var stream = response.pipe(file);
        stream.on("finish", function() {
          console.log("done");
        });
    });
await sql.connect(config).then(pool => {    
    fs.readFile('sample.png', 'binary', function(err, fileData) {
        var binBuff = new Buffer(fileData, 'binary');
        var ps = new sql.PreparedStatement(pool);        
        ps.input('theImage', sql.VarBinary);
        ps.prepare('INSERT INTO image_table (data) VALUES (@theImage)', function (err) {
            if(err) callback (err);
            ps.execute({theImage: binBuff}, function(err, results) {
                if(err) callback (err);
                ps.unprepare(function(err) {
                    if(err) callback (err);
                    sql.close();
                    callback(null,`{"message":"file inserted"}`);
                });
            });
        });
    });
})
.catch(err => {
    callback(err);
});

}

 
}

