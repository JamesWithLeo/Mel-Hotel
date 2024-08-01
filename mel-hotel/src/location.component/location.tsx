import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapController } from "./mapController";
import { NavLink } from "react-router-dom";
import { get } from "http";

type markTypeface = {
  name: string;
  position: LatLngExpression;
  description: string | null;
};

export default function Location() {
  const locationInit: LatLngExpression = [14.55, 120.9038];
  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const markers: markTypeface[] = [
    {
      name: "Manila, Philippines",
      position: [14.6, 120.98],
      description: "Mel Hotel, Main Branch.  Manila, Philippines. ",
    },
    {
      name: "Main branch. Boracay, Philippines",
      position: [11.9683, 121.9229],
      description: null,
    },
    {
      name: "Egypt, Cairo",
      position: [29.9537564, 31.5370003],
      description: null,
    },
    {
      description: null,
      position: [46.818188, 8.227512],
      name: "Switzerland, Main Branch",
    },
    {
      description: null,
      position: [31.1343, 121.2829],
      name: "上海 | Shanghai ",
    },
    {
      position: [25.885942, 50.0791],
      description: "ٱلْمَمْلَكَة ٱلْعَرَبِيَّة ٱلسُّعُودِيَّة ",
      name: "Saudi Arabia",
    },
  ];
  const [branchButton, setBranchButton] = useState<JSX.Element[] | null>();
  const [markersELement, setMarkersElement] = useState<JSX.Element[] | null>(
    null,
  );

  useEffect(() => {
    const marks = markers.map((map) => {
      return (
        <Marker position={map.position}>
          {map.description ? <Popup>{map.description}</Popup> : null}
        </Marker>
      );
    });
    const branch = markers.map((map) => {
      return (
        <button
          className="rounded bg-gray-100 py-1 text-gray-500 shadow"
          id={map.name}
          onClick={() => {
            onBranchButtonClick(map.position);
          }}
        >
          {map.name}
        </button>
      );
    });
    setBranchButton(branch);
    setMarkersElement(marks);
  }, []);

  const onBranchButtonClick = (loc: LatLngExpression) => {
    setLocation(loc);
  };

  return (
    <div className="z-0 flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-8 sm:px-8 md:flex-row">
      <div className="flex h-44 w-full flex-col justify-start gap-2 md:h-full md:w-1/4">
        <h1 className="font-fauna text-primarydark drop-shadow">
          Mel hotel branches
        </h1>

        <div className="flex w-full justify-between gap-2">
          <input
            type="text"
            className="outline-primarydark w-full rounded px-2 py-1 shadow-inner outline outline-1"
          />
          <button className="bg-primarydarker w-max rounded px-2 py-1 text-sm text-white shadow">
            search
          </button>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto px-2">
          {branchButton}
        </div>
      </div>
      <div className="h-full w-full overflow-hidden rounded-lg md:w-3/4">
        <MapContainer
          center={locationInit}
          zoom={4}
          scrollWheelZoom={true}
          minZoom={2}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapContainer />
          <MapController location={location} original={locationInit} />
          {markersELement ? markersELement : null}
        </MapContainer>
      </div>
    </div>
  );
}
