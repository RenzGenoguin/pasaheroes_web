import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const RideMap = ({ start, end }: { start: number[], end: number[] }) => {
  useEffect(() => {

    // Check if window is defined (to ensure this code runs only in the browser)
    if (typeof window !== 'undefined' && start[0] && start[1]) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const L = require('leaflet');

      const map = L.map('map').setView(start, 20);

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '© OpenStreetMap contributors'
      // }).addTo(map);

      const customIcon = (image: string) => {
        if (image) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return L.icon({
            iconUrl: image,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          });
        } else {
          return null; // Return null if image is not provided
        }
      }

      const locations: { lat: number, lng: number, icon: any }[] = [];

      if (end[0] && end[1]) {
        locations.push({ lat: end[0], lng: end[1], icon: customIcon('end.png') });
      }

      if (start[0] && start[1]) {
        locations.push({ lat: start[0], lng: start[1], icon: customIcon('start.png') });
      }

      locations.forEach(location => {
        if (location.icon) {
          L.marker([location.lat, location.lng], { icon: location.icon }).addTo(map);
        }
      });

      return () => {
        map.remove();
      };
    }
  }, [start, end]);

  if (!start || !end || !start[0] || !start[1]) {
    return <div className=' flex items-center justify-center' style={{ width: '100%', height: '400px' }}>Location not provided.</div>
  }
  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default RideMap;
