var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FoodSchema   = new Schema({
    name: String,
    image:String
});

module.exports = mongoose.model('Food', FoodSchema);
