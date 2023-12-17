// Map initialisation
var map = L.map("map").setView([12.8744226, 74.8525889], 20);

//osm layer
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
osm.addTo(map);


//google street tile
googleStreets = L.tileLayer('https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

//google satellite tile
googleSat = L.tileLayer('https://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});



//Marker
var marker = L.marker([12.874466014287064, 74.85516364032976])
marker.addTo(map);

//Layer control

var baseMaps = {
    "Osm": osm,
    "Google Streets": googleStreets,
    "Google Satellite":googleSat
};

var overlayMaps = {
    "Marker": marker
};

// L.control.layers(baseMaps, overlayMaps).addTo(map);

// if (navigator.geolocation) {
    
//     navigator.geolocation.getCurrentPosition(function (position) {
//         console.log(position)
//     }, function (error) {
//         console.error("Error getting location:", error);
//         alert("Could not get your location")
//     })
// }


L.control.locate().addTo(map);


//Location details
// var popup = L.popup();
// function onMapClick(e) {
//   //uses nominatim api that fetches placename from the lat and log
//   fetch(
//     `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       popup
//         .setLatLng(e.latlng)
//         .setContent(`<b>Place Name:</b> ${data.display_name}`)
//         .openOn(map);
//     });
// }

// map.on("click", onMapClick);

