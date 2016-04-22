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
        //set location name
        location.name = req.body.name;
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

//register routes
app.use('/api', router);

//start server
app.listen(port);
console.log('The server is started on port ' + port);
