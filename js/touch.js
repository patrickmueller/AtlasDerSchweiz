function touchControl() {

	$('.button-touch').hammer().on("tap", function(event) {
		alert('hello!');
	});

};
