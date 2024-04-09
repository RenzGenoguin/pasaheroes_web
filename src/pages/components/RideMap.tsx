// components/LeafletMap.js
import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const RideMap = ({start, end}:{start:number[], end:number[]}) => {
  useEffect(() => {
    
    // Check if window is defined (to ensure this code runs only in the browser)
    if (typeof window !== 'undefined' && start[0] && start[1]) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const L = require('leaflet'); // Using require instead of import to ensure dynamic import

      const map = L.map('map').setView(start, 20);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Define custom icon for markers
      const customIcon = (image:string)=>{
       // eslint-disable-next-line @typescript-eslint/no-unsafe-return
       return  (L.icon({
            iconUrl: image, // Path to your custom icon image
            iconSize: [32, 32], // Size of the icon
            iconAnchor: [16, 32] // Anchor point of the icon (where it's positioned in relation to the marker's latlng)
          }))
      }

      // Add markers for two provided locations using custom icon
      // Add markers for two provided locations
      const locations = [
        { lat: start[0], lng: start[1], icon:customIcon('start.png') }, // Example location 1
            // Example location 2
      ];
      if(end[0]&& end[1]){
        locations.push({ lat: end[0], lng: end[1], icon:customIcon('end.png') } )
      }

      locations.forEach(location => {
        L.marker([location.lat, location.lng], { icon: location.icon }).addTo(map);
      });

      // Add path between two provided locations
      // const pathCoordinates = locations.map(location => [location.lat, location.lng]);
      // L.polyline(pathCoordinates, { color: 'gray' }).addTo(map);

      // Clean up function to remove the map instance when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, [start, end]); // Empty dependency array ensures this effect runs only once during mount

  if(!start[0]|| !start[1]){
    return <div className=' flex items-center justify-center' style={{ width: '100%', height: '400px' }}> Location not provided.</div>
  }
  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default RideMap;
