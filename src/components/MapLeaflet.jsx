import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup} from 'react-leaflet'

export default function MapLeaflet({lat, lng, address}) {
    const position = [lat, lng]
    // const position = [51.505, -0.09]
  return (
    <div id="map" className='w-full' >
       <MapContainer center={position} zoom={13} scrollWheelZoom={true}
                     style={{height:'300px', width:'100%', zIndex:'1'}}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
    <Popup>
      {address}
    </Popup>
  </Marker>
</MapContainer>
      
    </div>
  )
}
