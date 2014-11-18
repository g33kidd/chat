Router.route('main', {
	path: '/'
});

Router.route('chat', {
	path: '/chat/:name',
	data: function() {
		return Chats.findOne({name: this.params.name});
	},
	onAfterAction: function() {
		console.log("ACTION!");
		$('#mainContent').scrollTop(9999999);
	}
});

Router.route('videochat', {
	path: '/chat/:name/video',
	data: function() {
		return Chats.findOne({name: this.params.name});
	}
});