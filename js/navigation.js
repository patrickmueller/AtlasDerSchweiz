function navigationControl() {

	$(document).on('click', '.button', menuControl);
	$('#map_canvas').click(menuControl);

};

function menuControl() {

	console.log('click');

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
		$('.menu-open-bottom').removeClass('menu-open-bottom');
		$('.button-open-bottom').removeClass('button-open-bottom');
		$('.active').removeClass('active');
	}

	function openMenu() {
		if(menuAlignment == 'left') {
			$('#' + menuId).addClass('menu-open-left');
			$('#' + menuId + '-shadow').addClass('menu-open-left');
			$('#' + groupId).addClass('button-open-left');
		}else if(menuAlignment == 'bottom') {
			$('#' + menuId).addClass('menu-open-bottom');
			$('#' + menuId + '-shadow').addClass('menu-open-bottom');
			$('#' + groupId).addClass('button-open-bottom');
		} else {
			$('#' + menuId).addClass('menu-open-right');
			$('#' + menuId + '-shadow').addClass('menu-open-right');
			$('#' + groupId).addClass('button-open-right');
		}
	}

	return false;

}