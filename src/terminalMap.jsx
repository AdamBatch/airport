import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polygon } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import gates from "./data/gates.json"
import terminal from './data/terminalInfo7.json'


function MapComponent({colors}) {
  console.log(colors)

  const [geoJsonData, setGeoJsonData] = useState(null);
  const gatesGeoJson = gates
  const newCoordinates = []
    for (let k = 0; k <= 171; k++) {
      const subSet = gatesGeoJson.features[k].geometry.coordinates[0]
      newCoordinates[k] = []
      for (let i = 0; i < subSet.length; i++){
        newCoordinates[k][i] = [
            subSet[i][1],
            subSet[i][0]
        ];
      }
    }
  
  const positions = [];
    for (let k = 0; k <= 171; k++) {
        positions[k] = {
            terminal: gatesGeoJson.features[k].properties.terminal,
            gate: gatesGeoJson.features[k].properties.gate,
            coordinates: newCoordinates[k],
            color: colors[k],
            fillcolor: colors[k]
        };
    }
  
  
  console.log(positions[0])

  return (
    <MapContainer center={[32.8975, -97.04]} zoom={14}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {positions.map((polygon) => (
        <Polygon
          key={polygon.gate}
          positions={polygon.coordinates}
          pathOptions={{ fillColor: polygon.fillcolor, color: polygon.color }}
        />
      ))}
      
        {/* <Polygon
          positions={positions[0].coordinates}
          pathOptions={{ fillColor: positions[0].color, color: positions[0].color }}
        /> */}

        {/* <GeoJSON
            //onEachFeature={onEachFeature} //setting for each feature when we do something about it
            //data={gatesGeoJson} //our .json data that already include .geojson data
            // style={this.confirmedStyle} //style that we will change to dynamic style
            data = {gatesGeoJson}
            color = 'red'
            fillColor='blue'
        /> */}
    </MapContainer>
  );
}

export default MapComponent;