$(document).ready(function() {

	$('.button').click(function() {

		var menuId = $(this).attr('data-menu-id');
		var groupId = $(this).parent().parent().attr('id');
		var menuAlignment = $(this).parent().parent().attr('data-alignment');

		if(menuAlignment == 'left') {
			$('#' + menuId).toggleClass('menu-open-left');
			$('#' + groupId).toggleClass('button-open-left');
		} else {
			$('#' + menuId).toggleClass('menu-open-right');
			$('#' + groupId).toggleClass('button-open-right');
		}

		return false;
	});

});