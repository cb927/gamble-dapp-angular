var db = require('./models/model.js') 
var email_work = require('./email.js') 

module.exports = {
  settle: function () {
	var data = {
		"offer_status"  : "3"
	}
	var query="";
	// current date
	let date_ob = new Date();

	// adjust 0 before single digit date
	let date = ("0" + date_ob.getDate()).slice(-2);

	// current month
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

	// current year
	let year = date_ob.getFullYear();
	var today_date = year + "-" + month + "-" + date;
	
	db.Offer.find({expiry:{ $lt: today_date}, offer_status:"2"}).exec(function (err, offers) {
		if (err) {		
			console.log("ERROR :"+err);
		} else {
			if (offers.length > 0){
				for(let i=0; i<offers.length; i++){
					//console.log("222222222"+offers[i]);/
					//Run smart contract
					query = {'_id' : offers[i]._id}
					db.Offer.updateOne(query, data, function (err, offer){
					  if (err){
						
					  } else {
						//send Email
						
					  }
					})
				}
			} else {
				email_work.test();
				console.log("_______________________"+ date_ob + "__________________________");
			}
		}
	});
  
	 
  }
};