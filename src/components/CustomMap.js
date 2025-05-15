import React from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';
import './CustomMap.css'; 

function CustomMap({ lat, lng }) {
  return (
    <div className="custom-map-container">
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultZoom={13}
        defaultCenter={{ lat, lng }}
        gestureHandling="greedy"
        disableDefaultUI
      >
        <Marker position={{ lat, lng }} />
      </Map>
    </div>
  );
}

export default CustomMap;
