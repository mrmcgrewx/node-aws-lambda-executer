/*
    Created by Kyle McGrew
    API to stop and start scraper
 */

var db = require('../controllers/redis_controller.js');
var tasker = require('./cron_controller');

var add = function(req,res) {
    var key = (req.query.dep + req.query.des + req.query.date);
    var jsonData = JSON.stringify({dep : req.query.dep , des : req.query.des , date : req.query.date});

    db.redis.set(key,jsonData,function(err,data) {
        if(err) res.status(400).json({err:err});
        else    res.status(200).json({data:key});
    });
};

module.exports.add = add;

var current_query_count = function(req,res) {
    var current_num_of_queries = 0;
    db.redisScan({
        redis: db.redis,
        keys_only: true,
        each_callback: function (type, key, subkey, length, value, cb) {
            current_num_of_queries++;
            cb();
        },
        done_callback: function (err) {
            if(err) res.status(400).json({err:err});
            else    res.status(200).json({current_num_of_queries:current_num_of_queries});
        }
    });
};

module.exports.current_query_count = current_query_count;

var del = function(req,res) {
    var key = (req.query.dep + req.query.des + req.query.date);
    var jsonData = JSON.stringify({dep : req.query.dep , des : req.query.des , date : req.query.date});

    db.redis.del(key,jsonData,function(err,data) {
        if(err) res.status(400).json({err:err});
        else    res.status(200).json({deleted:key});
    });
};

module.exports.del = del;

var stop = function(req,res) {
    tasker.stopScraper();
    res.status(200).json({success:"bot scraping stopped..."});
};

module.exports.stop = stop;

var start = function(req,res) {
    tasker.startScraper();
    res.status(200).json({success:"bot scraping started..."});
};

module.exports.start = start;