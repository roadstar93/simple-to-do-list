var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
    text: String,
    completed: { type: Boolean, default: false },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


module.exports = mongoose.model("Item", itemSchema);