var express = require("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    seedDB = require("./seedDB"),
    app = express();


var indexRoutes = require("./routes/index"),
    listRoutes  = require("./routes/lists/lists");

//mongodb connection -- local for now
mongoose.connect("mongodb://localhost/to_do_list-temp", {useNewUrlParser: true});

//App connection local or online
var port = process.env.PORT || 5000;
var ip = process.env.IP || "0.0.0.0";

// seedDB(); //just for cleaning the database

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(indexRoutes);
app.use(listRoutes);



app.listen(port, ip, function(){
    console.log("Server started")
});