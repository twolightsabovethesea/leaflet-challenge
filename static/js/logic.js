// creates a basic streetmap tile layer

var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// creates the map

var map = L.map("map", {
    center: [41.09, -96.30],
    zoom: 5,

  });

  // add the streetmap tile layer to the map

  streetmap.addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson")
.then(function(data) {
    console.log(data)
});
