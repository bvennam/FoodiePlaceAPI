// server.js
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Location   = require('./models/location');

//connect to mongodb
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/'); // connect to our database

//bodyParser gets data from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set the port
var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'welcome to the foodie API' });
});

//routes
router.route('/locations')
    // create a location object (accessed at POST http://localhost:8080/api/locations)
    .post(function(req, res) {
        var location = new Location();
        //set location name, googleID, & googleAddress
        location.name = req.body.name;
        location.google_id = req.body.google_id;
        location.google_address = req.body.google_address;
        //set location associated foods array
        location.foods = req.body.foods;

        // save the location and check for errors
        location.save(function(err) {
            if (err) {
                res.send(err);
              }
            res.json({ message: 'Location created!' });
        });
    })

    // get all the locations (accessed at GET http://localhost:8080/api/locations)
    .get(function(req, res) {
        Location.find(function(err, locations) {
            if (err)
                res.send(err);
            res.json(locations);
        });
    });
  // routes for /locations/:google_id
  router.route('/locations/google/:google_id')
      .get(function(req, res) {
        Location.findOne({ 'google_id': req.params.google_id }, function (err, doc) {
          if(err)
            res.send(err)
            res.json(doc)
        });
      });
  // routes for /locations/:location_id
  router.route('/locations/:location_id')

      // get the location with that id (accessed at GET http://localhost:8080/api/locations/:location_id)
      .get(function(req, res) {
          Location.findById(req.params.location_id, function(err, location) {
              if (err)
                  res.send(err);
              res.json(location);
          });
      })

      .put(function(req, res) {
        Location.findById(req.params.location_id, function(err, location) {
          if (err) {
            res.send(err);
          }
          //update the name & foods for each location
          location.name = req.body.name;
          location.google_address = req.body.google_address;
          location.google_id = req.body.google_id;
          location.foods = req.body.foods;
          console.log("here2")
          //save the location
          location.save(function(err) {
            if(err) {
              res.send(err);
            }
            res.json({message: 'location updated!'});
          });
        });
      })

      .delete (function(req, res) {
        Location.remove({
          _id:req.params.location_id}, function(err, location) {
            if (err) {
              res.send(err);
            }
            res.json({message: 'successfully deleted location'})
          });
      });

//register routes
app.use('/api', router);

//start server
app.listen(port);
console.log('The server is started on port ' + port);
