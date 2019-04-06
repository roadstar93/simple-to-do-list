var mongoose = require("mongoose");

//Defining User schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    toDo: String
    // toDo: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "List"
    //     }
    // ]
});

module.exports = mongoose.model("User", userSchema);