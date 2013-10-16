var overlay = new Array();
var map;
var markers = [];
var markerJa = false;

USGSOverlay.prototype = new google.maps.OverlayView();

function initialize(overlayImageSrc) {

	var MY_MAPTYPE_ID = 'style';
	var mapOptions = {
			zoom: 9,
			center: new google.maps.LatLng(46.944637,8.745117),
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
			},
			mapTypeId: MY_MAPTYPE_ID,
			draggable: true,
			scrollwheel: true,
			panControl: false,
			zoomControl: false,
			scaleControl: false,
			streetViewControl: false,
			mapTypeControl: false
	};
	var featureOpts = [
		{
			stylers: [{hue:'#00b4cc'}]
	  },{
		featureType: "all",
		elementType: "labels",
		stylers: [
			{ visibility: 'off' }
		]
	  },{
		featureType: "water",
		elementType: "all",
		stylers: [
			{ hue:'#00b4cc' },
			{ saturation: 40 },
			{ lightness: 40 }
		]
	  }
	];

	var styledMapOptions = {
		name: 'style'
	};

	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(47.141161,8.775616),
		map: map,
		title: 'Atlas der Schweiz',
		icon: '/img/overlay/map_marker.png'
	});

	var swBound = new google.maps.LatLng(45.79817,5.957336);
	var neBound = new google.maps.LatLng(47.796552,10.472717);
	var bounds = new google.maps.LatLngBounds(swBound, neBound);

	if(overlayImageSrc.length > 0) {
		for (var i = 0; i < overlayImageSrc.length ; i++) {
			overlay[i] = new USGSOverlay(bounds, overlayImageSrc[i], map);
		};
	}

	google.maps.event.addListener(map, 'touchstart', function(event) {
		addMarker(event.latLng);
	});

}
function addMarker(location) {
	markerJa =! markerJa;
	console.log(markerJa);

	deleteMarkers();
	if (markerJa == true){
		console.log(location.lb, location.mb);
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			icon: '/img/overlay/map_marker.png'
		});
		markers.push(marker);
	}
}

// Sets the map on all markers in the array.
function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	setAllMap(null);
	markers = [];
}


function USGSOverlay(bounds, image, map) {
	// Now initialize all properties.
	this.bounds_ = bounds;
	this.image_ = image;
	this.map_ = map;
	// Define a property to hold the image's div. We'll
	// actually create this div upon receipt of the onAdd()
	// method so we'll leave it null for now.
	this.div_ = null;
	// Explicitly call setMap on this overlay
	this.setMap(map);
}
/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */

USGSOverlay.prototype.onAdd = function() {
	var div = document.createElement('div');
	div.style.border = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';
	// Create the img element and attach it to the div.
	var img = document.createElement('img');
	img.src = this.image_;
	img.style.width = '100%';
	img.style.height = '100%';
	div.appendChild(img);
	this.div_ = div;
	// Add the element to the "overlayImage" pane.
	var panes = this.getPanes();
	panes.mapPane.appendChild(this.div_);
};
USGSOverlay.prototype.draw = function() {
	// We use the south-west and north-east
	// coordinates of the overlay to peg it to the correct position and size.
	// To do this, we need to retrieve the projection from the overlay.
	var overlayProjection = this.getProjection();
	// Retrieve the south-west and north-east coordinates of this overlay
	// in LatLngs and convert them to pixel coordinates.
	// We'll use these coordinates to resize the div.
	var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
	// Resize the image's div to fit the indicated dimensions.
	var div = this.div_;
	div.style.left = sw.x + 'px';
	div.style.top = ne.y + 'px';
	div.style.width = (ne.x - sw.x) + 'px';
	div.style.height = (sw.y - ne.y) + 'px';
};
USGSOverlay.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
};
// Set the visibility to 'hidden' or 'visible'.
USGSOverlay.prototype.hide = function() {
	if (this.div_) {
		// The visibility property must be a string enclosed in quotes.
		this.div_.style.visibility = 'hidden';
	}
};
USGSOverlay.prototype.show = function() {
	if (this.div_) {
		this.div_.style.visibility = 'visible';
	}
};
USGSOverlay.prototype.toggle = function() {
	if (this.div_) {
		if (this.div_.style.visibility == 'hidden') {
			this.show();
		} else {
			this.hide();
		}
	}
};
