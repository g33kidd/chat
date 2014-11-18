Messages = new Mongo.Collection('messages');

updateOldMessagesToNew = function() {
    var chats = Chats.find();
    console.log(chats);
    chats.forEach(function (chat) {
        var messages = chat.messages;
        console.log(messages);
        messages.forEach(function (message) {
            console.log(message);
            var user = Meteor.users.findOne({"services.twitter.screenName": message.username});
            var newmessage = {
                chatId: chat._id,
                userId: user._id,
                username: message.username,
                content: message.message,
                created: message.created
            };

            var newMessage = Messages.insert(newmessage, function(error, result) {
                if(error) return console.log("ERROR INSERTING NEW MESSAGE");
                console.log("NEW MESSAGE: " + result);
            });
            console.log("Moving " + message._id + " to new collection | ID: " + newMessage);
        });
    });

    chats.forEach(function (chat) {
        Chats.update(chat._id, {$pullAll: {messages: chat.messages}}, function(error) {
            return console.log("REMOVED ALL OLD MESSAGES");
        });
    });

    console.log("FINISHED!");
}