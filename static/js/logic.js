



// Perform a GET request to retrieve the geojson earthquake data/
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
    console.log(data);
  });

// creates a function to set marker color based on earthquake depth
function colorSelect(depth){
    if (depth > 90) {
        return 'red'
    } 
    else if (depth > 70) {
        return 'darkorange'
    } 
    else if (depth > 50) {
        return 'lightsalmon'
    } 
    else if (depth > 30) {
        return 'gold'
    } 
    else if (depth >10) {
        return 'yellow'
    } 
    else {return 'green'}
};

// creates a function to set radius size for markers based on magnitude
function radiusSize(mag){
    if (mag == 0){
        return 1
    }
    return mag * 10
};

// create a function
  function createFeatures(quakeData) {

    // creates a function that will run once for each feature in the features array
    // for each feature adds a popup that describes the place and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  
    // creates a GeoJSON layer that contains the features array on the quakeData object
    // runs the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(quakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng)
      },
      style : function(feature){
          return {
            color: 'white',
            fillColor: colorSelect(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            radius: radiusSize(feature.properties.mag)

          }
      }
    });
  
    // sends the earthquakes layer to the createMap function
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
  
    // create an overlay object for the overlay
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // creates the map with streetmap and earthquakes layers 
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 3,
      layers: [streetmap, earthquakes]
    });
  
    // creates a layer control
    // passes it our baseMaps and overlayMaps
    // adds the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    // creates legend

    var legend = L.control({
        position : 'bottomright',    
    });

    // creates function to add colors and info to legend

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var grades = [-10, 10, 30, 50, 70, 90];
        var colors = [
          "#98EE00",
          "#D4EE00",
          "#EECC00",
          "#EE9C00",
          "#EA822C",
          "#EA2C2C"
        ];
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
            + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
          }
          return div;
        };
        legend.addTo(myMap);
  
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

