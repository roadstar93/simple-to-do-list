var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

//Defining User schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    ] 
});

userSchema.plugin(passportLocalMongoose); //Using passport for authentication
module.exports = mongoose.model("User", userSchema);