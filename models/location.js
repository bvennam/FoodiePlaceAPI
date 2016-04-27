var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//var Food         = require('./food');
var FoodSchema   = new Schema({
    name: String,
    image:String
});


var LocationSchema   = new Schema({
    name: String,
    google_address:String,
    google_id:String,
    foods:[FoodSchema]
});

module.exports = mongoose.model('Location', LocationSchema);
