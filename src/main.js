// ============================================================================
// 
// Imports
//
// ============================================================================
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import TileLayer from "@arcgis/core/layers/TileLayer.js";
import Basemap from "@arcgis/core/Basemap.js";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import Point from "@arcgis/core/geometry/Point.js";
import Graphic from "@arcgis/core/Graphic.js";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js"; // Add this line
import { getStopInfo } from "./stopData.js";
import { getAttractionInfo } from "./attractionData.js";
import { getSpecialAttractionContent } from "./attractionDisplay.js";
import { routeNumberToNameMap, stopToRouteNumbersMap } from './routeData.js'; // Import the new route data
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import trainIconUrl from '../Pictures/train1.png'; // Import the train icon
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";

// Global variables for animation state
let animationIntervalId = null;
let currentAnimationGraphic = null;
let stopCoordinates = []; // Array to hold geometry points of stops in order
let currentStopIndex = 0;

// ========================================================
// Get the Basemap from ArcGIS Online
// ========================================================

// ***I need to figure out if I can get rid of this***
const webMap = new WebMap({
    portalItem: {
        basemap: "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer"
    }
});

// ============================================================================
// Side Panel for Stop and Attraction Information
// ============================================================================

// Create a side panel container
const sidePanel = document.createElement("div");
sidePanel.id = "side-panel";
sidePanel.style.position = "absolute";
sidePanel.style.left = "2%"; // 2% away from the left side
sidePanel.style.top = "15%"; // Position from top to create a floating effect
sidePanel.style.width = "20%"; 
sidePanel.style.height = "70%"; 
sidePanel.style.backgroundColor = "white";
sidePanel.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)"; // Enhanced shadow for floating effect
sidePanel.style.borderRadius = "8px"; // Rounded corners for floating appearance
sidePanel.style.zIndex = "1000";
sidePanel.style.overflowY = "auto";
sidePanel.style.padding = "20px";
sidePanel.style.boxSizing = "border-box";
sidePanel.style.display = "block"; // Initially visible
sidePanel.style.transition = "transform 0.3s ease, opacity 0.3s ease"; // Add smooth transition for showing/hiding

// Create a header for the panel
const panelHeader = document.createElement("h2");
panelHeader.textContent = "Stop Information";
panelHeader.style.marginTop = "0";
panelHeader.style.color = "#0079c1";
panelHeader.style.borderBottom = "1px solid #eee";
panelHeader.style.paddingBottom = "10px";

// Create a content container
const panelContent = document.createElement("div");
panelContent.id = "panel-content";

// Add default message
const defaultMessage = document.createElement("div");
defaultMessage.id = "default-message";
defaultMessage.style.fontSize = "14pt";
defaultMessage.style.marginTop = "20px";
defaultMessage.style.lineHeight = "1.4";
defaultMessage.innerHTML = "Click on any rail stop to find out more information about the routes that are available. You can click on the buttons below to see what each city has to offer! Using the distance calculator above, you can find the distance between any two stops.";
panelContent.appendChild(defaultMessage);

// Add elements to the panel
sidePanel.appendChild(panelHeader);
sidePanel.appendChild(panelContent);

// Add the panel to the document body
document.body.appendChild(sidePanel);

// Create a Calcite button in the bottom left corner to toggle the panel
const calciteInfoButton = document.createElement("calcite-button");
calciteInfoButton.id = "calcite-info-toggle";
calciteInfoButton.setAttribute("appearance", "solid");
calciteInfoButton.setAttribute("color", "blue");
calciteInfoButton.setAttribute("scale", "m");
calciteInfoButton.style.position = "absolute";
calciteInfoButton.style.bottom = "20px";
calciteInfoButton.style.left = "20px";
calciteInfoButton.style.zIndex = "1002";

// Add an icon to the Calcite button
const calciteInfoIcon = document.createElement("calcite-icon");
calciteInfoIcon.setAttribute("icon", "information");
calciteInfoIcon.setAttribute("scale", "m");
calciteInfoIcon.style.marginRight = "5px";

// Add text to the Calcite button
const calciteInfoButtonText = document.createTextNode("Info");

// Add elements to the Calcite button
calciteInfoButton.appendChild(calciteInfoIcon);
calciteInfoButton.appendChild(calciteInfoButtonText);

// Add click event to the Calcite button
calciteInfoButton.addEventListener("click", function() {
    if (sidePanel.style.display === "none") {
        
        // Show the panel with a fly-in animation
        sidePanel.style.display = "block";
        
        // Use setTimeout to ensure the display change takes effect before the animation
        setTimeout(() => {
            sidePanel.style.transform = "translate(0, 0)";
            sidePanel.style.opacity = "1";
        }, 10);
    
    } else {
        
        // Hide the panel with a fly-out animation to the bottom left corner
        sidePanel.style.transform = "translate(-100%, 100%)";
        sidePanel.style.opacity = "0";
        
        // Hide the panel after the animation completes
        setTimeout(() => {
            sidePanel.style.display = "none";
        }, 300); // Match the transition duration
    }
});

// Add the Calcite button to the document body
document.body.appendChild(calciteInfoButton);

// ============================================================================
// City Layer Attractions Points + Graphics
// ============================================================================

const montrealAttractions = [
    { name: "Montreal Biodome", x: -73.5500, y: 45.5600 },
    { name: "Old Port", x: -73.5500, y: 45.5000 },
    { name: "Notre-Dame Basilica of Montreal", x: -73.5565, y: 45.5046 },
    { name: "Mount Royal Park", x: -73.5937, y: 45.5048 },
    { name: "Jardin botanique de Montreal", x: -73.5628, y: 45.5578 },
    { name: "Jean Talon Market", x: -73.6147, y: 45.5312 },
    { name: "St. Helen's Island", x: -73.5347, y: 45.5189 }
];

const torontoAttractions = [
    { name: "CN Tower", x: -79.3871, y: 43.6426 },
    { name: "Royal Ontario Museum", x: -79.3947, y: 43.6677 },
    { name: "Fort York National Historic Site", x: -79.4039, y: 43.6377 },
    { name: "Toronto Islands", x: -79.3832, y: 43.6231 },
    { name: "Hockey Hall of Fame", x: -79.3771, y: 43.6471 },
    { name: "Toronto Zoo", x: -79.1825, y: 43.8209 },
    { name: "The Village at Black Creek", x: -79.5127, y: 43.7747 }
];

const ottawaAttractions = [
    { name: "Oh Canada Eh!? Dinner Musical", x:-75.698262, y: 45.413730 },
    { name: "Royal Canadian Mint", x: -75.698673, y: 45.431339 },
    { name: "Canada Aviation and Space Museum", x: -75.642427, y: 45.459076 },
    { name: "Canada Science and Technology Museum", x: -75.618652, y: 45.403093 },
    { name: "Original Haunted Walk of Ottawa", x: -75.695782, y: 45.423368 },
    { name: "613 Flea", x: -75.683371, y: 45.400179 },
    { name: "National Gallery of Canada", x: -75.69986, y: 45.429640 }
];

const quebecAttractions = [
    { name: "The Plains of Abraham", x: -71.2200, y: 46.8000 },
    { name: "Aquarium of Quebec", x: -71.289, y: 46.752 },
    { name: "Fortifications of Quebec National Historic Site", x: -71.2100, y: 46.8100 },
    { name: "Musée national des beaux-arts du Québec", x: -71.225, y: 46.801 },
    { name: "Grand Théâtre de Québec", x: -71.2200, y: 46.8100 },
    { name: "Parliament Building", x: -71.214, y: 46.808 },
    { name: "Rue du Petit Champlain", x: -71.203, y: 46.811 }
];

// Function to create graphics for attractions
function createAttractionGraphics(attractions) {
    return attractions.map((attraction, index) => {
        return new Graphic({
            geometry: new Point({
                x: attraction.x,
                y: attraction.y,
                spatialReference: { wkid: 4326 }
            }),
            attributes: {
                objectId: index + 1,
                name: attraction.name
            },
            symbol: new SimpleMarkerSymbol({
                color: [0, 71, 171], // Colbalt Blue
                size: 14,
                style: "diamond",
                outline: {
                    color: [255, 255, 255], // White outline
                    width: 3
                }
            })
        });
    });
}

// Create graphics layers for attractions (as opposed to feature layers)
const montrealAttractionsLayer = new GraphicsLayer({
    title: "Montreal Attractions",
    visible: false,
    graphics: createAttractionGraphics(montrealAttractions)
});

const torontoAttractionsLayer = new GraphicsLayer({
    title: "Toronto Attractions",
    visible: false,
    graphics: createAttractionGraphics(torontoAttractions)
});

const quebecAttractionsLayer = new GraphicsLayer({
    title: "Quebec Attractions",
    visible: false,
    graphics: createAttractionGraphics(quebecAttractions)
});

const ottawaAttractionsLayer = new GraphicsLayer({
    title: "Ottawa Attractions",
    visible: false,
    graphics: createAttractionGraphics(ottawaAttractions)
});

// Montreal Attractions Click Handler
montrealAttractionsLayer.on("click", (event) => {
    const graphic = event.graphic;
    if (graphic && graphic.attributes && graphic.attributes.name) {
        displayAttractionInfo(graphic.attributes.name, "Montreal");
    }
});

// Toronto Attractions Click Handler
torontoAttractionsLayer.on("click", (event) => {
    const graphic = event.graphic;
    if (graphic && graphic.attributes && graphic.attributes.name) {
        displayAttractionInfo(graphic.attributes.name, "Toronto");
    }
});

// Quebec Attractions Click Handler
quebecAttractionsLayer.on("click", (event) => {
    const graphic = event.graphic;
    if (graphic && graphic.attributes && graphic.attributes.name) {
        displayAttractionInfo(graphic.attributes.name, "Quebec");
    }
});

// Ottawa Attractions Click Handler
ottawaAttractionsLayer.on("click", (event) => {
    const graphic = event.graphic;
    if (graphic && graphic.attributes && graphic.attributes.name) {
        displayAttractionInfo(graphic.attributes.name, "Ottawa");
    }
});

// ============================================================================
// Map View
// ============================================================================
const view = new MapView({
    map: webMap,
    container: "viewDiv",
    zoom: 7,
    center: [-76.5, 43.7],
});

// Completely disable popups by overriding the popup object
view.popup = null; // BEAUTIFUL!!!!

// Prevent focus outline on the map
view.container.addEventListener("mousedown", function(event) {
    
    // Prevent the default focus behavior
    event.preventDefault();
    
    // Remove focus from any currently focused element
    if (document.activeElement) {
        document.activeElement.blur();
    }
    
    // Focus the view container but prevent the outline
    view.container.focus();
    
    // Add a class to the body to indicate the map is focused
    document.body.classList.add("map-focused");

    // Scroll the side panel to the top if it's visible
    const sidePanel = document.getElementById('side-panel');
    if (sidePanel && sidePanel.style.display !== 'none') {
        sidePanel.scrollTop = 0;
    }
});

// Remove the class when clicking outside the map
document.addEventListener("mousedown", function(event) {
    if (!view.container.contains(event.target)) {
        document.body.classList.remove("map-focused");
    }
});

// Move the zoom widget to the bottom right
view.ui.move("zoom", "bottom-right");

// Add padding to the bottom-right UI container to match the legend's spacing
view.ui.padding = {
    right: "5%"
};

// ============================================================================
// Basemap Toggle Widget
// ============================================================================

// Create the OpenStreetMap basemap
const osmBasemap = new Basemap({
    baseLayers: [new TileLayer({
        url: "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer",
        title: "Street Map"
    })],
    title: "Street Map"
});

// Create the Light Grey Canvas basemap
const lightGreyBasemap = new Basemap({
    baseLayers: [new TileLayer({
        url: "https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer",
        title: "Light Grey Canvas"
    })],
    title: "Light Grey Canvas"
});

// Set the initial basemap
webMap.basemap = osmBasemap;

// Create the basemap toggle widget
const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: lightGreyBasemap
});

// Add the widget to the bottom-right corner
view.ui.add(basemapToggle, "bottom-right");

// Create a symbol for the train stops - green squares with white outline
const stopSymbol = new SimpleMarkerSymbol({
    color: [238, 75, 43], //Bright Red
    size: 12, // 
    style: "circle",
    outline: {
        color: [255, 255, 255], // White
        width: 3
    }
});

// Create a symbol for selected rail stops (orange square with white outline)
const selectedRailStopSymbol = new SimpleMarkerSymbol({
    color: [238, 75, 43], // Bright Red
    size: 14, // Slightly larger than normal symbols
    style: "circle",
    outline: {
        color: [0, 0, 0], // Black
        width: 3 // Match the base symbol outline width
    }
});

// Create a unique value renderer for train lines
const routeColors = {
    "Toronto - Ottawa": [255, 65, 54], // Bright Red (#FF4136)
    "Ottawa - Quebec": [0, 116, 217], // Electric Blue (#0074D9)
    "Toronto-Kingston": [57, 255, 20],   // Neon Green (#39FF14)
    "Montreal - Quebec": [255, 133, 27], // Vivid Orange (#FF851B)
    "Toronto - Montreal": [240, 18, 190], // Magenta (#F012BE)
    "Windsor - Toronto": [26, 188, 156], // Turquoise (#1ABC9C)
    "Sarnia - Toronto": [255, 220, 0],  // Bright Yellow (#FFDC00)
    "London - Toronto": [177, 13, 201], // Purple (#B10DC9)
    "Toronto - New York": [80, 0, 0]  // Maroon (#500000)
};

// Create a mapping for display names (for legend)
// This fixes the issue with an incorrect route name in data
const routeDisplayNames = {
    "Toronto-Kingston": "Toronto - Kingston",
    "Toronto - New York": "Toronto - Niagara Falls"
};

// Create symbols for each route
const routeSymbols = {};
for (const [route, color] of Object.entries(routeColors)) {
    routeSymbols[route] = new SimpleLineSymbol({
        color: [color[0], color[1], color[2]],
        width: 4,
        style: "solid"
    });
}

// Create the unique value renderer
const routeRenderer = new UniqueValueRenderer({
    field: "Route",
    defaultSymbol: new SimpleLineSymbol({
        color: [192, 192, 192], // Light Gray for non-selected routes without transparency
        width: 4,
        style: "solid"
    }),
    uniqueValueInfos: Object.entries(routeSymbols).map(([route, symbol]) => ({
        value: route,
        symbol: symbol,
        label: route
    }))
});

// Train Stops Layer - from GeoJSON file
const trainStopsLayer = new GeoJSONLayer({
    url: "./src/train_stops.geojson",
    outFields: ["*"],
    popupTemplate: null,
    opacity: 1,
    renderer: new SimpleRenderer({ symbol: stopSymbol })
});

// Train Lines Layer - from GeoJSON file
const trainLinesLayer = new GeoJSONLayer({
    url: "./src/train_lines.geojson",
    outFields: ["*"],
    popupTemplate: null,
    opacity: 0.7,
    renderer: routeRenderer
});

// Apply the symbol to the train stops layer
trainStopsLayer.renderer = new SimpleRenderer({
    symbol: stopSymbol
});

// Apply the renderer to the train lines layer
trainLinesLayer.renderer = routeRenderer;

// Force refresh the layer (for good measure)
trainStopsLayer.refresh();

// Ensure the train stops layer is visible and on top
trainStopsLayer.visible = true;
trainStopsLayer.listMode = "hide"; // Hide from the layer list to avoid confusion

// Create a new map to replace the web map - Need to rework this
const customMap = new WebMap({
    basemap: osmBasemap
});

// Function to initialize the map with our custom layers
function initializeCustomMap() {
    console.log("Initializing custom map...");
    
    // Add our layers to the custom map in the correct order
    // Add railway lines first (bottom layer)
    customMap.add(trainLinesLayer);
    
    // Add attraction layers next
    console.log("Adding attraction layers to the map...");
    
    // Add attraction layers
    customMap.add(montrealAttractionsLayer);
    customMap.add(torontoAttractionsLayer);
    customMap.add(quebecAttractionsLayer);
    customMap.add(ottawaAttractionsLayer);
    
    // Add train stops last (top layer)
    customMap.add(trainStopsLayer);
    
    // Add a layer for animation effects
    const animationLayer = new GraphicsLayer({
        id: "route-animation-layer", // Add a specific ID
        title: "Animation Layer",
        listMode: "hide" // Hide from layer lists/legends
    });
    customMap.add(animationLayer);
    
    console.log("All layers added to the map");    
    
    // Set the view's map to our custom map
    view.map = customMap;
    
    // Initialize the legend with all routes
    updateLegend();
    
    // Create a container for all buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "button-container";
    buttonContainer.style.position = "absolute";
    buttonContainer.style.bottom = "20px";
    buttonContainer.style.left = "50%";
    buttonContainer.style.transform = "translateX(-50%)";
    buttonContainer.style.zIndex = "1000";
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.gap = "10px";
    
    // Create the city buttons and add them directly to the container
    createMontrealButton(buttonContainer);
    createTorontoButton(buttonContainer);
    createQuebecButton(buttonContainer);
    createOttawaButton(buttonContainer);
    createResetButton(buttonContainer);
    
    // Add the button container to the view
    view.container.appendChild(buttonContainer);
    
    // Set up click event handler on the view
    view.on("click", function(event) {
        console.log("View clicked, checking for hits...");
        
        // Get the screen point where user clicked
        const screenPoint = {
            x: event.x,
            y: event.y
        };
        
        // Hit test against the view to find clicked graphics
        view.hitTest(screenPoint).then(function(response) {
            
            // Check if any graphics were hit
            if (response.results.length > 0) {
                const clickedGraphic = response.results[0].graphic;

                // Check if the clicked graphic is one of the endpoint diamond markers
                if (window.selectedEndpointGraphics && window.selectedEndpointGraphics.includes(clickedGraphic)) {

                    // Perform a second hitTest specifically for the trainStopsLayer at the same location
                    view.hitTest(screenPoint, { include: trainStopsLayer }).then(function(stopResponse) {
                       
                        if (stopResponse.results.length > 0) {
                            const stopGraphic = stopResponse.results[0].graphic;
                            const stopName = stopGraphic.attributes.stop_name;
                            const routeName = stopGraphic.attributes.route_name || 'N/A';
                            
                            // Display stop info
                            displayStopInfo(stopName, routeName);
                           
                            // Highlight the actual stop (will call resetSelectedPoint first)
                            highlightSelectedPoint(stopGraphic);
                        }
                    });
                } 
                //  Logic for handling clicks on other features
                else if (clickedGraphic && clickedGraphic.attributes) {

                    // Check which layer the graphic belongs to (excluding highlighted route segments)
                    if (clickedGraphic.layer === montrealAttractionsLayer) {
                        console.log("Montreal attraction clicked");
                        highlightSelectedPoint(clickedGraphic); // Highlight the point first
                        displayAttractionInfo(clickedGraphic.attributes.name, "Montreal");
                    
                    } else if (clickedGraphic.layer === torontoAttractionsLayer) {
                        console.log("Toronto attraction clicked");
                        highlightSelectedPoint(clickedGraphic);
                        displayAttractionInfo(clickedGraphic.attributes.name, "Toronto");
                    
                    } else if (clickedGraphic.layer === quebecAttractionsLayer) {
                        console.log("Quebec attraction clicked");
                        highlightSelectedPoint(clickedGraphic);
                        displayAttractionInfo(clickedGraphic.attributes.name, "Quebec");
                    
                    } else if (clickedGraphic.layer === ottawaAttractionsLayer) {
                        console.log("Ottawa attraction clicked");
                        highlightSelectedPoint(clickedGraphic);
                        displayAttractionInfo(clickedGraphic.attributes.name, "Ottawa");
                    
                    } else if (clickedGraphic.layer === trainStopsLayer) {
                        console.log("Train stop clicked");
                        highlightSelectedPoint(clickedGraphic); // Highlight the point first
                        const stopName = clickedGraphic.attributes.stop_name;
                        displayStopInfo(stopName);
                    
                    } else if (clickedGraphic.geometry && clickedGraphic.geometry.type === "polyline" && clickedGraphic.layer === window.currentHighlightedRouteLayer) {
                        
                        // Highlight the segment endpoints
                        highlightSelectedPoint(clickedGraphic);
                    }
                }

            } else {
                // If nothing was clicked, reset the selected point
                resetSelectedPoint();
            }
        });
    });
};

// Initialize the map when the view is ready
view.when(() => {
    console.log("View is ready, initializing map...");
    
    // Create a promise for each layer to load
    const layerPromises = [
        montrealAttractionsLayer.load(),
        torontoAttractionsLayer.load(),
        quebecAttractionsLayer.load(),
        ottawaAttractionsLayer.load(),
        trainStopsLayer.load(),
        trainLinesLayer.load()
    ];
    
    // Wait for all layers to load before initializing the custom map
    Promise.all(layerPromises)
        .then(() => {
            console.log("Layers loaded successfully");
            initializeCustomMap();
            
            // Initialize distance search functionality
            const originSelect = document.getElementById('origin-select');
            const destinationSelect = document.getElementById('destination-select');
            const calculateButton = document.getElementById('calculate-button');
            const resultDisplay = document.getElementById('distance-result');

            // Function to populate dropdowns with train stops
            function populateStopDropdowns() {
                
                // Wait for the view to be ready and the map to be set
                view.when(() => {
                    
                    // Wait for the layer to be added to the map
                    return customMap.when(() => {
                        
                        // Then wait for the layer view to be ready
                        return view.whenLayerView(trainStopsLayer);
                    });
                })

                .then(function(layerView) {
                    
                    // Now that we have the layerView, we can query the layer
                    return trainStopsLayer.queryFeatures({
                        where: "1=1",
                        outFields: ["stop_name"]
                    });
                })
                
                .then(function(results) {
                    
                    // Get unique stop names and sort them
                    const stops = [...new Set(results.features.map(feature => feature.attributes.stop_name))].sort();
                    
                    // Clear existing options
                    originSelect.innerHTML = '<option value="">Select Origin</option>';
                    destinationSelect.innerHTML = '<option value="">Select Destination</option>';
                    
                    // Add stops to both dropdowns
                    stops.forEach(stop => {
                        const originOption = document.createElement('option');
                        originOption.value = stop;
                        originOption.textContent = stop;
                        originSelect.appendChild(originOption);
                        
                        const destOption = document.createElement('option');
                        destOption.value = stop;
                        destOption.textContent = stop;
                        destinationSelect.appendChild(destOption);
                    });
                })
                .catch(function(error) {
                    console.error("Error loading or querying stops:", error);
                    resultDisplay.textContent = "Error loading train stops.";
                });
            }

            // Add click event to calculate button
            calculateButton.addEventListener("click", () => {
                
                // Stop any running animation first
                stopRouteAnimation();
                
                // Reset any existing selection highlights (including endpoint markers)
                resetSelectedPoint();

                const origin = originSelect.value;
                const destination = destinationSelect.value;
                
                console.log("Selected origin:", origin);
                console.log("Selected destination:", destination);
                
                // Validate selections
                if (!origin || !destination) {
                    resultDisplay.textContent = "Please select both origin and destination.";
                    return;
                }
                
                // Check if same stop is selected
                if (origin === destination) {
                    resultDisplay.textContent = "Origin and destination cannot be the same stop.";
                    return;
                }
                              
                // Load both stops and lines data to calculate distance
                Promise.all([
                    fetch("./src/train_stops.geojson").then(response => response.json()),
                    fetch("./src/train_lines.geojson").then(response => response.json())
                ])
                
                .then(([stopsData, linesData]) => {
                    console.log("Loaded local data:", {stopsData, linesData});
                    
                    // Find origin and destination stops
                    const originStop = stopsData.features.find(stop => 
                        stop.properties.stop_name.toLowerCase() === origin.toLowerCase()
                    );
                    const destinationStop = stopsData.features.find(stop => 
                        stop.properties.stop_name.toLowerCase() === destination.toLowerCase()
                    );
                    
                    if (originStop && destinationStop) {
                       
                        // Calculate distance using Haversine formula
                        const distance = calculateHaversineDistance(
                            originStop.geometry.coordinates[1], // latitude
                            originStop.geometry.coordinates[0], // longitude
                            destinationStop.geometry.coordinates[1], // latitude
                            destinationStop.geometry.coordinates[0]  // longitude
                        );
                        
                        resultDisplay.textContent = `Distance: ${Math.round(distance)} km`;
                        
                        // Find route segments that connect these stops
                        const routeSegments = findRouteSegments(linesData, originStop, destinationStop);
                        
                        if (routeSegments.length > 0) {
                            
                            // Highlight the route segments
                            highlightRouteSegments(routeSegments.map(segment => segment.properties.OBJECTID).join(','));
                            
                            // Create a simple path for display
                            const pathStops = [origin, destination];
                            displayRoutePathInfo(origin, destination, pathStops.join('->'), Math.round(distance));
                        } else {
                            
                            // Just display basic route info without highlighting
                            const pathStops = [origin, destination];
                            displayRoutePathInfo(origin, destination, pathStops.join('->'), Math.round(distance));
                        }
                    
                    } else {
                        resultDisplay.textContent = "One or both stops not found in the data.";
                    }
                })

                .catch(error => {
                    console.error("Error calculating distance:", error);
                    resultDisplay.textContent = "Error calculating distance.";
                });
            });

            // Populate dropdowns after map initialization
            populateStopDropdowns();

            // Add the "Ready to Book!" button
            const bookButton = document.createElement("a");
            bookButton.id = "book-button";
            bookButton.href = "https://www.viarail.ca/en/travel-info/booking/buy-train-ticket";
            bookButton.target = "_blank"; // Open in new tab
            bookButton.textContent = "Ready to Book!";
            
            // Styled similar to city buttons
            bookButton.style.position = "absolute";
            bookButton.style.top = "70px";
            bookButton.style.left = "50%"; 
            bookButton.style.transform = "translateX(-50%)";
            bookButton.style.zIndex = "1001"; // Ensure it's above map but potentially below modals
            bookButton.style.padding = "10px 20px";
            bookButton.style.backgroundColor = "#0079c1";
            bookButton.style.color = "white";
            bookButton.style.border = "none";
            bookButton.style.borderRadius = "4px";
            bookButton.style.cursor = "pointer";
            bookButton.style.fontSize = "14px";
            bookButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
            bookButton.style.transition = "background-color 0.3s";
            bookButton.style.textDecoration = "none"; // Remove underline from link

            // Add hover effect
            bookButton.addEventListener("mouseover", function() {
                this.style.backgroundColor = "#005e95";
            });
            bookButton.addEventListener("mouseout", function() {
                this.style.backgroundColor = "#0079c1";
            });

            // Add the button back to the body
            document.body.appendChild(bookButton);
            console.log("Added 'Ready to Book!' button with absolute positioning.");

        })
        .catch(error => {
            console.error("Error loading layers:", error);
        });
});

// Function to display stop information in the side panel
function displayStopInfo(stopName) { // Removed routeName parameter
    
    // Show the side panel
    sidePanel.style.display = "block";
    
    // Hide the default message
    const defaultMessage = document.getElementById("default-message");
    if (defaultMessage) {
        defaultMessage.style.display = "none";
    }
    
    // Update panel header
    panelHeader.textContent = "Stop Information";
    
    // Get stop information from the stopData module
    const stopInfo = getStopInfo(stopName);
    
    // If no information is found for this stop, hide the panel and return
    if (!stopInfo) {
        sidePanel.style.display = "none";
        return;
    }

    // Look up route names using the new maps
    const routeNumbers = stopToRouteNumbersMap[stopName] || [];
    const routeNames = routeNumbers.map(num => routeNumberToNameMap[num] || `Unknown Route (${num})`);
    
    // Format routes as an HTML list, handle empty case
    let routeDisplayString = 'N/A';
    if (routeNames.length > 0) {
        const routeListItems = routeNames.map(name => `<li style="margin-left: 15px;">${name}</li>`).join('');
        routeDisplayString = `<ul style="margin: 0; padding: 0; list-style-position: inside;">${routeListItems}</ul>`;
    }
    
    // Create the content HTML using the stop information and looked-up routes
    panelContent.innerHTML = `
        <h3 style="margin-top: 0; color: #0079c1;">${stopName}</h3>
        <div style="border-bottom: 1px solid #eee; margin-bottom: 10px; padding-bottom: 10px;">
            <p style="margin: 5px 0;"><strong>Route:</strong></p> 
            ${routeDisplayString} 
        </div>
        <div style="margin-bottom: 10px;">
            <p style="margin: 5px 0;"><strong>Province:</strong> ${stopInfo.province}</p>
        </div>
        <div style="margin-bottom: 10px;">
            <p style="margin: 5px 0;"><strong>Description:</strong> ${stopInfo.description}</p>
        </div>
        <div style="margin-bottom: 10px;">
            <p style="margin: 5px 0;"><strong>Facilities:</strong> ${stopInfo.facilities}</p>
        </div>
        <div style="margin-bottom: 10px;">
            <p style="margin: 5px 0;"><strong>Connections:</strong> ${stopInfo.connections}</p>
        </div>
      `;
};

// ====================================================================
// Create Legend Panel
// ====================================================================

// Create a legend panel container
const legendPanel = document.createElement("div");
legendPanel.id = "legend-panel";
legendPanel.style.position = "absolute";
legendPanel.style.right = "2%";
legendPanel.style.top = "50%";
legendPanel.style.transform = "translateY(-50%)"; // Center vertically
legendPanel.style.width = "15%";
legendPanel.style.height = "55%";
legendPanel.style.backgroundColor = "white";
legendPanel.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)"; // Enhanced shadow for floating effect
legendPanel.style.borderRadius = "8px"; // Rounded corners for floating appearance
legendPanel.style.zIndex = "1000";
legendPanel.style.overflowY = "auto";
legendPanel.style.padding = "20px";
legendPanel.style.boxSizing = "border-box";
legendPanel.style.marginTop = "0";
legendPanel.style.transition = "transform 0.3s ease"; // Add smooth transition for showing/hiding

// Create a header for the legend panel
const legendHeader = document.createElement("h2");
legendHeader.textContent = "Active Routes";
legendHeader.style.marginTop = "0";
legendHeader.style.color = "#0079c1";
legendHeader.style.borderBottom = "1px solid #eee";
legendHeader.style.paddingBottom = "10px";

// Create a content container for the legend
const legendContent = document.createElement("div");
legendContent.id = "legend-content";
legendContent.style.marginTop = "15px";

// Create a Calcite button in the top right corner to toggle the legend
const calciteLegendButton = document.createElement("calcite-button");
calciteLegendButton.id = "calcite-legend-toggle";
calciteLegendButton.setAttribute("appearance", "solid");
calciteLegendButton.setAttribute("color", "blue");
calciteLegendButton.setAttribute("scale", "m");
calciteLegendButton.style.zIndex = "1002";

// Add an icon to the Calcite button
const calciteIcon = document.createElement("calcite-icon");
calciteIcon.setAttribute("icon", "legend");
calciteIcon.setAttribute("scale", "m");
calciteIcon.style.marginRight = "5px";

// Add text to the Calcite button
const calciteButtonText = document.createTextNode("Legend");

// Add elements to the Calcite button
calciteLegendButton.appendChild(calciteIcon);
calciteLegendButton.appendChild(calciteButtonText);

// Add click event to the Calcite button
calciteLegendButton.addEventListener("click", function() {
    if (legendPanel.style.transform === "translateX(300px)") {
        
        // Show the legend
        legendPanel.style.transform = "translateY(-50%)";
    } else {
        
        // Hide the legend - move it further to the right (300px instead of 250px)
        legendPanel.style.transform = "translateX(300px)";
    }
});

// Add elements to the legend panel
legendPanel.appendChild(legendHeader);
legendPanel.appendChild(legendContent);

// Add the legend panel to the document body
document.body.appendChild(legendPanel);

// Add the Calcite button to the map's UI system instead of directly to the container
view.ui.add(calciteLegendButton, "bottom-right");

// Function to update the legend based on active routes
function updateLegend(activeRoutes = null) {
    
    // Clear the legend content
    legendContent.innerHTML = "";
    
    // If no active routes are provided, show all routes
    if (!activeRoutes) {
        
        // Create legend items for all routes
        Object.entries(routeColors).forEach(([route, color]) => {
            const legendItem = document.createElement("div");
            legendItem.className = "legend-item";
            legendItem.style.display = "flex";
            legendItem.style.alignItems = "center";
            legendItem.style.marginBottom = "10px";
            legendItem.style.cursor = "pointer"; // Add cursor pointer to indicate clickable
            legendItem.dataset.route = route; // Store the route name as a data attribute
            
            // Create a color swatch
            const colorSwatch = document.createElement("div");
            colorSwatch.style.width = "20px";
            colorSwatch.style.height = "4px";
            colorSwatch.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            colorSwatch.style.marginRight = "10px";
            
            // Create a label
            const label = document.createElement("span");
            label.textContent = routeDisplayNames[route] || route;
            
            // Add elements to the legend item
            legendItem.appendChild(colorSwatch);
            legendItem.appendChild(label);
            
            // Add click event to highlight the route
            legendItem.addEventListener("click", function() {
                console.log("Legend item clicked for route:", route);
                highlightSingleRoute(route);
            });
            
            // Add the legend item to the legend content
            legendContent.appendChild(legendItem);
        });
    } else {
        
        // Create legend items only for active routes
        activeRoutes.forEach(route => {
            console.log("Creating active legend item for route:", route);
            
            if (routeColors[route]) {
                const color = routeColors[route];
                
                const legendItem = document.createElement("div");
                legendItem.className = "legend-item";
                legendItem.style.display = "flex";
                legendItem.style.alignItems = "center";
                legendItem.style.marginBottom = "10px";
                legendItem.style.cursor = "pointer"; // Add cursor pointer to indicate clickable
                legendItem.dataset.route = route; // Store the route name as a data attribute
                
                // Create a color swatch
                const colorSwatch = document.createElement("div");
                colorSwatch.style.width = "20px";
                colorSwatch.style.height = "4px";
                colorSwatch.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                colorSwatch.style.marginRight = "10px";
                
                // Create a label
                const label = document.createElement("span");
                label.textContent = routeDisplayNames[route] || route; // Use display name if available
                label.style.fontSize = "14px";
                
                // Add elements to the legend item
                legendItem.appendChild(colorSwatch);
                legendItem.appendChild(label);
                
                // Add click event to highlight the route
                legendItem.addEventListener("click", function() {
                    console.log("Active legend item clicked for route:", route);
                    highlightSingleRoute(route);
                });
                
                // Add the legend item to the legend content
                legendContent.appendChild(legendItem);
            } else {
                console.warn("Route not found in routeColors:", route);
            }
        });
    }
    
    // Add a "Show All Routes" button at the bottom of the legend
    const showAllButton = document.createElement("button");
    showAllButton.textContent = "Show All Routes";
    showAllButton.style.marginTop = "15px";
    showAllButton.style.padding = "8px 12px";
    showAllButton.style.backgroundColor = "#0079c1";
    showAllButton.style.color = "white";
    showAllButton.style.border = "none";
    showAllButton.style.borderRadius = "4px";
    showAllButton.style.cursor = "pointer";
    showAllButton.style.width = "100%";
    
    // Add click event to reset the highlighting
    showAllButton.addEventListener("click", function() {
        resetRouteHighlighting();
    });
    
    // Add the button to the legend content
    legendContent.appendChild(showAllButton);
}

// Function to highlight a single route
function highlightSingleRoute(routeName) {
    
    // First, reset any previous highlighting
    resetRouteHighlighting();
    
    // Find the actual route name in the data (reverse lookup from display name)
    let actualRouteName = routeName;
    for (const [dataRoute, displayRoute] of Object.entries(routeDisplayNames)) {
        if (displayRoute === routeName) {
            actualRouteName = dataRoute;
            break;
        }
    }
    
    // Create a definition expression to filter the layer
    // This will show only the selected route
    const routeFilter = `"Route" = '${actualRouteName}'`;
    console.log("Route filter:", routeFilter);
    
    // Create a grayed out symbol for non-matching routes
    const grayedOutSymbol = new SimpleLineSymbol({
        color: [200, 200, 200], // Light gray without transparency
        width: 1,
        style: "solid"
    });
    
    // Apply the grayed out symbol to the train lines layer
    trainLinesLayer.renderer = new SimpleRenderer({
        symbol: grayedOutSymbol
    });
    
    // Create a new layer for the highlighted route using GeoJSON file
    const highlightedRouteLayer = new GeoJSONLayer({
        url: "./src/train_lines.geojson",
        definitionExpression: routeFilter,
        renderer: routeRenderer,
        visible: true
    });
    
    // Add the highlighted route layer to the map
    customMap.add(highlightedRouteLayer);
    
    // Store the highlighted layer for later removal
    window.currentHighlightedLayer = highlightedRouteLayer;
    
    // Update the legend to show only the active route
    updateLegend([actualRouteName]);
}

// Function to reset route highlighting
function resetRouteHighlighting() {
    
    // Stop any running animation
    stopRouteAnimation();

    // Reset the train lines layer
    trainLinesLayer.definitionExpression = null;
    trainLinesLayer.renderer = routeRenderer;
    
    // Remove the highlighted routes layer if it exists
    if (window.currentHighlightedLayer) {
        customMap.remove(window.currentHighlightedLayer);
        window.currentHighlightedLayer = null;
    }
    
    // Remove the highlighted route segments layer if it exists
    if (window.currentHighlightedRouteLayer) {
        customMap.remove(window.currentHighlightedRouteLayer);
        window.currentHighlightedRouteLayer = null;
    }
    
    // Update the legend to show all routes
    updateLegend();
    
    console.log("Reset to default view");
}

// Function to display attraction information in the side panel
function displayAttractionInfo(attractionName, city) {
    console.log("displayAttractionInfo called with:", { attractionName, city });
    
    // Show the side panel
    sidePanel.style.display = "block";
    
    // Hide the default message
    const defaultMessage = document.getElementById("default-message");
    if (defaultMessage) {
        defaultMessage.style.display = "none";
    }
    
    const attractionInfo = getAttractionInfo(attractionName, city);
    console.log("Retrieved attraction info:", attractionInfo);
    
    if (!attractionInfo) {
        console.log("No attraction info found, hiding panel");
        sidePanel.style.display = "none";
        return;
    }
    
    // Get special content if it exists
    const specialContent = getSpecialAttractionContent(attractionName, city);
    console.log("Special content:", specialContent);
    
    // Update panel header
    panelHeader.textContent = "Attraction Information";
    
    // Update panel content
    panelContent.innerHTML = `
        <h2>${attractionInfo.name}</h2>
        <p>${attractionInfo.description || "No description available."}</p>
        ${specialContent || ""}
    `;
    
    console.log("Panel content updated");
    sidePanel.style.display = "block";
}

// ===============================================
// Button Functions
// ===============================================

// Function to create the Montreal button
function createMontrealButton(container) {
    // Create the Montreal button
    const montrealButton = document.createElement("button");
    montrealButton.id = "montreal-button";
    montrealButton.textContent = "Montreal";
    montrealButton.style.padding = "10px 20px";
    montrealButton.style.backgroundColor = "#0079c1";
    montrealButton.style.color = "white";
    montrealButton.style.border = "none";
    montrealButton.style.borderRadius = "4px";
    montrealButton.style.cursor = "pointer";
    montrealButton.style.fontSize = "14px";
    montrealButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    montrealButton.style.transition = "background-color 0.3s";
    
    // Add hover effect
    montrealButton.addEventListener("mouseover", function() {
        this.style.backgroundColor = "#005e95";
    });
    
    montrealButton.addEventListener("mouseout", function() {
        this.style.backgroundColor = "#0079c1";
    });
    
    // Add click event to zoom to Montreal and show attractions
    montrealButton.addEventListener("click", function() {
        // Toggle the visibility of the Montreal attractions layer
        const isVisible = montrealAttractionsLayer.visible;
        montrealAttractionsLayer.visible = !isVisible;
        
        console.log("Montreal attractions layer visibility toggled to:", !isVisible);
        
        // Update button text based on visibility
        this.textContent = isVisible ? "Montreal" : "Hide Montreal";
        
        // If showing attractions, zoom to Montreal
        if (!isVisible) {
            // Montreal coordinates (approximate center)
            const montrealCenter = new Point({
                x: -73.5673,
                y: 45.5017,
                spatialReference: { wkid: 4326 }
            });
            
            // Go to Montreal with a specific zoom level
            view.goTo({
                target: montrealCenter,
                zoom: 12
            }).then(() => {
                console.log("Zoomed to Montreal");
            }).catch(error => {
                console.error("Error zooming to Montreal:", error);
            });
        }
    });
    
    // Add the button to the container
    container.appendChild(montrealButton);
}

// Function to create the Toronto button
function createTorontoButton(container) {
    // Create the Toronto button
    const torontoButton = document.createElement("button");
    torontoButton.id = "toronto-button";
    torontoButton.textContent = "Toronto";
    torontoButton.style.padding = "10px 20px";
    torontoButton.style.backgroundColor = "#0079c1";
    torontoButton.style.color = "white";
    torontoButton.style.border = "none";
    torontoButton.style.borderRadius = "4px";
    torontoButton.style.cursor = "pointer";
    torontoButton.style.fontSize = "14px";
    torontoButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    torontoButton.style.transition = "background-color 0.3s";
    
    // Add hover effect
    torontoButton.addEventListener("mouseover", function() {
        this.style.backgroundColor = "#005e95";
    });
    
    torontoButton.addEventListener("mouseout", function() {
        this.style.backgroundColor = "#0079c1";
    });
    
    // Add click event to zoom to Toronto and show attractions
    torontoButton.addEventListener("click", function() {
        // Toggle the visibility of the Toronto attractions layer
        const isVisible = torontoAttractionsLayer.visible;
        torontoAttractionsLayer.visible = !isVisible;
        
        console.log("Toronto attractions layer visibility toggled to:", !isVisible);
        
        // Update button text based on visibility
        this.textContent = isVisible ? "Toronto" : "Hide Toronto";
        
        // If showing attractions, zoom to Toronto
        if (!isVisible) {
            // Toronto coordinates (approximate center)
            const torontoCenter = new Point({
                x: -79.3832,
                y: 43.68,
                spatialReference: { wkid: 4326 }
            });
            
            // Go to Toronto with a specific zoom level
            view.goTo({
                target: torontoCenter,
                zoom: 11
            }).then(() => {
                console.log("Zoomed to Toronto");
            }).catch(error => {
                console.error("Error zooming to Toronto:", error);
            });
        }
    });
    
    // Add the button to the container
    container.appendChild(torontoButton);
}

// Function to create the Quebec button
function createQuebecButton(container) {
    // Create the Quebec button
    const quebecButton = document.createElement("button");
    quebecButton.id = "quebec-button";
    quebecButton.textContent = "Quebec";
    quebecButton.style.padding = "10px 20px";
    quebecButton.style.backgroundColor = "#0079c1";
    quebecButton.style.color = "white";
    quebecButton.style.border = "none";
    quebecButton.style.borderRadius = "4px";
    quebecButton.style.cursor = "pointer";
    quebecButton.style.fontSize = "14px";
    quebecButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    quebecButton.style.transition = "background-color 0.3s";
    
    // Add hover effect
    quebecButton.addEventListener("mouseover", function() {
        this.style.backgroundColor = "#005e95";
    });
    
    quebecButton.addEventListener("mouseout", function() {
        this.style.backgroundColor = "#0079c1";
    });
    
    // Add click event to zoom to Quebec and show attractions
    quebecButton.addEventListener("click", function() {
        // Toggle the visibility of the Quebec attractions layer
        const isVisible = quebecAttractionsLayer.visible;
        quebecAttractionsLayer.visible = !isVisible;
        
        console.log("Quebec attractions layer visibility toggled to:", !isVisible);
        
        // Update button text based on visibility
        this.textContent = isVisible ? "Quebec" : "Hide Quebec";
        
        // If showing attractions, zoom to Quebec
        if (!isVisible) {
            // Quebec coordinates (approximate center)
            const quebecCenter = new Point({
                x: -71.2108,
                y: 46.8139,
                spatialReference: { wkid: 4326 }
            });
            
            // Go to Quebec with a specific zoom level
            view.goTo({
                target: quebecCenter,
                zoom: 12
            }).then(() => {
                console.log("Zoomed to Quebec");
            }).catch(error => {
                console.error("Error zooming to Quebec:", error);
            });
        }
    });
    
    // Add the button to the container
    container.appendChild(quebecButton);
}

// Function to create the Ottawa button
function createOttawaButton(container) {
    // Create the Ottawa button
    const ottawaButton = document.createElement("button");
    ottawaButton.id = "ottawa-button";
    ottawaButton.textContent = "Ottawa";
    ottawaButton.style.padding = "10px 20px";
    ottawaButton.style.backgroundColor = "#0079c1";
    ottawaButton.style.color = "white";
    ottawaButton.style.border = "none";
    ottawaButton.style.borderRadius = "4px";
    ottawaButton.style.cursor = "pointer";
    ottawaButton.style.fontSize = "14px";
    ottawaButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    ottawaButton.style.transition = "background-color 0.3s";
    
    // Add hover effect
    ottawaButton.addEventListener("mouseover", function() {
        this.style.backgroundColor = "#005e95";
    });
    
    ottawaButton.addEventListener("mouseout", function() {
        this.style.backgroundColor = "#0079c1";
    });
    
    // Add click event to zoom to Ottawa and show attractions
    ottawaButton.addEventListener("click", function() {
        // Toggle the visibility of the Ottawa attractions layer
        const isVisible = ottawaAttractionsLayer.visible;
        ottawaAttractionsLayer.visible = !isVisible;
        
        console.log("Ottawa attractions layer visibility toggled to:", !isVisible);
        
        // Update button text based on visibility
        this.textContent = isVisible ? "Ottawa" : "Hide Ottawa";
        
        // If showing attractions, zoom to Ottawa
        if (!isVisible) {
            // Ottawa coordinates (approximate center)
            const ottawaCenter = new Point({
                x: -75.6972,
                y: 45.4215,
                spatialReference: { wkid: 4326 }
            });
            
            // Go to Ottawa with a specific zoom level
            view.goTo({
                target: ottawaCenter,
                zoom: 12
            }).then(() => {
                console.log("Zoomed to Ottawa");
            }).catch(error => {
                console.error("Error zooming to Ottawa:", error);
            });
        }
    });
    
    // Add the button to the container
    container.appendChild(ottawaButton);
}

// Function to create the Reset button
function createResetButton(container) {
    // Create the Reset button
    const resetButton = document.createElement("button");
    resetButton.id = "reset-button";
    resetButton.textContent = "Reset";
    resetButton.style.padding = "10px 20px";
    resetButton.style.backgroundColor = "#D51A13";
    resetButton.style.color = "white";
    resetButton.style.border = "none";
    resetButton.style.borderRadius = "4px";
    resetButton.style.cursor = "pointer";
    resetButton.style.fontSize = "14px";
    resetButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    resetButton.style.transition = "background-color 0.3s";
    
    // Add hover effect
    resetButton.addEventListener("mouseover", function() {
        this.style.backgroundColor = "#C11414";
    });
    
    resetButton.addEventListener("mouseout", function() {
        this.style.backgroundColor = "#D51A13";
    });
    
    // Add click event to reset the map
    resetButton.addEventListener("click", function() {
        // Hide all city attraction layers
        montrealAttractionsLayer.visible = false;
        torontoAttractionsLayer.visible = false;
        quebecAttractionsLayer.visible = false;
        ottawaAttractionsLayer.visible = false;
        
        // Reset button text
        document.getElementById("montreal-button").textContent = "Montreal";
        document.getElementById("toronto-button").textContent = "Toronto";
        document.getElementById("quebec-button").textContent = "Quebec";
        document.getElementById("ottawa-button").textContent = "Ottawa";
        
        // Reset the selected point
        resetSelectedPoint();
        
        // Reset route highlighting (remove highlighting from rail line segments)
        resetRouteHighlighting();
        
        // Reset point value symbology to default
        resetPointValueSymbology();
        
        // Zoom out to the original extent
        view.goTo({
            zoom: 7,
            center: [-76.5, 43.7]
        }).then(() => {
            console.log("Reset map to original extent");
        }).catch(error => {
            console.error("Error resetting map:", error);
        });
    });
    
    // Add the button to the container
    container.appendChild(resetButton);
}

// Function to reset point value symbology to default
function resetPointValueSymbology() {
    console.log("Resetting point value symbology to default");
    
    // Reset train stops layer to default symbology
    trainStopsLayer.renderer = new SimpleRenderer({
        symbol: stopSymbol
    });
    
    // Force refresh the layer
    trainStopsLayer.refresh();
    
    console.log("Point value symbology reset to default");
}

// Create a symbol for selected attractions
const selectedSymbol = new SimpleMarkerSymbol({
    color: [20, 52, 164],  // Bright Orange
    size: 14,
    style: "diamond",
    outline: {
        color: [0, 0, 0], // White Outline
        width: 2
    }
});

// Function to highlight a selected point (either rail stop or attraction)
function highlightSelectedPoint(graphic) {
    
    // Reset any previously selected point
    resetSelectedPoint();

    // Handle clicks on highlighted route segments (polylines)
    if (graphic.geometry && graphic.geometry.type === "polyline") {
        const polyline = graphic.geometry;
        if (polyline.paths && polyline.paths.length > 0 && polyline.paths[0].length > 0) {
            const firstPath = polyline.paths[0];
            const startPoint = new Point({
                x: firstPath[0][0],
                y: firstPath[0][1],
                spatialReference: polyline.spatialReference
            });
            const endPoint = new Point({
                x: firstPath[firstPath.length - 1][0],
                y: firstPath[firstPath.length - 1][1],
                spatialReference: polyline.spatialReference
            });

            const startGraphic = new Graphic({
                geometry: startPoint,
                symbol: selectedSymbol // Use the existing blue diamond symbol
            });
            const endGraphic = new Graphic({
                geometry: endPoint,
                symbol: selectedSymbol // Use the existing blue diamond symbol
            });

            view.graphics.addMany([startGraphic, endGraphic]);
            window.selectedEndpointGraphics = [startGraphic, endGraphic]; // Store endpoint markers
        }
    }
    // Handle clicks on train stops
    else if (graphic.layer === trainStopsLayer) {
        
        // For rail stops, create a new graphic with the selected symbol
        const selectedGraphic = new Graphic({
            geometry: graphic.geometry,
            attributes: graphic.attributes,
            symbol: selectedRailStopSymbol // Red circle
        });
        view.graphics.add(selectedGraphic);
        window.selectedGraphic = selectedGraphic; // Store the main selected graphic (circle)
    }
    
    // Handle clicks on attractions (points)
    else if (graphic.geometry && graphic.geometry.type === "point") {
        
        // Store the original symbol before changing it
        graphic.originalSymbol = graphic.symbol;
        
        // For attractions, use the blue diamond symbol by changing the graphic's symbol
        graphic.symbol = selectedSymbol; // Blue diamond
        window.selectedGraphic = graphic; // Store the main selected graphic (attraction itself)
    }
}

// Function to reset the selected point
function resetSelectedPoint() {
    
    // Remove endpoint markers if they exist
    if (window.selectedEndpointGraphics) {
        view.graphics.removeMany(window.selectedEndpointGraphics);
        window.selectedEndpointGraphics = null;
    }

    // Reset the main selected graphic (attraction or train stop highlight)
    if (window.selectedGraphic) {
        
        // If it had an original symbol (attractions), restore it
        if (window.selectedGraphic.originalSymbol) {
            window.selectedGraphic.symbol = window.selectedGraphic.originalSymbol;
            
            // Clear the stored original symbol to avoid issues if clicked again
            delete window.selectedGraphic.originalSymbol;
        
        } else {
            
            // Otherwise (train stops), remove the added highlight graphic
            view.graphics.remove(window.selectedGraphic);
        }
        window.selectedGraphic = null;
    }
}

// Create dropdown lists for origin and destination
const originSelect = document.createElement("select");
const destinationSelect = document.createElement("select");
const calculateButton = document.createElement("button");
const resultDisplay = document.createElement("div");

// Populate dropdowns with stop names
trainStopsLayer.queryFeatures().then(function(results) {
    const stops = results.features.map(feature => feature.attributes.stop_name);
    
    stops.forEach(stop => {
        const originOption = document.createElement("option");
        originOption.value = stop;
        originOption.textContent = stop;
        originSelect.appendChild(originOption);
        
        const destOption = document.createElement("option");
        destOption.value = stop;
        destOption.textContent = stop;
        destinationSelect.appendChild(destOption);
    });
});

// Add click event to calculate button
calculateButton.addEventListener("click", () => {
    
    // Reset any existing selection highlights (including endpoint markers)
    resetSelectedPoint();

    const origin = originSelect.value;
    const destination = destinationSelect.value;
    
    console.log("Selected origin:", origin);
    console.log("Selected destination:", destination);
    
    // Validate selections
    if (!origin || !destination) {
        resultDisplay.textContent = "Please select both origin and destination.";
        return;
    }
    
    // Check if same stop is selected
    if (origin === destination) {
        resultDisplay.textContent = "Origin and destination cannot be the same stop.";
        return;
    }
    
    // First, log the actual values we're searching for
    console.log("Querying StopDistances table for:", {origin, destination});
    
    // Calculate distance using local GeoJSON data
    console.log("Calculating distance using local data for:", {origin, destination});
    
    // Load both stops and lines data to calculate distance
    Promise.all([
        fetch("./src/train_stops.geojson").then(response => response.json()),
        fetch("./src/train_lines.geojson").then(response => response.json())
    ])
    .then(([stopsData, linesData]) => {
        console.log("Loaded local data:", {stopsData, linesData});
        
        // Find origin and destination stops
        const originStop = stopsData.features.find(stop => 
            stop.properties.stop_name.toLowerCase() === origin.toLowerCase()
        );
        const destinationStop = stopsData.features.find(stop => 
            stop.properties.stop_name.toLowerCase() === destination.toLowerCase()
        );
        
        if (originStop && destinationStop) {
            // Calculate distance using Haversine formula
            const distance = calculateHaversineDistance(
                originStop.geometry.coordinates[1], // latitude
                originStop.geometry.coordinates[0], // longitude
                destinationStop.geometry.coordinates[1], // latitude
                destinationStop.geometry.coordinates[0]  // longitude
            );
            
            resultDisplay.textContent = `Distance: ${Math.round(distance)} km`;
        } else {
            resultDisplay.textContent = "One or both stops not found in the data.";
        }
    })
    .catch(error => {
        console.error("Error calculating distance:", error);
        resultDisplay.textContent = "Error calculating distance.";
    });
});

// Function to highlight route segments based on LineIDs
function highlightRouteSegments(lineIDsString) {
    console.log("Highlighting route segments with LineIDs:", lineIDsString);
    
    // Clear any previous route highlighting
    resetRouteHighlighting();
    
    // Parse the LineIDs string into an array of OBJECTIDs
    const lineIDs = lineIDsString.split(',').map(id => id.trim()).filter(id => id !== "");
    
    if (lineIDs.length === 0) {
        console.warn("No line IDs found to highlight");
        return;
    }
    
    console.log("Parsed LineIDs:", lineIDs);
    
    // Create a where clause to select these features
    const whereClause = `OBJECTID IN (${lineIDs.join(',')})`;
    console.log("Where clause:", whereClause);
    
    // Create a highlighted symbol for the route segments
    const highlightSymbol = new SimpleLineSymbol({
        color: [60, 223, 255], // #63e5ff - Bright cyan color
        width: 5,
        style: "solid"
    });

    // Function to handle zooming to features
    const zoomToFeatures = (features) => {
        if (!features || features.length === 0) return;

        let fullExtent = null;
        features.forEach((feature, index) => {
            if (feature.geometry) {
                if (index === 0) {
                    fullExtent = feature.geometry.extent.clone();
                } else {
                    fullExtent.union(feature.geometry.extent);
                }
            }
        });

        if (fullExtent) {
            view.goTo(fullExtent.expand(1.5)) // Expand extent slightly for padding
                .then(() => console.log("Zoomed to highlighted route segments."))
                .catch(err => console.error("Error zooming to route segments:", err));
        }
    };
    
    // Function to add highlight layer and reorder animation layer
    const addHighlightLayer = (graphics) => {
        const highlightedRouteLayer = new GraphicsLayer({
            title: "Highlighted Route",
            graphics: graphics
        });
        customMap.add(highlightedRouteLayer);
        window.currentHighlightedRouteLayer = highlightedRouteLayer;
        console.log("Added highlighted route layer with", graphics.length, "segments");

        // Ensure animation layer is on top
        const animLayer = customMap.findLayerById("route-animation-layer");
        if (animLayer) {
            customMap.reorder(animLayer, customMap.layers.length - 1);
        }

        return highlightedRouteLayer; // Return layer for potential use
    };
    
    // First try to find these features in the train lines layer
    trainLinesLayer.queryFeatures({
        where: whereClause,
        outFields: ["*"],
        returnGeometry: true
    
    }).then(results => {
        console.log("Query results for route segments:", results);
        
        if (results.features.length > 0) {
            
            // Create graphics for each segment
            const routeGraphics = results.features.map(feature => {
                return new Graphic({
                    geometry: feature.geometry,
                    symbol: highlightSymbol,
                    attributes: feature.attributes
                });
            });
            
            // Add the layer and reorder
            addHighlightLayer(routeGraphics);

            // Zoom to the extent of the features
            zoomToFeatures(results.features);

        } else {
            console.warn("No matching features found in train lines layer");
            
            // Try another approach - query the local GeoJSON file directly
            fetch("./src/train_lines.geojson")
                .then(response => response.json())
                .then(data => {
                    console.log("Direct query for train lines:", data);
                    
                    if (data.features && data.features.length > 0) {
                        // Filter features by the where clause (OBJECTID in lineIDs)
                        const matchingFeatures = data.features.filter(feature => 
                            lineIDs.includes(feature.properties.OBJECTID.toString())
                        );

                        if (matchingFeatures.length > 0) {
                            // Convert raw JSON features to Graphic objects for extent calculation and layer addition
                            const featuresFromJSON = matchingFeatures.map(featureJson => Graphic.fromJSON(featureJson));

                            // Create graphics for each feature
                            const routeGraphics = featuresFromJSON.map(feature => {
                                feature.symbol = highlightSymbol; // Apply the symbol
                                return feature;
                            });
                            
                             // Add the layer and reorder
                            addHighlightLayer(routeGraphics);

                            // Zoom to the extent of the features
                            zoomToFeatures(featuresFromJSON);
                        } else {
                            console.warn("Could not find route segments to highlight");
                        }
                    } else {
                        console.warn("Could not find route segments to highlight");
                    }
                })
                .catch(error => {
                    console.error("Error querying for route segments:", error);
                });
        }
    }).catch(error => {
        console.error("Error querying train lines layer:", error);
    });
}

// Function to display route path information in the side panel
function displayRoutePathInfo(origin, destination, fullPathStops, distance) {
    // Show the side panel
    sidePanel.style.display = "block";
    
    // Hide the default message
    const defaultMessage = document.getElementById("default-message");
    if (defaultMessage) {
        defaultMessage.style.display = "none";
    }
    
    // Update panel header
    panelHeader.textContent = "Route Information";
    
    // Calculate estimated ticket price using the polynomial equation
    const estimatedPrice = Math.round(-0.00011 * Math.pow(distance, 2) + 0.432 * distance + 4.38);
    
    // Process the fullPathStops - it has a format like "A->B->C->B->D"
    let stopsArray = [];
    
    try {
        console.log("Original FullPathStops:", fullPathStops);
        
        // First, ensure we're dealing with a string
        const stopsString = String(fullPathStops);
        
        // Split the string by "->" to get individual stop names
        const rawStopsArray = stopsString.split('->').map(stop => stop.trim());
        console.log("Raw stops array after splitting by '->':", rawStopsArray);
        
        // Remove duplicate stop names while preserving order (keep first occurrence) 
        // due to the buggy format of the fullPathStops text data
        const seenStops = new Set();
        stopsArray = rawStopsArray.filter(stop => {
            if (!stop) return false; // Skip empty strings
            const isDuplicate = seenStops.has(stop);
            seenStops.add(stop);
            return !isDuplicate;
        });
        
        console.log("Deduplicated stops:", stopsArray);
    
    } catch (e) {
        console.error("Error parsing FullPathStops:", e);
        stopsArray = [origin, destination]; // Fallback to just origin and destination
    }
    
    // Create a formatted list of stops
    const stopsListHTML = stopsArray.map((stop, index) => {
        // Highlight the origin and destination
        const isOrigin = stop === origin;
        const isDestination = stop === destination;
        const style = isOrigin || isDestination ? 
            'font-weight: bold; color: #0079c1;' : '';
        
        // Add indicators for origin/destination
        const indicator = isOrigin ? ' (Origin)' : isDestination ? ' (Destination)' : '';
        
        return `<li style="${style}">${stop}${indicator}</li>`;
    }).join('');
    
    // Update panel content
    panelContent.innerHTML = `
        <h3 style="margin-top: 0; color: #0079c1;">Journey from ${origin} to ${destination}</h3>
        <div style="border-bottom: 1px solid #eee; margin-bottom: 10px; padding-bottom: 10px;">
            <p style="margin: 5px 0;"><strong>Estimated One-Way Ticket Price:</strong> $${estimatedPrice}</p>
            <p style="margin: 5px 0;"><strong>Total Distance:</strong> ${distance} km</p>
        </div>
        <div style="margin-bottom: 10px;">
            <p style="margin: 5px 0;"><strong>Stops along this route:</strong></p>
            <ol style="padding-left: 20px;">
                ${stopsListHTML}
            </ol>
        </div>
    `;
    
    console.log("Route path information displayed in side panel");

    console.log("Processed stopsArray for animation:", stopsArray);

    // Start the animation using the calculated stops array
    if (stopsArray.length > 1) {
        startRouteAnimation(stopsArray);
    }
}

// ============================================================================
// Helper Functions for Local Data Processing
// ============================================================================

// Function to calculate distance between two points using Haversine formula
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Function to find route segments between two stops using BFS pathfinding
function findRouteSegments(linesData, originStop, destinationStop) {
    
    // 1. Map stop coordinates to stop names for quick lookup
    const stopCoordToName = {};
    const stopNameToCoord = {};
    
    // Use 5 decimal places for coordinate matching
    function coordKey(coord) {
        return coord[0].toFixed(5) + ',' + coord[1].toFixed(5);
    }
    
    // Build lookup tables
    if (originStop && destinationStop) {
        
        // If passed as GeoJSON features
        if (originStop.geometry && originStop.geometry.coordinates) {
            stopCoordToName[coordKey(originStop.geometry.coordinates)] = originStop.properties.stop_name;
            stopNameToCoord[originStop.properties.stop_name] = originStop.geometry.coordinates;
        }
        if (destinationStop.geometry && destinationStop.geometry.coordinates) {
            stopCoordToName[coordKey(destinationStop.geometry.coordinates)] = destinationStop.properties.stop_name;
            stopNameToCoord[destinationStop.properties.stop_name] = destinationStop.geometry.coordinates;
        }
    }
    
    // Add all stops from the lines data (for robustness)
    // (If you have all stops available, you can use that list instead)
    // 2. Build a graph: stop coordinate key -> array of {neighborKey, segment}
    const graph = {};
    const segmentMap = {}; // Map from segment id to segment
    linesData.features.forEach(segment => {
        const coords = segment.geometry.coordinates;
        
        // For each pair of consecutive points in the LineString, treat as an edge
        for (let i = 0; i < coords.length - 1; i++) {
            const a = coords[i];
            const b = coords[i + 1];
            const aKey = coordKey(a);
            const bKey = coordKey(b);
            
            // Add to graph both directions (undirected)
            if (!graph[aKey]) graph[aKey] = [];
            if (!graph[bKey]) graph[bKey] = [];
            graph[aKey].push({ neighbor: bKey, segment });
            graph[bKey].push({ neighbor: aKey, segment });
            
            // Store segment for later
            segmentMap[segment.id || segment.properties.OBJECTID || JSON.stringify(segment.geometry.coordinates)] = segment;
        }
    });
    // 3. BFS to find path from origin to destination
    const startKey = coordKey(originStop.geometry.coordinates);
    const endKey = coordKey(destinationStop.geometry.coordinates);
    const queue = [{ key: startKey, path: [], visitedSegments: new Set() }];
    const visited = new Set();
    while (queue.length > 0) {
        const { key, path, visitedSegments } = queue.shift();
        if (key === endKey) {
            
            // Return the segments along the path
            return path;
        }
        if (visited.has(key)) continue;
        visited.add(key);
        (graph[key] || []).forEach(({ neighbor, segment }) => {
            
            // Avoid cycles by not revisiting segments
            const segId = segment.id || segment.properties.OBJECTID || JSON.stringify(segment.geometry.coordinates);
            if (!visitedSegments.has(segId)) {
                const newVisitedSegments = new Set(visitedSegments);
                newVisitedSegments.add(segId);
                queue.push({
                    key: neighbor,
                    path: [...path, segment],
                    visitedSegments: newVisitedSegments
                });
            }
        });
    }
    
    // No path found
    return [];
}

// ============================================================================
// Animation Functions
// ============================================================================

// Function to stop any existing route animation
function stopRouteAnimation() {
    if (animationIntervalId) {
        clearInterval(animationIntervalId);
        animationIntervalId = null;
    }
    
    if (currentAnimationGraphic) {
        // Find the animation layer using its ID
        const animLayer = customMap.findLayerById("route-animation-layer"); // Use the specific ID
        if (animLayer) {
            animLayer.remove(currentAnimationGraphic);
        }
        currentAnimationGraphic = null;
    }
    
    stopCoordinates = [];
    currentStopIndex = 0;
    console.log("Route animation stopped.");
}

// Function to start the route animation between stops
async function startRouteAnimation(stopsArray) {
    stopRouteAnimation(); // Stop any previous animation

    if (!stopsArray || stopsArray.length < 2) {
        console.log("Not enough stops to animate.");
        return;
    }

    // 1. Get coordinates for all stops in the array
    const queryPromises = stopsArray.map(stopName => {
        return trainStopsLayer.queryFeatures({
            where: `stop_name = '${stopName}'`,
            outFields: ["stop_name"],
            returnGeometry: true,
            num: 1 // We only need one feature per stop name
        });
    });

    try {
        const results = await Promise.all(queryPromises);
        stopCoordinates = results.map((result, index) => {
            if (result.features.length > 0) {
                return result.features[0].geometry;
            } else {
                console.warn(`Could not find geometry for stop: ${stopsArray[index]}`);
                return null; // Handle cases where a stop might not be found
            }
        }).filter(geom => geom !== null); // Filter out any null geometries

        if (stopCoordinates.length < 2) {
            console.warn("Could not retrieve coordinates for enough stops to animate.");
            return;
        }

        // 2. Create the animation graphic
        const animationSymbol = new PictureMarkerSymbol({
            url: trainIconUrl, // Use the imported variable
            width: "36px",  // Adjust size as needed
            height: "36px" // Adjust size as needed
        });

        currentAnimationGraphic = new Graphic({
            geometry: stopCoordinates[0], // Start at the first stop
            symbol: animationSymbol
        });

        // Find the animation layer using its ID
        const animLayer = customMap.findLayerById("route-animation-layer"); // Use the specific ID
        if (!animLayer) {
            console.error("Animation layer (ID: route-animation-layer) not found!");
            return;
        }
        animLayer.add(currentAnimationGraphic);

        // 3. Start the animation loop
        currentStopIndex = 0;
        animationIntervalId = setInterval(() => {
            currentStopIndex++;
            if (currentStopIndex >= stopCoordinates.length) {
                currentStopIndex = 0; // Loop back to the start
            }
            
            // Update the graphic's position
            if (currentAnimationGraphic && stopCoordinates[currentStopIndex]) {
                 currentAnimationGraphic.geometry = stopCoordinates[currentStopIndex];
            } else {
                
                // Safety check in case something went wrong
                stopRouteAnimation();
            }
        }, 800); // Move every 0.8 seconds (increased speed)

        console.log("Route animation started.");

    } catch (error) {
        console.error("Error fetching stop coordinates for animation:", error);
        stopRouteAnimation(); // Clean up if there was an error
    }
}