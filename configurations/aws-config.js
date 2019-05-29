'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

module.exports = s3