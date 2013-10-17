var menuId;
var groupId;
var menuAlignment;

function navigationControl() {

	$(document).off('click', '.button', menuControl);
	$(document).on('click', '.button', menuControl);
	$('#map_canvas').click(menuControl);

	
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
			closeMenu(this);
			$('.active').removeClass('active');
			$(this).addClass('active');
			openMenu(this);
		}

	}

	return false;

}

function closeMenu(obj) {

	var menuId = $(obj).attr('data-menu-id');
	var groupId = $(obj).parent().parent().attr('id');
	var menuAlignment = $(obj).parent().parent().attr('data-alignment');

	$('.menu-open-left').removeClass('menu-open-left');
	$('.button-open-left').removeClass('button-open-left');
	$('.menu-open-right').removeClass('menu-open-right');
	$('.button-open-right').removeClass('button-open-right');
	$('.menu-open-bottom').removeClass('menu-open-bottom');
	$('.button-open-bottom').removeClass('button-open-bottom');
	$('.active').removeClass('active');
}

function openMenu(obj) {

	var menuId = $(obj).attr('data-menu-id');
	var groupId = $(obj).parent().parent().attr('id');
	var menuAlignment = $(obj).parent().parent().attr('data-alignment');

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