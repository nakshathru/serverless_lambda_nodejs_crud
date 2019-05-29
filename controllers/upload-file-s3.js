'use strict';
const s3 = require('../configurations/aws-config');
const https = require("https");
var fs = require('fs');

module.exports = async (event, callback) => {
    var filename ="sample.png";
    var body=JSON.parse(event.body);
    if(!body){
        callback(null,`{"message":"URL not found"}`);
    }
    else {
        var url=body.url;
        const file = fs.createWriteStream(filename);
        await https.get(url, response => {
            var stream = response.pipe(file);
            stream.on("finish", function() {
            console.log("done");

            fs.readFile(filename, (err, data) => {
                if (err) callback(err)
                const params = {
                    Bucket: 'lambda-file-upload-node-server/lambda_files',
                    Key: filename,
                    Body: JSON.stringify(data, null, 2)
                };
                s3.upload(params, function(s3Err, data) {
                    if (s3Err) callback(s3Err)
                   console.log(`File uploaded successfully at ${data.Location}`)
                   callback(null,`{"message":"File uploaded successfully at ${data.Location}"}`);
                });
           });

            });
        });



    }

}