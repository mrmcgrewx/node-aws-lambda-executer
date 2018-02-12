/*
 Created by Kyle McGrew
 */

var express = require('express');
var router = express.Router();
var request = require('../controllers/requests_controller.js');
var passport = require('passport');

router.get('/',function(req,res){
    res.render('index');
});

router.get('/homepage',function(req,res){
    res.render('homepage');
});

router.post('/login',passport.authenticate('local', { successRedirect: '/homepage',
    failureRedirect: '/'})
);

//add target queries to bot
router.get('/add', function(req, res) {
    request.add(req,res);
});

router.get('/stop',function(req,res){
    request.stop(req,res);
});

router.get('/start',function(req,res){
    request.start(req,res);
});

//remove target queries from bot
router.get('/del', function(req,res) {
   request.del(req,res);
});

//get current number of target queries being tracked
router.get('/current_query_count', function(req,res) {
    request.current_query_count(req,res);
});

module.exports = router;