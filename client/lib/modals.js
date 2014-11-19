openModal = function() {
	Session.set('new-post-modal-action', true);
	$('#overlay').addClass('show');
	$('.new-modal').addClass('show');
};

closeModal = function() {
	Session.set('new-post-modal-action', false);
	$('#overlay').removeClass('show');
	$('.new-modal').removeClass('show');
}