var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/tourists', function(req, res) {
  var db = req.db;
  var collection = db.get('Tourists');
  collection.find({},{},function(e,docs){
      res.render('tourists', {
          "tourists" : docs
      });
  });
});
router.get('/flights', function(req, res) {
  var db = req.db;
  var collection = db.get('Flights');
  collection.find({},{},function(e,docs){
      res.render('flights', {
          "flights" : docs
      });
  });
});
router.get('/home', function(req, res) {
  res.render('home', { title: 'HomePage' });
});
router.get('/newtourist', function(req, res) {
  res.render('newtourist', { title: 'Add Tourist' });
});
router.post('/addtourist', function(req, res) {

  var db = req.db;

  var TouristID = req.body.TouristID;
  var Name = req.body.Name;
  var Surname = req.body.Surname;
  var Sex = req.body.Sex;
  var Country = req.body.Country;
  var Notes = req.body.Notes;
  var Birthdate = req.body.Birthdate;
  var FlightIDs = req.body.FlightIDs;

  var collection = db.get('Tourists');

  collection.insert({
    "TouristID" : TouristID,
    "Name" : Name,
    "Surname" : Surname,
    "Sex" : Sex,
    "Country" : Country,
    "Notes" : Notes,
    "Birthdate" : Birthdate,
    "FlightIDs" : FlightIDs
  }, function (err, doc) {
      if (err) {
          res.send("Problem with adding the information to the database.");
      }
      else {
          res.redirect("home");
      }
  });
});

router.get('/newflight', function(req, res) {
  res.render('newflight', { title: 'Add Flight' });
});
router.post('/addflight', function(req, res) {

  var db = req.db;

  var FlightID = req.body.FlightID;
  var DateIn = req.body.DateIn;
  var DateOut = req.body.DateOut;
  var Capacity = req.body.Capacity;
  var TouristsIn = req.body.TouristsIn;
  var Price = req.body.Price;

  var collection = db.get('Flights');

  collection.insert({
    "FlightID" : FlightID,
     "DateIn" : DateIn,
     "DateOut" : DateOut,
     "Capacity" : Capacity,
     "TouristsIn" : TouristsIn,
     "Price" : Price
  }, function (err, doc) {
      if (err) {
          res.send("Problem with adding the information to the database.");
      }
      else {
          res.redirect("home");
      }
  });
});


router.get('/delete', function(req, res) {
  res.render('delete', { title: 'Delete: ' });
});
router.post('/del', function(req, res) {

  var db = req.db;
  var touristID = req.body.TouristID;
   var Name = req.body.Name;
   var Surname = req.body.Surname;
  var dblogin = db.get('Tourists');
  dblogin.findOneAndDelete({
      "TouristID" : touristID,
      "Name" : Name,
      "Surname" : Surname
  }, function (err, doc) {
      if (err) {
          res.send("Tourit has not been deleted due to an error!");
      }
      else {
          res.redirect("home");
        }
  });
});


router.get('/deleteflight', function(req, res) {
  res.render('deleteflight', { title: 'Delete: ' });
});
router.post('/delflight', function(req, res) {

  var db = req.db;
  var FlightID = req.body.FlightID;
  var dblogin = db.get('Flights');
  dblogin.findOneAndDelete({
      "FlightID" : FlightID
  }, function (err, doc) {
      if (err) {
          res.send("Flight has not been deleted due to an error!");
      }
      else {
          res.redirect("home");
        }
  });
});

router.get('/file', function(req, res) {
  var db = req.db;
  var dbusers = db.get('Flights');
  dbusers.find({},{},function(e,docs){
    res.json(docs);
  });
});

router.get('/addTouristFlight', function(req, res) {
  res.render('addTouristFlight', { title: 'Add flight' });
});

router.post('/addTouristFlight', function(req, res) {
  let FlightList;
  var db = req.db;
  var touristID = req.body.TouristID;
   var Name = req.body.Name;
   var Surname = req.body.Surname;
   var List1 = req.body.List;

  var dblogin = db.get('Tourists');
  dblogin.find({"TouristID":touristID},function(e,d){
    FlightList = d[0].FlightIDs;
    console.log(FlightList);
    FlightList = FlightList +','+ List1;
    console.log(FlightList);

    dblogin.update({  "TouristID" : touristID,"Name" : Name, "Surname" : Surname},
     { $set : {
       "FlightIDs":FlightList
    } }, {multi: true});
    res.redirect("home");
    });
});

router.get('/removeTouristFlight', function(req, res) {
  res.render('removeTouristFlight', { title: 'Remove turist from flight' });
});

router.post('/removeTouristFlight', function(req, res) {
  let FlightList;
  var db = req.db;

  var touristID = req.body.TouristID;
   var Name = req.body.Name;
   var Surname = req.body.Surname;
   var List1 = req.body.List;

  var dblogin = db.get('Tourists');
  dblogin.find({"TouristID":touristID},function(e,d){
    FlightList = d[0].FlightIDs;
    console.log(FlightList);
    F = FlightList.split(',');
    for(i = 0;i < F.length;i++)
      {
        if(F[i]==List1)
        {
          F.splice(i,1);
        }
      }
      FlightList = F.join(',');
    dblogin.update({  "TouristID" : touristID,"Name" : Name, "Surname" : Surname},
     { $set : {
       "FlightIDs":FlightList
    } }, {multi: true});
    res.redirect("home");
    });
});



module.exports = router;
