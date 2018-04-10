$(window).on('load', function() {
	$('.del-button').on('click', deleteRegister);
	$('#modal').on('show.bs.modal', prepareModal);
	$('#modal .save').on('click', save);
	$('#modal').on('hidden.bs.modal', cleanModal);
});

function deleteRegister(event){
	$.ajax({
		url: '/authors/' + $(event.target).data('id'),
		type:'DELETE',
		success: function(result) {
			console.log(result);
		}
	});
	$(this).closest('tr').remove();
}

function prepareModal(event){
	let pressedBtn = $(event.relatedTarget);
	let row = pressedBtn.parents('tr');
	let modalTitle = $('.modal-title');
	let saveBtn = $('.modal-footer .save');
	if(pressedBtn.hasClass('edit-button')){
		modalTitle.html('Edit Author');
		saveBtn.html('Save Changes').attr('id', 'edit').attr('data-id', pressedBtn.data('id'));
		$('#author-name').val(row.children().eq(0).html());
		$('#author-age').val(row.children().eq(1).html());
	} else {
		modalTitle.html('Add Author');
		saveBtn.html('Save Author').attr('id', 'add');
	}
}

function cleanModal(){
	$('#modal input').val('');
	$('#modal .save').attr('id', '').attr('data-id', '');
}

function save(event){
	if($(event.target).attr('id') === 'edit'){
		$.ajax({
			url: '/authors/' + $(event.target).data('id'),
			type: 'PUT',
			data: $('.modal form').serialize(),
			success: function(result) {
				console.log(result);
				$('#modal').modal('toggle');
			}
		});
	} else {
		$.ajax({
			url: '/authors/',
			type: 'POST',
			data: $('.modal form').serialize(),
			success: function() {
				$('#modal').modal('toggle');
				window.location.reload();
			}
		});
	}
}