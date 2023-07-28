import React, { useEffect, useRef, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";

export default function MarkerPos({ address }) {
  const map = useMap();
  const markerRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (address && address.location && address.location.lat !== 0 && address.location.lng !== 0) {
      const newPosition = [address.location.lat, address.location.lng];
      markerRef.current.setLatLng(newPosition);

      if (initialLoad) {
        map.flyTo(newPosition, 13, {
          animate: true,
          zoom: 5,
          duration: 3,
        });
        setInitialLoad(false);
      } else {
        // Fly to the new coordinates when address data is fetched
        map.flyTo(newPosition, 13, {
          animate: true,
        });
      }
    }
  }, [map, address, initialLoad]);

  const customIcon = new L.Icon({
    iconUrl: 'src/images/pin.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <>
      {address && address.location && address.location.lat !== 0 && address.location.lng !== 0 && (
        <Marker position={[address.location.lat, address.location.lng]} icon={customIcon} ref={markerRef}>
        </Marker>
      )}
    </>
  );
}
