var express = require("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    app = express();


var indexRoutes = require("./routes/index");
//App connection local or online
var port = process.env.PORT || 5000;
var ip = process.env.IP || "0.0.0.0";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(indexRoutes);



app.listen(port, ip, function(){
    console.log("Server started")
});