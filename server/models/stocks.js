/**
 * Created by fazbat on 5/31/2016.
 */

"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Stock = new Schema({
    name: String
});

module.exports = mongoose.model('stock-symbol', Stock);