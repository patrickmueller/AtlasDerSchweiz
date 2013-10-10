function navigationControl() {

	$('.button').click(menuControl);
	$('#map_canvas').click(function() {
		if($('.active').length > 0) menuControl();
	});

};

function menuControl() {

	if($(this).attr('id') == 'map_canvas') {
		closeMenu();
	} else {

		var menuId = $(this).attr('data-menu-id');
		var groupId = $(this).parent().parent().attr('id');
		var menuAlignment = $(this).parent().parent().attr('data-alignment');

		if($(this).hasClass('active')) {
			$('.active').removeClass('active');
			closeMenu();
		} else {
			closeMenu();
			$('.active').removeClass('active');
			$(this).addClass('active');
			openMenu();
		}

	}

	function closeMenu() {
		$('.menu-open-left').removeClass('menu-open-left');
		$('.button-open-left').removeClass('button-open-left');
		$('.menu-open-right').removeClass('menu-open-right');
		$('.button-open-right').removeClass('button-open-right');
		$('.active').removeClass('active');
	}

	function openMenu() {
		if(menuAlignment == 'left') {
			$('#' + menuId).addClass('menu-open-left');
			$('#' + groupId).addClass('button-open-left');
		} else {
			$('#' + menuId).addClass('menu-open-right');
			$('#' + groupId).addClass('button-open-right');
		}
	}

	return false;

}