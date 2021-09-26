// creates a basic streetmap tile layer

var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// creates the map

var map = L.map("map", {
    center: [41.09, -96.30],
    zoom: 4.5,

  });

  // add the streetmap tile layer to the map

  streetmap.addTo(map);

var markers = {}


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")
.then(function(data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        if (data[i].properties.mag <= '10')
        {var newMarker = L.circle([data[i].geometry.coordinates[1], 
            data[i].geometry.coordinates[0]], {
            color: 'white',
            fillColor: 'green',
            fillOpacity: 0.5,
            radius: = data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}
        else if (data[i].properties.mag <= '30')
        {var newMarker = L.circle([data[i].geometry.coordinates[1], 
            data[i].geometry.coordinates[0]], {
            color: 'white',
            fillColor: 'yellow',
            fillOpacity: 0.5,
            radius: = data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}
        else if (data[i].properties.mag <= '50')
        {var newMarker = L.circle([data[i].geometry.coordinates[1], 
            data[i].geometry.coordinates[0]], {
            color: 'white',
            fillColor: 'gold',
            fillOpacity: 0.5,
            radius: = data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}
        else if (data[i].properties.mag <= '70')
        {var newMarker = L.circle([data[i].geometry.coordinates[1], 
            data[i].geometry.coordinates[0]], {
            color: 'white',
            fillColor: '#green',
            fillOpacity: 0.5,
            radius: = data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}

    }

    }
});

// Create a control for our layers, and add our overlays to it.
L.control.layers(null).addTo(map);

// Create a legend to display information about our map.
var info = L.control({
    position: "bottomright"
  });

// When the layer control is added, insert a div with the class of "legend".
info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map.
info.addTo(map);




