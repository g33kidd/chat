openModal = function() {
	Session.set('new-post-modal-action', true);
	$('#overlay').addClass('show');
	$('.modal').addClass('show');
};

closeModal = function() {
	Session.set('new-post-modal-action', false);
	$('#overlay').removeClass('show');
	$('.modal').removeClass('show');
};
