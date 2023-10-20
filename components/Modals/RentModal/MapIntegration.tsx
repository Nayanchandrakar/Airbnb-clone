'use client'
import leaflet from 'leaflet'
import { FC } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


// @ts-ignore 
delete leaflet.Icon.Default.prototype._getIconUrl

leaflet.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});


interface MapIntegrationProps {
    center?: number[]
}

const MapIntegration: FC<MapIntegrationProps> = ({ center }) => {
    return (

        <MapContainer className='h-[40vh] rounded-md' center={center as leaflet.LatLngExpression || [51, -0.09]} zoom={center ? 4 : 2} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && (
                <Marker position={center as leaflet.LatLngExpression} />
            )}
        </MapContainer>
    )
}

export default MapIntegration