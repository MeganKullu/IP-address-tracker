import React, { useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export default function MarkerPos({ address }) {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (address && address.location && address.location.lat !== 0 && address.location.lng !== 0) {
      const newPosition = [address.location.lat, address.location.lng];
      markerRef.current.setLatLng(newPosition);
      map.flyTo(newPosition, 13, {
        animate: true,
      });
    }
  }, [map, address]);

  return (
    <>
      {address && address.location && address.location.lat !== 0 && address.location.lng !== 0 && (
        <Marker position={[address.location.lat, address.location.lng]} ref={markerRef}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </>
  );
}
