(function () {

var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Datastore = require('nedb'), seatBooking = new Datastore({ filename: 'pvr.db', autoload: true });
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/bookTicket', function(req, res) {
	seatBooking.insert({
						movie: req.body.movie,
						theatre: req.body.theatre,
						date: req.body.date,
						show: req.body.show,
						selectedSeatsList: req.body.selectedSeatsList
					   },
					   function (err) {
		
	});
	
    res.send("");
	
});

app.get('/checkSeats', function(req, res) {
	var selectedSeats = "";
	seatBooking.find({ show: req.query.show }, function (err, docs) {
		for(var ictr = 0; ictr < docs.length; ictr++) {
			selectedSeats += docs[ictr].selectedSeatsList + ",";
		}
		res.send(selectedSeats);
	});
});

app.get('/getPVR', function(req, res) {
	var obj;
	fs.readFile('./pvr.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  //obj = JSON.parse(data);
	  res.send(data);
	});
});

app.listen(process.env.PORT || 8081);
console.log("Server is listening");

})();