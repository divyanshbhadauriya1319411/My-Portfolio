import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaExternalLinkAlt } from "react-icons/fa";

// Import leaflet icon images directly for bundler compatibility
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon issues in Leaflet + React/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function LocationMap() {
  const position = [28.5895, 77.3126];
  const directUrl = "https://www.openstreetmap.org/?mlat=28.5895&mlon=77.3126#map=15/28.5895/77.3126";

  return (
    <div className="space-y-6 w-full pt-4">
      {/* Map Container: Full width, 450px height, 20px rounded corners, responsive, dark/light mode compatible */}
      <div
        className="w-full h-[450px] rounded-[20px] overflow-hidden border border-default shadow-xl bg-card relative z-0 transition-all duration-500"
        style={{ borderRadius: "20px" }}
      >
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full h-full z-0 font-sans dark:[&_.leaflet-tile-pane]:filter dark:[&_.leaflet-tile-pane]:invert dark:[&_.leaflet-tile-pane]:hue-rotate-180 dark:[&_.leaflet-tile-pane]:brightness-95 dark:[&_.leaflet-tile-pane]:contrast-125"
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup className="font-sans font-medium text-slate-800">
              <div className="p-1 space-y-1 text-sm leading-snug">
                <p className="font-bold text-base text-blue-600 flex items-center gap-1.5">
                  <span>📍</span> Divyansh Bhadauriya
                </p>
                <p className="font-semibold text-slate-700">Noida Sector 15</p>
                <p className="text-xs text-slate-500 font-mono">India</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Below the map: Address strip and external map link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-7 rounded-3xl bg-card border border-default shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-500 dark:text-blue-400 shrink-0 text-2xl flex items-center justify-center">
            📍
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-primary leading-tight">
              Divyansh Bhadauriya
            </h3>
            <p className="text-sm sm:text-base font-semibold text-secondary">
              Noida Sector 15
            </p>
            <p className="text-xs sm:text-sm text-secondary/80 font-mono">
              India
            </p>
          </div>
        </div>

        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/45 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
        >
          <span>Open in Map</span>
          <FaExternalLinkAlt size={13} />
        </a>
      </div>
    </div>
  );
}
