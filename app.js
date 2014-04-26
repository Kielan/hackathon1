// Load module dependencies
var express = require('express')
, cons = require('consolidate')
// abliss's personal key... will be turned off someday
, API_KEY = "5d1d2266525715f473340c66482f68"
, meetup = require('meetup-api')(API_KEY)
, fs = require('fs')
, app = express();

// Templating
// .hbs files should be handled by `handlebars`
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set("views", __dirname + "/client");


// Static routes
app.use("/client", express.static(__dirname + '/client')); // The public files

var location = ["California", "Oregon", "Washington"];

//Dynamic routes
app.get('/', function (req, res) {

  console.log("User is joining.");

  res.render('./views/index', {title: 'programmer-meetup', state: location[1], city: 'Portland'});
});

app.get('/Portland', function (req, res) {
    var context = {title: 'Portland'};
    console.log('portlander', context);

    // Tool to scrape events from meetup.com
    context.meetup = JSON.parse(fs.readFileSync('./client/assets/meetup-events.json'));
     
    res.render('./views/city', context);
});

app.listen(8768);
