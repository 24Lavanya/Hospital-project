// Map initialisation
var map = L.map("map").setView([12.874466014287064, 74.85516364032976], 20);

//osm layer
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

//google street tile
googleStreets = L.tileLayer(
  "https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
  {
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

//google satellite tile
googleSat = L.tileLayer("https://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}", {
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});

googleSat.addTo(map);

//Marker
var marker = L.marker([12.874466014287064, 74.85516364032976]);
marker.addTo(map);
var marker2, movingMarker;

var car = L.icon({
  iconUrl: "/images/—Pngtree—classical stylish car_4180732.png",
  iconSize: [70, 70],
});
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        marker2 = L.marker([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        marker2.addTo(map);
        map.setView([position.coords.latitude, position.coords.longitude]);
        L.Routing.control({
          waypoints: [
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(12.874466014287064, 74.85516364032976),
          ],
        })
          .on("routesfound", function (e) {
            console.log(e);
            e.routes[0].coordinates.forEach((coord, i) => {
              setTimeout(() => {
                if (movingMarker) movingMarker.removeFrom(map);
                movingMarker = L.marker([coord.lat, coord.lng], {
                  icon: car,
                }).addTo(map);
              }, 10 * i);
            });
          })
          .addTo(map);
        if (movingMarker === L.latLng(12.874466014287064, 74.85516364032976)) {
          alert("Destination reached");
        }
      },
      function (error) {
        console.error("Error getting location:", error);
        alert("Could not get your location");
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    alert("Geolocation is not supported by your browser.");
  }
}

//Layer control

var baseMaps = {
  Osm: osm,
  "Google Streets": googleStreets,
  "Google Satellite": googleSat,
};

var overlayMaps = {
  Marker: marker,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

document.getElementById("directions").addEventListener("click", getLocation);

//Location details
var popup = L.popup();
function onMapClick(e) {
  //uses nominatim api that fetches placename from the lat and log
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
  )
    .then((response) => response.json())
    .then((data) => {
      popup
        .setLatLng(e.latlng)
        .setContent(`<b>Place Name:</b> ${data.display_name}`)
        .openOn(map);
    });
}

map.on("click", onMapClick);

////////////////////////////////////////////////////////

window.onload = () => {
  const messageBox = document.getElementById("message-box");

  // Use mouseover event for hover effect
  messageBox.addEventListener("mouseover", showStatus);
  // Use mouseout event to hide the status box when not hovering
  messageBox.addEventListener("mouseout", hideStatus);
};

const showStatus = () => {
  document.querySelector(".status-box").style.display = "block";
};

const hideStatus = () => {
  console.log("closed");
  document.querySelector(".status-box").style.display = "none";
};

///////////////////////////////////////////////////////////
