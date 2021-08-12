const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();
module.exports = router;

router.post('/register', register);
router.post('/getMarketOffers', getMarketOffers);
router.post('/getCreateOffers', getCreateOffers);
router.post('/getJoinOffers', getJoinOffers);
router.post('/getAcceptOffers', getAcceptOffers);
router.post('/getSettledOffers', getSettledOffers);
router.post('/getFilter', getFilter);
router.post('/getOffer', getOffer);
router.post('/joinOffer', joinOffer);
router.post('/acceptOffer', acceptOffer);
router.post('/contestOffer', contestOffer);
router.post('/getDisputedOffers', getDisputedOffers);
router.post('/adminOffer', adminOffer);

var db = require('../models/model.js') 

/*

async function register(req, res, next) {
	
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next() 
  
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
*/
function register(req, res) {  
  var data = {
	"creator_id"   : req.body.creator_id,
	"term"         : req.body.term,
	"expiry"       : req.body.expiry, 
	"eth"		   : req.body.eth,
	"desc"		   : req.body.desc
  }
  db.Offer.create(data, function(err, offer){
	if (err){
	  res.status(401).json(err);
	} else {
	  res.status(201).json(offer);
	}
  })
}; 

function getMarketOffers(req, res) {	
  db.Offer.find({creator_id: { $ne: req.body.user_id } , offer_status:"0"}).exec(function (err, offers) {
	if (err) {		
	  res.status(401).json(err);
	} else {		
	  res.status(201).json(offers);
	}
  });
}

function getCreateOffers(req, res) {	
	db.Offer.find({creator_id: { $eq: req.body.user_id } , offer_status:"0"}).exec(function (err, offers) {
	  if (err) {		
		res.status(401).json(err);
	  } else {		
		res.status(201).json(offers);
	  }
	});
  }

function getJoinOffers(req, res) {	
  db.Offer.find({creator_id:req.body.user_id, offer_status:"1"}).exec(function (err, offers) {
	if (err) {		
		res.status(401).json(err);
	} else {
		res.status(201).json(offers);
	}
  });
}

function getAcceptOffers(req, res) {	
  db.Offer.find({creator_id:req.body.user_id, offer_status:"2"}).exec(function (err, offers) {
	if (err) {		
	  res.status(401).json(err);
	} else {		
	  res.status(201).json(offers);
	}
  });
}

function getSettledOffers(req, res) {	
  db.Offer.find({creator_id:req.body.user_id, offer_status:"3"}).exec(function (err, offers) {
	if (err) {		
	  res.status(401).json(err);
	} else {		
	  res.status(201).json(offers);
	}
  });
}

function getFilter(req, res) {
	var query="";
    if (req.body.minAmount != "" ) {
		if (req.body.maxAmount != ""){
			query = { $gte: req.body.minAmount, $lte:req.body.maxAmount }
		} else {
			query = { $gte: req.body.minAmount}
		}
	} else {
		if (req.body.maxAmount != ""){
			query = { $lte: req.body.maxAmount}
		} 
	} 

    if (req.body.market == "1"){
		query = {'creator_id':req.body.user_id,'offer_status':req.body.market,'eth': query};
	} else {
		query = {'creator_id': { $ne: req.body.user_id },'offer_status':req.body.market,'eth': query};
	}	
	
    db.Offer.find(query).exec(function (err, offers) {
		if (err) {	
		  res.status(401).json(err);
		} else {
		  res.status(201).json(offers);
		}
	});   
}

function getOffer(req, res) {	
	
 	let result = db.Offer.aggregate().lookup({from:"users", localField:"creator_id", foreignField: "_id", as: "creator"}).match({ _id:ObjectId(req.body._id) }).exec(function (err, offer) {
		if (err) {		
			res.status(401).json(err);
		} else {
			(offer.length>0) ? res.status(201).json(offer[0]) : res.status(201).json(offer)
		}
	  });	 
	 
}
/*
function getOffer(req, res) {	
  db.Offer.findOne({_id:req.body._id}).exec(function (err, offer) {
	if (err) {		
		res.status(401).json(err);
	} else {
		res.status(201).json(offer);
	}
  });
}
*/
function joinOffer(req, res) {
  var data = {
	"opponent_id"   : req.body.opponent_id,
	"opponent_eth"  : req.body.opponent_eth,
	"offer_status"  : "1"
  }
  var query = {'_id' : req.body._id}
	
	db.Offer.updateOne(query, data, function (err, user){
	  if (err){
		res.status(401).json(err);
	  } else {
		db.Offer.findOne({_id : req.body._id}).exec(function(err,user){
		  res.status(201).json(user) ;
		})
	  }
	})
}; 

function acceptOffer(req, res) {
  if (req.body.flag == "1") {
	var data = {	"offer_status"  : "2"  }  
  } else {
	var data = {	"offer_status"  : "222"  }  
  }
  var query = {'_id' : req.body._id}
	
	db.Offer.updateOne(query, data, function (err, user){
	  if (err){
		res.status(401).json(err);
	  } else {
		db.Offer.findOne({_id : req.body._id}).exec(function(err,user){
		  res.status(201).json(user) ;
		})
	  }
	})
};

function contestOffer(req, res) {
  var data = {	
	"offer_status"  : "4",
	"contest_desc"  : req.body.desc,
	"contestor_id"  : req.body.user_id,
	"dispute_flag"  : "1"
  }  
  var query = {'_id' : req.body._id}
	
	db.Offer.updateOne(query, data, function (err, user){
	  if (err){
		res.status(401).json(err);
	  } else {
		db.Offer.findOne({_id : req.body._id}).exec(function(err,user){
		  res.status(201).json(user) ;
		})
	  }
	})
};

function getDisputedOffers(req, res) {	
  db.Offer.find({dispute_flag: "1", offer_status:"4" }).exec(function (err, offers) {
	if (err) {		
	  res.status(401).json(err);
	} else {		
	  res.status(201).json(offers);
	}
  });
}

function adminOffer(req, res) {
  var data = {	
	"winner_id"  : req.body.winner,
	"offer_status"  : "3",
  }  
  var query = {'_id' : req.body._id}
	
	db.Offer.updateOne(query, data, function (err, user){
	  if (err){
		res.status(401).json(err);
	  } else {
		db.Offer.findOne({_id : req.body._id}).exec(function(err,user){
		  res.status(201).json(user) ;
		})
	  }
	})
};
