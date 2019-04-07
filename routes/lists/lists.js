var express = require("express"),
    User = require("../../models/users"),
    Item = require("../../models/items"),
    router = express.Router({ mergeParams: true });
    

//Main list route
router.get("/list", function (req, res) {
    User.findById(req.user._id).populate("items").exec(function (err, user) {
        if (err) {
            res.send("Blog not found");
        } else {
            // console.log(user.item)
            res.render("list/main", { user: user });
        }
    })
})
    

//List add get route
router.get("/list/new", function (req, res) {
    res.render("list/create")
})


//List post route
router.post("/list", function (req, res) {
    console.log(req.user._id)
   User.findById(req.user._id, function(err, foundUser){
       if(err) {
           console.log("cannot find user")
       } else {
           var text = req.body.text;
           var author = req.user._id;
           var newItem = {
               text:text,
               author:author
           }
           Item.create(newItem, function(err, item){
               if(err) {
                   console.log("cannot add item")
               } else {
                //    item.author.id = req.user._id
                //item.author.username = req.user.username;
                console.log(item.text)
                item.save();

                foundUser.items.push(item);
                foundUser.save();
                // console.log(foundUser)
                res.redirect("/")
               }
           })
       }
   })
})

module.exports = router;