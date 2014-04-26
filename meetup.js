// Tool to scrape events from meetup.com

// abliss's personal key... will be turned off someday
var API_KEY = "5d1d2266525715f473340c66482f68";

var meetup = require('meetup-api')(API_KEY);
var fs = require('fs');

meetup.getOpenEvents(
    {'text' : 'hackers',
     'zip': '97201'
    },
    function(err,resp) {
        fs.writeFileSync('meetup-events.js', JSON.stringify(resp));
        resp.results.forEach(function(ev) { 
            console.log(ev.name);
        });
    });
