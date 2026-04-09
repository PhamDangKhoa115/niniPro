import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations } from "../data/locations";

// fix icon marker mặc định của leaflet trong vite/react
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FlyToLocation({ location }) {
  const map = useMap();

  if (location) {
    map.flyTo([location.lat, location.lng], 13, {
      duration: 1.2,
    });
  }

  return null;
}

export default function MapPage() {
  const [selected, setSelected] = useState(locations[0]);

  const center = useMemo(() => [10.8231, 106.6297], []);

  return (
    <div className="min-h-screen bg-bgMain text-slate-900">
      <Navbar />

      <div className="pt-[84px] h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] lg:h-[calc(100vh-84px)]">
          {/* Left panel */}
          <aside className="border-b lg:border-b-0 lg:border-r border-black/10 bg-white/80 backdrop-blur-md p-4 lg:overflow-y-auto">
            <div className="rounded-2xl bg-white shadow-sm border border-black/10 p-4">
              <h1 className="text-2xl font-bold font-beaufort text-brandText">
                Khám phá địa điểm hỗ trợ
              </h1>

              {selected && (
                <div className="mt-5 rounded-2xl border border-blue-100 bg-brand-soft p-4">
                  <h2 className="text-xl font-bold font-beaufort text-brandText">
                    {selected.name}
                  </h2>

                  <div className="mt-3 text-sm leading-7 text-brandText-light">
                    <div>
                      <span className="font-bold text-brandText">
                        Địa chỉ:{" "}
                      </span>
                      {selected.address}
                    </div>

                    <div>
                      <span className="font-bold text-brandText">SĐT: </span>
                      {selected.phone}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${selected.lat},${selected.lng}`,
                        "_blank",
                      )
                    }
                    className="mt-4 rounded-xl bg-brand px-4 py-2 text-white font-semibold hover:bg-brand-dark transition"
                  >
                    Chỉ đường
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelected(loc)}
                  className={[
                    "w-full text-left rounded-2xl border p-4 transition",
                    selected?.id === loc.id
                      ? "border-brand bg-brand-soft"
                      : "border-black/10 bg-white hover:border-brand/40 hover:bg-brand-soft/40",
                  ].join(" ")}
                >
                  <div className="font-bold text-brandText">{loc.name}</div>
                  <div className="mt-1 text-sm text-brandText-light line-clamp-2">
                    {loc.address}
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Right map */}
          <section className="relative h-[420px] sm:h-[520px] lg:h-full">
            <MapContainer
              center={center}
              zoom={10}
              scrollWheelZoom={true}
              className="h-full w-full z-0"
            >
              <FlyToLocation location={selected} />

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {locations.map((loc) => (
                <Marker
                  key={loc.id}
                  position={[loc.lat, loc.lng]}
                  eventHandlers={{
                    click: () => setSelected(loc),
                  }}
                >
                  <Popup>
                    <div className="min-w-[220px]">
                      <div className="font-bold">{loc.name}</div>
                      <div className="mt-1 text-sm">{loc.address}</div>
                      <div className="mt-1 text-sm">SĐT: {loc.phone}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </section>
        </div>
      </div>
    </div>
  );
}
