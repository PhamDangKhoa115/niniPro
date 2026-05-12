import { useEffect, useMemo, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { locations } from "../data/locations";

const VIETMAP_API_KEY = import.meta.env.VITE_VIETMAP_API_KEY;

export default function MapPage() {
  const validLocations = locations.filter(
    (loc) =>
      Number.isFinite(Number(loc.lat)) && Number.isFinite(Number(loc.lng)),
  );

  const [selected, setSelected] = useState(validLocations[0] || null);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const mapRef = useRef(null);

  const center = useMemo(
    () => ({
      latitude: 10.8231,
      longitude: 106.6297,
      zoom: 10,
    }),
    [],
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!selected || !mapRef.current) return;

    mapRef.current.getMap().flyTo({
      center: [Number(selected.lng), Number(selected.lat)],
      zoom: 13,
      duration: 1200,
    });
  }, [selected]);

  return (
    <div className="min-h-screen bg-bgMain text-slate-900 overflow-hidden">
      <Navbar />

      <div className="pt-[64px] lg:pt-[84px] min-h-screen bg-bgMain overflow-hidden">
        <div className="relative h-[calc(100vh-64px)] lg:h-[calc(100vh-84px)]">
          {!isMobile ? (
            <div className="grid h-full lg:grid-cols-[380px_1fr]">
              {/* LEFT PANEL */}
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
                            Địa chỉ:
                          </span>{" "}
                          {selected.address}
                        </div>

                        <div>
                          <span className="font-bold text-brandText">SĐT:</span>{" "}
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

              {/* MAP */}
              <section className="relative h-full">
                <Map
                  ref={mapRef}
                  mapLib={maplibregl}
                  initialViewState={center}
                  style={{ width: "100%", height: "100%" }}
                  mapStyle={{
                    version: 8,
                    sources: {
                      vietmap: {
                        type: "raster",
                        tiles: [
                          `https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=${VIETMAP_API_KEY}`,
                        ],
                        tileSize: 256,
                      },
                    },
                    layers: [
                      {
                        id: "vietmap-layer",
                        type: "raster",
                        source: "vietmap",
                      },
                    ],
                  }}
                >
                  {validLocations.map((loc, index) => (
                    <Marker
                      key={loc.id}
                      longitude={Number(loc.lng)}
                      latitude={Number(loc.lat)}
                      anchor="bottom"
                    >
                      <button
                        type="button"
                        onClick={() => setSelected(loc)}
                        className={[
                          "flex items-center justify-center",
                          "w-8 h-8 rounded-full",
                          "text-white font-bold text-sm",
                          "border-2 border-white shadow-lg",
                          selected?.id === loc.id
                            ? "bg-yellow-500 scale-110"
                            : "bg-blue-700",
                        ].join(" ")}
                      >
                        {selected?.id === loc.id ? "⭐" : index + 1}
                      </button>
                    </Marker>
                  ))}

                  {selected && (
                    <Popup
                      longitude={Number(selected.lng)}
                      latitude={Number(selected.lat)}
                      anchor="top"
                      closeButton={true}
                      closeOnClick={false}
                      onClose={() => setSelected(null)}
                    >
                      <div className="min-w-[220px]">
                        <div className="font-bold">{selected.name}</div>

                        <div className="mt-1 text-sm">{selected.address}</div>

                        <div className="mt-1 text-sm">
                          SĐT: {selected.phone}
                        </div>
                      </div>
                    </Popup>
                  )}
                </Map>
              </section>
            </div>
          ) : (
            <div className="relative h-full">
              {/* MOBILE MAP */}
              <section className="absolute inset-0 z-0">
                <Map
                  ref={mapRef}
                  mapLib={maplibregl}
                  initialViewState={center}
                  style={{ width: "100%", height: "100%" }}
                  mapStyle={{
                    version: 8,
                    sources: {
                      vietmap: {
                        type: "raster",
                        tiles: [
                          `https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=${VIETMAP_API_KEY}`,
                        ],
                        tileSize: 256,
                      },
                    },
                    layers: [
                      {
                        id: "vietmap-layer",
                        type: "raster",
                        source: "vietmap",
                      },
                    ],
                  }}
                >
                  {validLocations.map((loc, index) => (
                    <Marker
                      key={loc.id}
                      longitude={Number(loc.lng)}
                      latitude={Number(loc.lat)}
                      anchor="bottom"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(loc);
                          setMobilePanelOpen(true);
                        }}
                        className={[
                          "flex items-center justify-center",
                          "w-8 h-8 rounded-full",
                          "text-white font-bold text-sm",
                          "border-2 border-white shadow-lg",
                          selected?.id === loc.id
                            ? "bg-yellow-500 scale-110"
                            : "bg-blue-700",
                        ].join(" ")}
                      >
                        {selected?.id === loc.id ? "⭐" : index + 1}
                      </button>
                    </Marker>
                  ))}

                  {selected && (
                    <Popup
                      longitude={Number(selected.lng)}
                      latitude={Number(selected.lat)}
                      anchor="top"
                      closeButton={true}
                      closeOnClick={false}
                      onClose={() => setSelected(null)}
                    >
                      <div className="min-w-[220px]">
                        <div className="font-bold">{selected.name}</div>

                        <div className="mt-1 text-sm">{selected.address}</div>

                        <div className="mt-1 text-sm">
                          SĐT: {selected.phone}
                        </div>
                      </div>
                    </Popup>
                  )}
                </Map>
              </section>

              {/* MOBILE BUTTON */}
              <button
                type="button"
                onClick={() => setMobilePanelOpen((v) => !v)}
                className="absolute top-4 left-4 z-[1000] rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-brandText shadow-lg border border-black/10"
              >
                {mobilePanelOpen ? "Thu gọn" : "Mở danh sách"}
              </button>

              {/* MOBILE PANEL */}
              <div
                className={[
                  "absolute left-3 right-3 bottom-3 z-[1000]",
                  "rounded-3xl border border-black/10",
                  "bg-white/95 backdrop-blur-md shadow-2xl",
                  "transition-all duration-300",
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
                          Địa chỉ:
                        </span>{" "}
                        {selected.address}
                      </div>

                      <div>
                        <span className="font-bold text-brandText">SĐT:</span>{" "}
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
