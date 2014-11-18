updateParticipantList = function() {
    var chats = Chats.find();
    if(!chats.count()) return;
    chats.forEach(function(chat) {
        if(!chat.participants) {
            addParticipant(chat._id, chat.userId);
        }
        var messages = Messages.find({chatId: chat._id});
        messages.forEach(function(message) {
            var user = Meteor.users.findOne(message.userId);
            addParticipant(chat._id, user._id);
        });
    });
}

Meteor.startup(function() {
    updateParticipantList();
});