Meteor.startup(function() {

	Accounts.loginServiceConfiguration.remove({
		service: 'twitter'
	});

	Accounts.loginServiceConfiguration.insert({
		service: 'twitter',
		consumerKey: Meteor.settings.twitterKey,
		secret: Meteor.settings.twitterSecret
	});

});