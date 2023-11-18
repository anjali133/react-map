import { MapContainer, TileLayer, GeoJSON, Popup, Marker, useMapEvents } from 'react-leaflet';
import React, { useEffect, useState } from 'react';



const Location = (props) => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )
}

export default Location