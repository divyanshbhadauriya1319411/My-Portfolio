import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FaMapMarkerAlt, FaDirections } from "react-icons/fa";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapSection() {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Responsive Map Wrapper: Mobile 300px, Tablet 380px, Desktop 450px */}
      <div className="w-full h-[300px] md:h-[380px] lg:h-[450px] rounded-[20px] overflow-hidden shadow-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900 relative">
        <MapContainer
          center={[28.5895, 77.3117]}
          zoom={15}
          scrollWheelZoom={false}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[28.5895, 77.3117]}>
            <Popup className="font-sans text-sm">
              <strong className="font-bold text-zinc-900">Divyansh Bhadauriya</strong>
              <br />
              Sector 15, Noida
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Buttons Below Map */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
        <a
          href="https://maps.google.com/?q=Sector+15+Noida"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 active:scale-95"
        >
          <FaMapMarkerAlt className="text-base" />
          Open in Google Maps
        </a>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Sector+15+Noida"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-semibold text-sm shadow-md transition-all duration-200 active:scale-95 border border-zinc-700/50"
        >
          <FaDirections className="text-base text-blue-400" />
          Get Directions
        </a>
      </div>
    </div>
  );
}
