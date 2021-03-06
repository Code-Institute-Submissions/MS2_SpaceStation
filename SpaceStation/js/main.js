// Start ISS Real Time Map 
/** 
 * Code below creates a Leaflet map
 * from https://leafletjs.com/examples/quick-start/
*/ 
const INITIAL_ZOOM_LATITUDE = 0;
const INITIAL_ZOOM_LONGITUDE = 0;
const MAP_ZOOM_LEVEL = 2;

const MY_MAP = L.map("iss-map").setView(
	[INITIAL_ZOOM_LATITUDE, INITIAL_ZOOM_LONGITUDE],
	MAP_ZOOM_LEVEL
);

const ATTRIBUTION =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'; // obligatory as per the copyright notice

/**
 * Url below is a format of a url for any given map tile from Open Street map 
 * for more info visit: https://leafletjs.com/reference-1.6.0.html#tilelayer
 */
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILES = L.tileLayer(TILE_URL, { ATTRIBUTION });
TILES.addTo(MY_MAP);

/* Code below creates a marker with custom icon*/
const ICON_HEIGHT = 50;
const ICON_WIDTH = 32;
const ANCHOR_HEIGHT = 25;
const ANCHOR_WIDTH = 16;

var issIcon = L.icon({
	iconUrl: "SpaceStation/img/iss-map-icon.png",
	iconSize: [ICON_HEIGHT, ICON_WIDTH],
	iconAnchor: [ANCHOR_HEIGHT, ANCHOR_WIDTH],
});

const MARKER = L.marker([INITIAL_ZOOM_LATITUDE, INITIAL_ZOOM_LONGITUDE], {
	icon: issIcon,
}).addTo(MY_MAP); 

const ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;
/** 
 * Code below fetches the information from the iss api and displays it
 * on the page through Leaflet map and live coordinates. API at
 * https://wheretheiss.at/
 */
async function getISS() {
	const RESPONSE = await fetch(ISS_URL);
	const DATA = await RESPONSE.json();
	const { latitude, longitude, altitude, velocity } = DATA;
	const DECIMAL_AMOUNT = 3;

	MARKER.setLatLng([latitude, longitude]);
	if (firstTime) {
		MY_MAP.setView([latitude, longitude], MAP_ZOOM_LEVEL);
		firstTime = false;
	}

	document.getElementById("lat").textContent = latitude.toFixed(DECIMAL_AMOUNT);
	document.getElementById("long").textContent = longitude.toFixed(
		DECIMAL_AMOUNT
	);
	document.getElementById("alt").textContent = altitude.toFixed(DECIMAL_AMOUNT);
	document.getElementById("vel").textContent = velocity.toFixed(DECIMAL_AMOUNT);
}
/** On the advice of my mentor on this project: I aim to create a larger number of 
 * smaller functions, instead of my now smaller number large functions, to execute 
 * the retrieving and displaying of the information from the ISS API. This to make 
 * it easier to edit in the code in the future as well as easier for any future 
 * developer looking to understand and use the code. Because of time constraints 
 * I wasn’t able to do this before the project had to be handed in. I aim to execute
 * this as soon as possible in the cloned version of this project. 
 */

// End ISS Real Time Map

/**
 * Code below is from Magnific Popup
 * https://dimsemenov.com/plugins/magnific-popup/
 * and it provides a "Lightbox Gallery" effect
 * to gallery-section
 */
$(".gallery-section .grid .test-popup-link").magnificPopup({
	type: "image",
	gallery: { enabled: true },
});

/**
 * Code below is from Owl Carousel
 * https://owlcarousel2.github.io/OwlCarousel2/demos/basic.html
 * and it provides a carousel effect to
 * quotes-section
 */
$(".page-main .quotes-section .owl-carousel").owlCarousel({
	loop: true,
	autoplay: true,
	dots: true,
	responsive: {
		0: {
			items: 1,
		},
		544: {
			items: 2,
		},
	},
});

$(document).ready(function () {
    getISS();
    setInterval(getISS, 1000);
});
