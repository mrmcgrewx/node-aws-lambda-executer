/*
 Created by Kyle McGrew
 */

var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require('./redis_controller');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
   function(username,password,done) {
       checkPassword(username,password,function(err,res){
           if(err)  {return done(err);}
           if(res == true){
               return done(null,username);
           } else {
               return done(null, false, {message: 'Incorrect password.'});
           }
       })
   }
));

/* You can use this function to create a password to store to redis */

function encryptPassword(password){
    bcrypt.hash(password, saltRounds).then(function(hash) {
        print(hash.toString());
        return hash;
    });

};

var checkPassword = function(username,password,callback) {
    db.getUserInfo(username,function(err,hash) {
        if (err) {callback(err,null);}
        bcrypt.compare(password, hash).then(function(res) {
            console.log("its trying to hash username not in redis");
            callback(null,res);
        });
    });

};

module.exports = {
    checkPassword: checkPassword
};