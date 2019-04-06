var mongoose = require("mongoose"),
    User = require("./models/users");
// List = require("./models/lists");


var data = [
    {
        username: "John",
        password: "123",
        toDo: "Lots of stuff here"
    },
    {
        username: "John",
        password: "123",
        toDo: "Less stuff"
    },
    {
        username: "John",
        password: "123",
        toDo: "More less stuff"
    }
]

function seedDB() {
    User.remove({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Removed user")
        }
    });
    data.forEach(function (seed) {
        User.create(seed, function (err, foundUser) {
            if (err) {
                console.log("error")
            } else {
                foundUser.save();
                console.log("saved user")
            }
        })
    })
}

module.exports = seedDB;