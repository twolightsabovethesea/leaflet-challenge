

// Perform a GET request to the query URL/
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });


  function createFeatures(quakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(quakeData, {
      onEachFeature: onEachFeature
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
  
    // creates a basic streetmap tile layer

    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
  
    // creates a topographic layer
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // creates a baseMaps object that includes the streetmap and topo layers
    var baseMaps = {
      "Street Map": streetmap,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 3,
      layers: [streetmap, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }

  /// EDITS ABOVE ///

  /*
  
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
            radius: data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}
        else if (data[i].properties.mag <= '30')
        {var newMarker = L.circle([data[i].geometry.coordinates[1], 
            data[i].geometry.coordinates[0]], {
            color: 'white',
            fillColor: 'yellow',
            fillOpacity: 0.5,
            radius: data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}
        else if (data[i].properties.mag <= '50')
        {var newMarker = L.circle([data[i].geometry.coordinates[1], 
            data[i].geometry.coordinates[0]], {
            color: 'white',
            fillColor: 'gold',
            fillOpacity: 0.5,
            radius: data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}
        else if (data[i].properties.mag <= '70')
        {var newMarker = L.circle([data[i].geometry.coordinates[1], 
            data[i].geometry.coordinates[0]], {
            color: 'white',
            fillColor: 'LightSalmon',
            fillOpacity: 0.5,
            radius: data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}
        else if (data[i].properties.mag <= '90')
        {var newMarker = L.circle([data[i].geometry.coordinates[1], 
            data[i].geometry.coordinates[0]], {
            color: 'white',
            fillColor: 'DarkOrange',
            fillOpacity: 0.5,
            radius: data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}
        if (data[i].properties.mag >= '90')
        {var newMarker = L.circle([data[i].geometry.coordinates[1], 
            data[i].geometry.coordinates[0]], {
            color: 'white',
            fillColor: 'Red',
            fillOpacity: 0.5,
            radius: data[i].geometry.coordinates[2] * 10
        }).addTo(mymap);}
        
        markers.append(newMarker)

    }

});

// Create a control for our layers, and add our overlays to it.
L.control.layers(null, markers).addTo(map);

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

console.log(markers)


*/

