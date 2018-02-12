/*
 Created by Kyle McGrew
 */

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var lambda = new AWS.Lambda();
var config = require('../config.js');

var execute = function(payload,cb) {
    var params = {
        FunctionName: config.lambda,
        InvocationType: 'RequestResponse',
        Payload:  payload
    };
    lambda.invoke(params, function(err, data) {
        if (err) cb(err, null); // an error occurred
        else     cb(null,data);           // successful response
    });
}

module.exports.execute = execute;