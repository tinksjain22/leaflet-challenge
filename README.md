# leaflet-challenge

## **Objective**

Develop an interactive map to visualize USGS earthquake data. The visualization should:
1. Display earthquake locations.
2. Indicate the magnitude and depth of each earthquake using marker size and color.
3. Provide popups with detailed information about each earthquake.
4. Include a legend for data context.

---

## **Project Structure**

### **Repository Setup**
1. Create a new repository named `leaflet-challenge`.
2. Clone the repository to your local machine.
3. Inside the repository, create directories for the two parts of the challenge:
   - `Leaflet-Part-1`
   - `Leaflet-Part-2` (optional)
4. Add necessary HTML, CSS, and JavaScript files to the respective folders.
5. Push all changes to GitHub.

---

## **Instructions**

### **Part 1: Earthquake Visualization**
Using Leaflet, create an interactive map to display earthquake data. Follow these steps:

#### **Step 1: Fetch the Data**
1. Visit the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to access real-time earthquake data.
2. Select a dataset (e.g., "All Earthquakes from the Past 7 Days").
3. Use the JSON URL to pull the data into your project.

#### **Step 2: Visualize the Data**
1. **Map Setup:** 
   - Create a map using Leaflet centered on a specific region or with global coverage.
2. **Data Markers:**
   - Plot earthquake locations using their latitude and longitude.
   - Marker **size** should represent earthquake magnitude.
   - Marker **color** should represent earthquake depth (darker colors for deeper quakes).
3. **Popups:**
   - Add popups to markers showing additional information, such as location, magnitude, depth, and time.
4. **Legend:**
   - Create a legend to explain the marker color and size.

---

### **Part 2: Additional Visualization (Optional)**
Enhance your map by adding tectonic plate data and interactive features:

1. Fetch tectonic plate data from [this repository](https://github.com/fraxen/tectonicplates).
2. **Overlay Layers:**
   - Plot tectonic plate boundaries alongside earthquake data.
   - Add additional base maps for users to choose from.
3. **Layer Controls:**
   - Create controls to toggle layers (e.g., earthquakes, tectonic plates) on and off.

---

## **Expected Outputs**

### **Part 1 Output**
An interactive map displaying:
- Earthquake markers sized by magnitude and colored by depth.
- Popups with detailed earthquake information.
- A legend for interpreting the data.

### **Part 2 Output (Optional)**
An advanced interactive map with:
- Tectonic plate boundaries.
- Multiple base maps.
- Layer controls for toggling data views.

---
