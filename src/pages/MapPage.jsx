import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations } from "../data/locations";

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

  useEffect(() => {
    if (
      location &&
      Number.isFinite(Number(location.lat)) &&
      Number.isFinite(Number(location.lng))
    ) {
      map.flyTo([Number(location.lat), Number(location.lng)], 13, {
        duration: 1.2,
      });
    }
  }, [location, map]);

  return null;
}

export default function MapPage() {
  const validLocations = locations.filter(
    (loc) =>
      Number.isFinite(Number(loc.lat)) && Number.isFinite(Number(loc.lng)),
  );

  const [selected, setSelected] = useState(validLocations[0] || null);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const center = useMemo(() => [10.8231, 106.6297], []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-bgMain text-slate-900 overflow-hidden">
      <Navbar />

      <div className="pt-[64px] lg:pt-[84px] min-h-screen bg-bgMain overflow-hidden">
        <div className="relative h-[calc(100vh-64px)] lg:h-[calc(100vh-84px)]">
          {!isMobile ? (
            <div className="grid h-full lg:grid-cols-[380px_1fr]">
              <aside className="border-r border-black/10 bg-white/85 backdrop-blur-md p-4 overflow-y-auto">
                <div className="rounded-2xl bg-white shadow-sm border border-black/10 p-4">
                  <h1 className="text-2xl font-bold font-['Times_New_Roman'] text-brandText">
                    Khám phá địa điểm hỗ trợ
                  </h1>

                  <p className="mt-2 text-sm text-brandText-light">
                    Chọn một ghim trên bản đồ để xem thông tin chi tiết.
                  </p>

                  {selected && (
                    <div className="mt-5 rounded-2xl border border-blue-100 bg-brand-soft p-4">
                      <h2 className="text-xl font-bold font-['Times_New_Roman'] text-brandText">
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
                          <span className="font-bold text-brandText">
                            SĐT:{" "}
                          </span>
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
                  {validLocations.map((loc) => (
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

              <section className="relative h-full">
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

                  {validLocations.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={[Number(loc.lat), Number(loc.lng)]}
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
          ) : (
            <div className="relative h-full">
              <section className="absolute inset-0 z-0">
                <MapContainer
                  center={center}
                  zoom={10}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >
                  <FlyToLocation location={selected} />

                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {validLocations.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={[Number(loc.lat), Number(loc.lng)]}
                      eventHandlers={{
                        click: () => {
                          setSelected(loc);
                          setMobilePanelOpen(true);
                        },
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

              <button
                type="button"
                onClick={() => setMobilePanelOpen((v) => !v)}
                className="absolute top-4 left-4 z-[1000] rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-brandText shadow-lg border border-black/10"
              >
                {mobilePanelOpen ? "Thu gọn" : "Mở danh sách"}
              </button>

              <div
                className={[
                  "absolute left-3 right-3 bottom-3 z-[1000] rounded-3xl border border-black/10 bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-300",
                  mobilePanelOpen
                    ? "max-h-[58vh] p-4"
                    : "max-h-[72px] p-3 overflow-hidden",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold font-['Times_New_Roman'] text-brandText">
                    Khám phá địa điểm hỗ trợ
                  </h2>

                  <button
                    type="button"
                    onClick={() => setMobilePanelOpen((v) => !v)}
                    className="rounded-full border border-black/10 px-3 py-1 text-sm text-brandText"
                  >
                    {mobilePanelOpen ? "Ẩn" : "Hiện"}
                  </button>
                </div>

                {selected && (
                  <div className="mt-3 rounded-2xl bg-brand-soft p-4">
                    <h3 className="text-xl font-bold text-brandText">
                      {selected.name}
                    </h3>

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
                      className="mt-4 rounded-xl bg-brand px-4 py-2 text-white font-semibold"
                    >
                      Chỉ đường
                    </button>
                  </div>
                )}

                {mobilePanelOpen && (
                  <div className="mt-4 max-h-[24vh] overflow-y-auto space-y-3 pr-1">
                    {validLocations.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => {
                          setSelected(loc);
                          setMobilePanelOpen(true);
                        }}
                        className={[
                          "w-full text-left rounded-2xl border p-4 transition",
                          selected?.id === loc.id
                            ? "border-brand bg-brand-soft"
                            : "border-black/10 bg-white hover:border-brand/40",
                        ].join(" ")}
                      >
                        <div className="font-bold text-brandText">
                          {loc.name}
                        </div>
                        <div className="mt-1 text-sm text-brandText-light line-clamp-2">
                          {loc.address}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
