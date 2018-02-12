/*
 Created by Kyle McGrew
 */

var redisScan = require('redisscan');
var redis     = require('redis').createClient({db:0,url:"redis://redis:6379"}); /* Remove url key for both if running outside of docker container */
var redisAdmin     = require('redis').createClient({db:1,url:"redis://redis:6379"});
var lambda = require('../controllers/lamba_controller.js');

redis.on("error", function (err) {
    console.log("Error " + err);
});

redis.on("connect", function () {
    console.log("good to go");
});

var redisScanner = function(callback){
    redisScan({
        redis: redis,
        keys_only: false,
        each_callback: function (type, key, subkey, length, value, cb) {
            lambda.execute(value,function(err,data) {
                if(err)  cb(err);
                else     {cb(); console.log(data);}
            });
        },
        done_callback: function (err) {
            if(err) callback(err,null);
            else    if(callback)    callback(null,0);
        }
    });
};

var getUserInfo = function(username,callback){
  redisAdmin.get(username,function(err,data){
      if(err)   callback(err,null);
      else      if(callback)    callback(null,data);
  });
};

module.exports = {
    redis: redis,
    redisScanner: redisScanner,
    getUserInfo: getUserInfo
}