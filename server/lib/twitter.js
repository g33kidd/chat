Meteor.methods({

    postTweet: function() {
        Twitter = new TwitMaker({
            consumer_key: Meteor.settings.twitterKey,
            consumer_secret: Meteor.settings.twitterSecret,
            access_token: Meteor.user().services.twitter.accessToken,
            access_token_secret: Meteor.user().services.twitter.accessTokenSecret
        });

        Twitter.post('statuses/update', {status: "Put a bird on it #meteorjs"}, function(error, data) {
            if(error)
                return console.log(error);
            return data;
        });
    },

    getTweetsByHashtag: function(hashtag) {
        var hashtag = "#" + hashtag;
        Twitter = new TwitMaker({
            consumer_key: Meteor.settings.twitterKey,
            consumer_secret: Meteor.settings.twitterSecret,
            access_token: Meteor.user().services.twitter.accessToken,
            access_token_secret: Meteor.user().services.twitter.accessTokenSecret
        });

        Twitter.get('search/tweets', {q: hashtag, count: 50}, function(err, data, response) {
            if(err)
                return console.log(err);
            return data;
        });
    }

});