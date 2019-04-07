var mongoose = require("mongoose");

var listSchema = new mongoose.Schema({
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    ],
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

module.exports = mongoose.model("List", listSchema);