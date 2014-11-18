Template.sidebar.helpers({

	myChats: function() {
		return Chats.find({userId: Meteor.userId()});
	},

	chats: function() {
		return Chats.find();
	}

});

Template.userActions.events({
	'click #login': function(e, tmpl) {
		Meteor.loginWithTwitter();
	},

	'click #logout': function(e, tmpl) {
		Meteor.logout(function(err) {
			if(err)
				return alert(error.reason);
			Router.go('main');
		});
	}
});

Template.chatMenuItem.helpers({
	userCount: function() {
		return getParticipantCount(this._id);
	}
})