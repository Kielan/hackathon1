// Load module dependencies
var express = require('express')
, cons = require('consolidate')
, jsdom = require('jsdom')
, request = require('request')
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

    request({uri: 'http://calagator.org/events.atom'}, function(err, response, body) {
      var self = this;
      self.items = new Array();//I feel like I want to save my results in an array

      if(err && response.statusCode !== 200){console.log('Request error.');}

      jsdom.env({
                html: body,
                scripts: ['http://code.jquery.com/jquery-1.6.min.js'],                 
                 
                done: function (err, window) {

                var $     = window.jQuery,
                $body     = $('body'),
                $entries  = $body.find('entry');

                $entries.each (function (i, item) {
                var $a = $(item).children('a')
                ,     $title    = $(item).find('title').text()
                ,     $summary  = $(item).find('summary').text()
                ,     $url      = $(item).find('url').text()

                self.items[i] = {
                    url: $url
                    , title: $title
                    , summary: $summary   
                };

                }); 
                
                fs.writeFileSync('./client/assets/calagator.json', JSON.stringify(self.items));
                console.log(self.items);
            }
          })
      });

    
    context.meetup = JSON.parse(fs.readFileSync('./client/assets/meetup-events.json'));
    context.calagator = JSON.parse(fs.readFileSync('./client/assets/calagator.json'));

    res.render('./views/city', context);
});

app.listen(8768);
