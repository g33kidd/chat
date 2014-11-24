Template.newChat.events({

	'click .create': function(e, tmpl) {
		var chatName = $('#chat-name').val();
		var newChatName = "";
		if(chatName === "") {
			$('#chat-name').css('border', '2px solid #935050');
		}else{
			$('#chat-name').css('border', '0');
			newChatName = chatName.replace(/\s+/g, '-').toLowerCase();
			if(Chats.find({name: newChatName}).count() === 0) {
				var chat = Chats.insert({
					userId: Meteor.userId(),
					displayName: chatName,
					name: newChatName,
					private: false,
					created: new Date()
				});

				addParticipant(chat, Meteor.userId());
			}

			Router.go('chat', {name: newChatName});
		}
	}

});