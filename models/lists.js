var mongoose = require("mongoose");

var listSchema = new mongoose.Schema({
    text: String
})

module.exports = mongoose.model("List", listSchema);