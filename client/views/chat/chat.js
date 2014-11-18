Template.chat.helpers({
	messages: function() {
		return Messages.find({chatId: this._id}, {sort: {created: 1}});
	},

	invokeAfterLoad: function() {
		Meteor.defer(function() {
			$('.main-content').scrollTop($('.main-content').prop('scrollHeight'));
		});
		return "";
	}
});

Template.chat.events({

	'keyup .chat-composer': function(e, tmpl) {
		if(e.which === 13) {
			var message = {
				userId: Meteor.userId(),
				chatId: tmpl.data._id,
				username: Meteor.user().services.twitter.screenName,
				content: $('.chat-composer').val(),
				created: new Date()
			};

			Messages.insert(message, function(error, result) {
				$('.main-content').scrollTop($('.main-content').prop('scrollHeight'));
				$('.chat-composer').val('');
				$('.chat-composer').focus();
			});

			addParticipant(this._id, Meteor.userId());
		}
	}
	
});

Template.chatItem.helpers({
	profileImage: function() {
		var user = Meteor.users.findOne(this.userId);
		return user.services.twitter.profile_image_url;
	},
	timeago: function() {
		return moment(this.created).fromNow();
	}
});