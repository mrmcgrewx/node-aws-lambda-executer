/*
 Created by Kyle McGrew
 */

var cron = require('node-cron');
var db = require('../controllers/redis_controller.js');

var powerSwitch = 0;

var t = cron.schedule('*/10 * * * * *', function(){

     db.redisScanner(function(err,data){
     if(err) {
         console.log(err);
     console.log("error with scanner, stopping...");
     t.stop();
     } else {
     console.log("running smoothly...");
     }
     });

},false);

var stopScraper = function(){
    console.log('stopping scraper');
    t.stop();
};

var startScraper = function(){
    console.log('started scraper');
    t.start();
};

var x = 0;

switch (powerSwitch) {
    case 0:
        t.start();
        break;
    case 1:
        console.log("scrapper off");
        break;
    default:
        console.log("scraper off -default");
        break;
}

module.exports = {
    stopScraper: stopScraper,
    startScraper: startScraper
};