$(document).ready(function () {
	// Start Location R-T section

	// making a map and tiles
	const MY_MAP = L.map("iss-map").setView([0, 0], 1);
	const ATTRIBUTION =
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const TILES = L.tileLayer(TILE_URL, { ATTRIBUTION });
	TILES.addTo(MY_MAP);

	// making a marker with a custom icon
	var issIcon = L.icon({
		iconUrl: "SpaceStation/img/iss-map-icon.png",
		iconSize: [50, 32],
		iconAnchor: [25, 16],
	});

	const MARKER = L.marker([0, 0], { icon: issIcon }).addTo(MY_MAP);

	const ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544";

	let firstTime = true;
	async function getISS() {
		const RESPONSE = await fetch(ISS_URL);
		const DATA = await RESPONSE.json();
		const { latitude, longitude, altitude, velocity } = DATA;

		MARKER.setLatLng([latitude, longitude]);
		if (firstTime) {
			MY_MAP.setView([latitude, longitude], 2);
			firstTime = false;
		}

		document.getElementById("lat").textContent = latitude.toFixed(3);
		document.getElementById("long").textContent = longitude.toFixed(3);
		document.getElementById("alt").textContent = altitude.toFixed(3);
		document.getElementById("vel").textContent = velocity.toFixed(3);
	}

	//getISS(); <-- important

	//setInterval(getISS, 1000);  <---important

	// End Location R-T section

	//code below from Magnific Popup (https://dimsemenov.com/plugins/magnific-popup/) to provide a "Lightbox Gallery" effect to my gallery-section

	$(".gallery-section .grid .test-popup-link").magnificPopup({
		type: "image",
		gallery: { enabled: true },
	});

	//code below from Owl Carousel (https://owlcarousel2.github.io/OwlCarousel2/demos/basic.html) to provide a carousel effect to my quotes-section
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
});
