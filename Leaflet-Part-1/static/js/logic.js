// Creating the map object
let myMap = L.map("map", {
    center: [40.7, -73.95], // Initial center coordinates
    zoom: 2 // Adjusted for global view
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// URL to fetch earthquake data
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to get color based on earthquake depth
function getColor(depth) {
    return depth > 90 ? "#ff5f65" :
           depth > 70 ? "#fca35d" :
           depth > 50 ? "#fdb72a" :
           depth > 30 ? "#f7db11" :
           depth > 10 ? "#dcf400" :
                        "#a3f600";
}

// Function to get marker radius based on magnitude
function getRadius(magnitude) {
    return magnitude ? magnitude * 4 : 1;
}

// Fetch earthquake data
d3.json(url).then(function(data) {
    // Add GeoJSON layer to the map
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            // Add popups to display earthquake details
            layer.bindPopup(
                `<h3>${feature.properties.place}</h3>
                <hr>
                <p>Magnitude: ${feature.properties.mag}</p>
                <p>Depth: ${feature.geometry.coordinates[2]} km</p>
                <p>Date: ${new Date(feature.properties.time).toLocaleString()}</p>`
            );
        }
    }).addTo(myMap);

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

    legend.addTo(myMap);
});

