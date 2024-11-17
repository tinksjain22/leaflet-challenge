// Create the map object with center and zoom level
let myMap = L.map("map", {
    center: [37.09, -95.71], // Centered on the United States
    zoom: 5,
  });
  
  // Base layers
  let satellite = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  });
  
  let grayscale = L.tileLayer("https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  });
  
  let outdoors = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenTopoMap contributors",
  });
  
  // Add the satellite layer as default
  satellite.addTo(myMap);
  
  // Load the earthquake data from USGS GeoJSON API
  let earthquakeURL =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Define a function to style each earthquake marker based on its depth
  function styleInfo(feature) {
    let depth = feature.geometry.coordinates[2]; // Depth is the third coordinate
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(depth),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5,
    };
  }
  
  // Define a function to determine color based on depth
  function getColor(depth) {
    if (depth > 90) return "#ff0000";
    if (depth > 70) return "#ff7300";
    if (depth > 50) return "#ffbb00";
    if (depth > 30) return "#ffff00";
    if (depth > 10) return "#adff2f";
    return "#00ff00";
  }
  
  // Define a function to calculate radius based on magnitude
  function getRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4;
  }
  
  // Load the earthquake data
  d3.json(earthquakeURL).then(function (data) {
    // Create a GeoJSON layer with the retrieved data
    let earthquakes = L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "Magnitude: " +
            feature.properties.mag +
            "<br>Depth: " +
            feature.geometry.coordinates[2] +
            " km<br>Location: " +
            feature.properties.place
        );
      },
    });
  
    // Add the earthquake layer to the map
    earthquakes.addTo(myMap);
  
    // Load the tectonic plates data
    let tectonicPlatesURL =
      "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
  
    d3.json(tectonicPlatesURL).then(function (platesData) {
      // Create a GeoJSON layer for tectonic plates
      let tectonicPlates = L.geoJson(platesData, {
        style: {
          color: "orange",
          weight: 2,
        },
      });
  
      // Create base maps
      let baseMaps = {
        Satellite: satellite,
        Grayscale: grayscale,
        Outdoors: outdoors,
      };
  
      // Create overlay maps
      let overlayMaps = {
        "Tectonic Plates": tectonicPlates,
        Earthquakes: earthquakes,
      };
  
      // Add layer control to the map
      L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
      // Add tectonic plates layer to the map
      tectonicPlates.addTo(myMap);
    });
  });
  
  // Set up the legend
  let legend = L.control({ position: "bottomright" });
  
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = [
      "#00ff00", // Shallowest
      "#adff2f",
      "#ffff00",
      "#ffbb00",
      "#ff7300",
      "#ff0000", // Deepest
    ];
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        "<div class=\"legend-item\">" +
        "<i style=\"background-color:" +
        colors[i] +
        "\"></i> " +
        depths[i] +
        (depths[i + 1] ? "&ndash;" + depths[i + 1] + " <br>" : "+") +
        "</div>";
    }
    div.innerHTML += "</div>";
  
    return div;
  };
  
  // Add the legend to the map
  legend.addTo(myMap);
  