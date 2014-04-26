// Load module dependencies
var express = require('express')
  , http = require('http')
  , cons = require('consolidate');


// Templating
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set("views", __dirname + "/client");


// Static routes
app.use("/client", express.static(__dirname + '/client')); // The public files

//Dynamic routes
app.get('/', function (req, res) {

  console.log("User is joining.");

  res.render('index', {title: 'programmer-meetup'});

});

http.createServer(app).listen(1127);
