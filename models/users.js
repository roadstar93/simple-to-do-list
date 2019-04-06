var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

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

userSchema.plugin(passportLocalMongoose); //Using passport for authentication
module.exports = mongoose.model("User", userSchema);