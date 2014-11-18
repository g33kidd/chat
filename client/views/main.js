Template.main.events({

	'click #createRoom': function(e) {
		var chatName = $('#roomName');

		if(Chats.find({name: chatName.val()}).count() === 0) {
			var chat = Chats.insert({
				userId: Meteor.userId(),
				name: chatName.val(),
				private: false,
				created: new Date()
			});
			addParticipant(chat, Meteor.userId());
		}

		Router.go('chat', {name: chatName.val()});
	}

});