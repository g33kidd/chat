Template.main.events({

	'click #createRoom': function(e) {
		var chatName = $('#roomName');

		if(Chats.find({name: chatName.val()}).count() === 0) {
			Chats.insert({
				userId: Meteor.userId(),
				name: chatName.val(),
				private: false,
				created: new Date()
			});
		}

		Router.go('chat', {name: chatName.val()});
	}

});