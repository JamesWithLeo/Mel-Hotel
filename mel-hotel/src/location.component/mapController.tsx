import { LatLngExpression, ZoomPanOptions } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapController = ({
  location,
  original,
}: {
  location: LatLngExpression | null;
  original: LatLngExpression;
}) => {
  const map = useMap();
  const flyToDuration = 1.5;

  const flyTo = (loc: LatLngExpression) => {
    const zoomOpt: ZoomPanOptions = {
      animate: true,
      duration: flyToDuration,
    };
    map.setView(loc, undefined, zoomOpt);
  };

  useEffect(() => {
    if (location) {
      flyTo(location);
    } else {
      map.setView(original);
    }
  });

  return null;
};

export { MapController };
