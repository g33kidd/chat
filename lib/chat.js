getParticipantCount = function(chatId) {
    var chat = Chats.findOne(chatId);
    if(!chat.participants)
        enlistParticipants();
    return chat.participants.length;
}

enlistParticipants = function() {
    var chats = Chats.find();
    if(!chats.count()) return;
    chats.forEach(function (chat) {
        var messages = Messages.find({chatId: chat._id});
        console.log(chat);
        console.log(messages);
        messages.forEach(function (message) {
            var user = Meteor.users.findOne(message.userId);
            if(!isParticipant(chat._id, user._id)) {
                addParticipant(chat._id, user._id);
            }
        });
    });
}

updateMessages = function() {
    var chats = Chats.find();
    console.log(chats);
    chats.forEach(function (chat) {
        var messages = chat.messages;
        console.log(messages);
        messages.forEach(function (message) {
            console.log(message);
            var user = Meteor.users.findOne({"services.twitter.screenName": message.username});
            var message = {
                userId: user._id,
                username: user.services.twitter.screenName
            };

            Chats.update(chat._id, {$addToSet: {messages: message}});
        });
    });

    // var chats = Chats.find();
    // if(!chats.count()) return;
    // chats.forEach(function (chat) {
    //     var messages = chat.messages;
    //     messages.forEach(function (message) {
    //         var user = Meteor.users.findOne({username: message.username});
    //         console.log(user);
    //         var message = {
    //             userId: user._id,
    //             username: user.username,
    //             message: message.message,
    //             created: message.created
    //         };

    //         Chats.update(chat._id, {$push: {messages: message}});
    //     });
    // });
}

isParticipant = function(chatId, userId) {
    if(Chats.findOne({participants: userId})) return true;
    return false;
}

addParticipant = function(chatId, userId) {
    Chats.update(chatId, {$addToSet: {participants: userId}});
}