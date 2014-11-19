Template.newChat.events({

	'click .create-chat': function(e) {
		var chatName = $('#chatName').val();
		var newChatName = "";
		if(chatName === "") {
			$('#chatName').css('border', '1px solid red');
			$('.errors').html('Title can\'t be blank!');
		}else{
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