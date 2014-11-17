Template.chat.rendered = function() {
	$(".main-content").animate({ scrollTop: $('.main-content')[0].scrollHeight}, 200);
}

Template.chat.events({

	'keyup .chat-composer': function(e) {
		if(e.which === 13) {
			var message = {
				username: Meteor.user().services.twitter.screenName,
				message: $('.chat-composer').val(),
				created: new Date()
			};

			Chats.update(this._id, {$addToSet: {messages: message}}, function() {
				$('.chat-composer').val('');
				$('.main-content').scrollTop($('.main-content').height());
				$('.chat-composer').focus();
			});
		}
	}
	
});

Template.chatItem.helpers({
	timeago: function() {
		return moment(this.created).fromNow();
	}
});