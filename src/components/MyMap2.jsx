import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mapData from './../data/features.json';
import iconCar from './../car-icon.jpg';
import L from 'leaflet';

const icon = new L.icon({
  iconUrl: iconCar,
  iconSize: [28, 46],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

const MyMap2 = () => {
  const Location = () => {
    const [position, setPosition] = useState(null);

    const moveMarker = () => {
      if (position) {
        const lat = position.lat + 0.01; 
        const lng = position.lng + 0.01;
        setPosition({ lat, lng });
      }
    };

    useEffect(() => {
      const interval = setInterval(moveMarker, 1000); 

      return () => {
        clearInterval(interval);
      };
    }, [position]);

    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        console.log(e.latlng);
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <MapContainer
        style={{
          height: '100vh',
          width: '100%',
        }}
        center={[26.897743, 75.838266]}
        zoom={10}
      >
        <GeoJSON data={mapData.features} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Location />
      </MapContainer>
    </div>
  );
};

export default MyMap2;
