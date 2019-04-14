var express = require("express"),
    User = require("../../models/users"),
    Item = require("../../models/items"),
    middleware = require("../../middleware/index"),
    router = express.Router({ mergeParams: true });


//Main list route
router.get("/list", middleware.isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("items").exec(function (err, user) {
        if (err) {
            res.redirect("/")
        } else {
            // console.log(user.item)
            res.render("list/main", { user: user });
        }
    })
})


//List create route
router.post("/list", function (req, res) {
    User.findById(req.user._id, function (err, foundUser) {
        if (err) {
            console.log("cannot find user")
            res.redirect("/list")
        } else {
            var text = req.body.text;
            var author = req.user._id;
            var newItem = {
                text: text,
                author: author
            }
            Item.create(newItem, function (err, item) {
                if (err) {
                    console.log("cannot add item")
                } else {
                    item.save();
                    foundUser.items.push(item);
                    foundUser.save();
                    req.flash("success", "Item added to list")
                    res.redirect("/list")
                };
            });
        };
    });
});

//List Edit route
router.get("/list/:id/edit", middleware.isLoggedIn, function (req, res) {
    Item.findById(req.params.id, function (err, foundItem) {
        if (err) {
            console.log("item not found")
        } else {
            res.render("list/edit", { item: foundItem });
        }
    })
});


//Update route
router.put("/list/:id", function (req, res) {
    var text = req.body.text;
    Item.findByIdAndUpdate(req.params.id, { text: text }, function (err, updatedItem) {
        if (err) {
            req.flash("error", "Update failed: " + err.message);
            res.redirect("/list")
        } else {
            req.flash("success", "Item updated");
            res.redirect("/list");
        }
    })
})


//Completed route
router.put("/list/:id/done", function (req, res) {
    Item.findById(req.params.id, function (err, foundItem) {
        if (foundItem.completed === true) {
            Item.findByIdAndUpdate(foundItem.id, { completed: false }, function (err, notCompletedItem) {
                if (err) {
                    req.flash("error", "Update failed: " + err.message);
                    res.redirect("/list")
                } else {
                    req.flash("success", "Item not completed");
                    res.redirect("/list");
                };
            });
        } else {
            Item.findByIdAndUpdate(foundItem.id, { completed: true }, function (err, completedItem) {
                if (err) {
                    req.flash("error", "Update failed: " + err.message);
                    res.redirect("/list")
                } else {
                    req.flash("success", "Item completed");
                    res.redirect("/list");
                };
            });
        };
    });
});


//Delete route
router.delete("/list/:id", function (req, res) {
    Item.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log("File could not be deleted");
        } else {
            req.flash("success", "Item deleted");
            res.redirect("/list");
        };
    });
});

function isCompleted(req, res, next) {
    if (completed === false) {
        { completed: true }
    }
    else {
        { completed: false }
    }
    next();
}

module.exports = router;