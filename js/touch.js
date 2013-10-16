function touchControl() {

	$('.button-touch').hammer().on("tap", function(event) {
		alert('hello!');
	});

};

// instant click on mobile touchstart event
window.addEventListener('load', function() {
	FastClick.attach(document.body);
}, false);
