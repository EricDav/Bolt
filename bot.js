// Dependencies 
 const   twit = require('twit'),
 const   config = require('./config');

 const Twitter = new twit(config);

// RETWEET BOT ======

// find latest tweet according the query 'q' in params
const retweet = function() {
    var params = {
        q: '#nodejs, #Nodejs',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, (err, data) => {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            let retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, (err, response) => {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

