// Load module dependencies
var express = require('express')
, cons = require('consolidate')
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

app.get('/portland/', function (req, res) {
  console.log('portlander');

  res.render('./views/city');
});

app.listen(8768);
