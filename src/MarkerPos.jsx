import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export default function MarkerPos({ address }) {
  const defaultPosition = [0, 0]; // Default position to center the map when no valid address is available
  const position = address && address.location ? [address.location.lat, address.location.lng] : defaultPosition;
  const map = useMap();

  useEffect(() => {
    if (address && address.location && address.location.lat && address.location.lng) {
      map.flyTo(position, 13, {
        animate: true,
      });
    }
  }, [map, position, address]);

  return (
    <>
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
}
