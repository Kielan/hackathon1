// Tool to scrape events from meetup.com

// abliss's personal key... will be turned off someday
var API_KEY = "5d1d2266525715f473340c66482f68";

var meetup=require('meetup-api')(API_KEY);

meetup.getOpenEvents(
    {'topic' : 'hackathon',
     'city': 'portland'
    },
    function(err,events) {
        console.log(events);
    });
