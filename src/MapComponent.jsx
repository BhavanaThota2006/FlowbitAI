// import React, { useState } from 'react';
// import { MapContainer, TileLayer, WMSTileLayer, FeatureGroup } from 'react-leaflet';
// import { EditControl } from "react-leaflet-draw";
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-draw/dist/leaflet.draw.css';
// import L from 'leaflet';

// // Import all 3 images explicitly
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// // Delete the default path getter
// delete L.Icon.Default.prototype._getIconUrl;

// // Merge all 3 options so Leaflet knows exactly where to find them
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerIcon2x,
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
// });

// const MapComponent = () => {
//     // We start centered on Cologne (NRW region) as per the assignment context
//     const position = [50.9375, 6.9603]; 
    
//     const [mapLayers, setMapLayers] = useState([]);

//     const _onCreate = (e) => {
//         console.log("Shape Created", e);
//         const { layerType, layer } = e;
//         if (layerType === 'polygon') {
//             const latlngs = layer.getLatLngs();
//             console.log("Coordinates:", latlngs);
//             // You could save these coordinates to state here
//         }
//     };

//     return (
//         <MapContainer center={position} zoom={12} scrollWheelZoom={true} className="h-full w-full">
//             {/* This is the WMS Layer required by the assignment.
//                URL: From your image
//                Layers: 'nw_dop_rgb' is the standard color layer for NRW Geobasis
//             */}
//             <WMSTileLayer
//                 url="https://www.wms.nrw.de/geobasis/wms_nw_dop"    
//                 layers="nw_dop_rgb"
//                 format="image/png"
//                 transparent={true}
//                 attribution='&copy; Geobasis NRW'
//             />

//             {/* Drawing Tools Feature */}
//             <FeatureGroup>
//                 <EditControl
//                     position="topright"
//                     onCreated={_onCreate}
//                     draw={{
//                         rectangle: false,
//                         circle: false,
//                         circlemarker: false,
//                         marker: true,
//                         polygon: true, // The core task is usually drawing areas (polygons)
//                         polyline: false,
//                     }}
//                 />
//             </FeatureGroup>
//         </MapContainer>
//     );
// };

// export default MapComponent;


import React, { useState } from 'react';
import { MapContainer, WMSTileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';

// Fix icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// PASS IN A PROP: onShapeCreated
const MapComponent = ({ onShapeCreated }) => {
    const position = [50.9375, 6.9603]; 

    const _onCreate = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'polygon' || layerType === 'rectangle') {
            // Tell the parent component that a shape was made
            if(onShapeCreated) {
                onShapeCreated(); 
            }
        }
    };

    return (
        <MapContainer center={position} zoom={12} scrollWheelZoom={true} className="h-full w-full">
            <WMSTileLayer
                url="https://www.wms.nrw.de/geobasis/wms_nw_dop"
                layers="nw_dop_rgb"
                format="image/png"
                transparent={true}
                attribution='&copy; Geobasis NRW'
            />
            <FeatureGroup>
                <EditControl
                    position="topright"
                    onCreated={_onCreate}
                    draw={{
                        rectangle: true,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polygon: true,
                        polyline: false,
                    }}
                />
            </FeatureGroup>
        </MapContainer>
    );
};

export default MapComponent;