const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const config = require('../config/config');
const encrypt = require('crypto');

const router = express.Router();
module.exports = router;


router.post('/register', register);
router.post('/login', login);
router.post('/forgot', forgot);
router.post('/setting', setting);
router.post('/userProfile', userProfile);
router.post('/registerMetamask', registerMetamask);
router.post('/metaUserProfile', metaUserProfile);

router.get('/me', passport.authenticate('jwt', { session: false }), login);

var db = require('../models/model.js') 
var shasum = encrypt.createHash('sha1');

function register(req, res) {
  
  db.User.findOne({email : req.body.email}).exec(function(err,user){
    if (user == null || user=="undefined" || user==""){
      var shasum = encrypt.createHash('sha1');
      shasum.update(req.body.password);
      var data = {
        "username"      : req.body.username,
        "email"         : req.body.email,
        "password"      : shasum.digest('hex'), 
      }
      db.User.create(data, function(err, doc){
        if (err){
          res.json({err, err});
        } else {
          res.json({doc,doc}) ;
        }
      })
    } else {
      res.json({user,user}) ;
    }
  }); 
}


function login(req, res) {
/*  
  const result = await db.User.find({email : req.body.email, password:bcrypt.hashSync(req.body.password, 10)}, function (err, doc){
    if (err) {
      res.send(err);      
    } else {
      res.send(doc);
    }
  })
*/ 
  var shasum = encrypt.createHash('sha1');
  shasum.update(req.body.password);
  db.User.findOne({email : req.body.email, password:shasum.digest('hex') }).exec(function(err,user){
    if (err){
      res.json({err, err});
    } else {
      res.json({user,user}) ;
    }
  });

}

function forgot(req, res) {
  db.User.findOne({email : req.body.email}).exec(function(err,user){
    if (err){
        res.json({err, err});
    } else {
        res.json({user,user}) ;
    }
  });
}

function setting(req, res) {
  var shasum = encrypt.createHash('sha1');
  shasum.update(req.body.password);
  var data = {
    "password"      : shasum.digest('hex') 
  }

  var query = {'_id' : req.body._id}

  db.User.updateOne(query, data, function (err, doc){
    if (err) res.json({err, err});
  })

  db.User.findOne({ _id: req.body._id, }).exec(function (err, user) {
    if (err) {
      res.json({ err, err });
    } else {
      res.json({ user, user });
    }
  });
}

function userProfile(req, res) {	
    db.User.findOne({ _id: req.body._id }).exec(function (err, user) {
		if (err) {
		  res.json({ err, err });
		} else {
		  res.json({ user, user });
		}
	  });
}

function registerMetamask(req, res) {
  if (req.body._id == "undefined" || req.body._id == null || req.body._id==""){
    db.User.findOne({address : req.body.address}).exec(function(err,user){
      if (user == null || user=="undefined" || user==""){  
        var data = {
        "address"      : req.body.address,
        "chainId"      : req.body.chainId,
        }
        
        db.User.create(data, function(err, user){
        if (err){
          res.status(401).json(err);
        } else {
          res.status(201).json(user) ;
        }
        })
      } else {
        res.status(201).json(user) ;
      }
    });
  } else {
    db.User.findOne({address : req.body.address}).exec(function(err,user){
      if (user == null || user=="undefined" || user==""){  
        var data = {
        "address"      : req.body.address,
        "chainId"      : req.body.chainId,
        }
        var query = {'_id' : req.body._id}
        db.User.updateOne(query, data, function (err, user){
          if (err){
            res.status(401).json(err);
          } else {
            db.User.findOne({_id : req.body._id}).exec(function(err,user){
              res.status(201).json(user) ;
            })
          }
        })
      } else {
        user = "";
        //res.json({user, user});
        res.status(201).json(user) ;
      }
    });
  }
    
}

function metaUserProfile(req, res) {
  var data = {
        "email"         : req.body.email,
        "bio"           : req.body.bio,
        "username"      : req.body.username,
		"address"		: req.body.address,
		"item"          : req.body.item,
        "bid"           : req.body.bid,
		"price"         : req.body.price,
        "auction"       : req.body.auction,
        "outbid"        : req.body.outbid,
        "referral"      : req.body.referral,
		"asset"         : req.body.asset,
        "purchase"      : req.body.purchase,
		"newsletter"    : req.body.newsletter,
        "ethvalue"      : req.body.ethvalue,
		"exchange"      : req.body.exchange,
		"roles"			: "0"
	}
  db.User.findOne({email : req.body.email}).exec(function(err,user1){
    if ( req.body.beforeEmail == null || req.body.beforeEmail=="undefined" || req.body.beforeEmail=="" || req.body.beforeEmail==req.body.email){
      if (req.body.beforeEmail == null || req.body.beforeEmail=="undefined" || req.body.beforeEmail==""){  
        var query = {'address' : req.body.address}              
      } else {;
        var query = {'email' : req.body.beforeEmail}             
      }
      if (user1 == null || user1=="undefined" || user1=="" || req.body.beforeEmail == req.body.email){  
        db.User.updateOne(query, data, function (err, user3){
          if (err) {
            res.json({err, err});
          } else {
              db.User.findOne({address : req.body.address}).exec(function(err,user){
              res.json({user, user}) ;	
            })
          }
        })
      } else {
        user={user: "222"};
        res.json({user, user});
      }
    } else {      
      if (user1 == null || user1=="undefined" || user1==""){  
         db.User.findOne({address : req.body.address}).exec(function(err,user2){
            var query = {'email' : req.body.beforeEmail}  
            db.User.updateOne(query, data, function (err, user3){
              console.log(333333);
              if (err) {
                res.json({err, err});
              } else {
                db.User.findOne({address : req.body.address}).exec(function(err,user){
                  res.json({user, user}) ;	
                })
              }
            })
          }) 
      } else {
        user={user: "222"};
        res.json({user, user});
      }
    }
    
  }); 
}