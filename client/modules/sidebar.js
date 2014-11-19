Template.sidebar.events({
	'click #new-post-action': function(e, tmpl) {
		if(Session.get('new-post-modal-action') === false) {
			openModal();
			$('#chatName').focus();
		}else{
			closeModal();
		}
	}
});

Template.sidebar.rendered = function() {
	Session.set('new-post-modal-action', false);
};

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
	displayName: function() {
		if(!this.displayName){
			return this.name;
		}else{
			return this.displayName;
		}
	},
	
	userCount: function() {
		return getParticipantCount(this._id);
	}
})