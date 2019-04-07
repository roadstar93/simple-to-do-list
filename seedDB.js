var mongoose = require("mongoose"),
    User = require("./models/users"),
    Item = require("./models/items");


var data = [
    {
        username: "John",
        password: "123",
    }
]

function seedDB() {
    // User.remove({}, function (err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Removed user")
    //     }
    // });
    data.forEach(function (seed) {
        User.create(seed, function (err, createdUser) {
            if (err) {
                console.log("error cannot find user")
            } else {
                console.log("saved user")
                //add todos
                Item.create({
                    text: "Stuff",
                    author: createdUser.username
                }, function(err, createdItem){
                    if(err){
                        console.log("error item" + err.message)
                    } else {
                        createdUser.items.push(createdItem);
                        User.save();
                        console.log(createdUser)
                    }
                })
            }
        })
    })
}

module.exports = seedDB;