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
		success: function() {
			let row = $(event.target).closest('tr');
			row.fadeOut('fast', () => {
				row.remove();
			});
		}
	});
}

function prepareModal(event){
	let pressedBtn = $(event.relatedTarget);
	let row = pressedBtn.parents('tr');
	let modalTitle = $('.modal-title');
	let saveBtn = $('.modal-footer .save');
	if(pressedBtn.hasClass('edit-button')){
		modalTitle.html('Edit Author');

		saveBtn.html('Save Changes').
		attr('id', 'edit').
		data('id', pressedBtn.data('id'));

		$('#author-name').val(row.children().eq(0).html());
		$('#author-age').val(row.children().eq(1).html());
	} else {
		modalTitle.html('Add Author');
		saveBtn.html('Save Author').attr('id', 'add');
	}
}

function cleanModal(){
	$('#modal input').val('');
	$('#modal .save').attr('id', '').data('id', '');
}

function save(event){
	if($(event.target).attr('id') === 'edit'){
		$.ajax({
			url: '/authors/' + $(event.target).data('id'),
			type: 'PUT',
			data: $('.modal form').serialize(),
			success: function(result) {
				let row = $(`button[data-id='${result._id}']`).parents('tr');
				row.children().eq(0).html(result.name);
				row.children().eq(1).html(result.age);
				$('#modal').modal('toggle');
				alert('Author saved with success!');
			}
		});
	} else {
		$.ajax({
			url: '/authors/',
			type: 'POST',
			data: $('.modal form').serialize(),
			success: function(result) {
				let newRowHTML = `<tr>
									<td>${result.name}</td>
									<td>${result.age}</td>
									<td class="text-center">
										<button class="btn btn-info edit-button btn-sm" data-toggle="modal" data-target="#modal" data-id=${result._id}>
											Edit
										</button>
									</td>
									<td class="text-center">
										<button class="btn btn-danger del-button btn-sm" data-id=${result._id}>
											Delete
										</button>
									</td>
								</tr>`;
				let newRow = $(newRowHTML);
				newRow.hide();
				$('tbody').append(newRow);
				$(`.del-button[data-id=${result._id}]`).on('click', deleteRegister);
				$('#modal').modal('toggle');
				$('#modal').on('hidden.bs.modal', function(){
					newRow.fadeIn('slow');
				});
			}
		});
	}
}