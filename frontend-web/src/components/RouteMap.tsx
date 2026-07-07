import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Route } from '../data/routes';
import { routeGeo, allPlaces, type RoutePlace } from '../data/routeGeo';

interface RouteMapProps {
  route: Route | null;
}

interface OsrmResult {
  coords: [number, number][];
  distanceKm: number;
  durationMin: number;
}

const osrmCache = new Map<string, OsrmResult>();

const DEFAULT_BOUNDS = L.latLngBounds(allPlaces.map((p) => p.coords));

function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    const bounds = coords.length ? L.latLngBounds(coords) : DEFAULT_BOUNDS;
    map.fitBounds(bounds, { padding: [48, 48] });
  }, [coords, map]);
  return null;
}

export default function RouteMap({ route }: RouteMapProps) {
  const [result, setResult] = useState<OsrmResult | null>(null);
  const [error, setError] = useState(false);

  const waypoints: RoutePlace[] = route ? routeGeo[route.id] ?? [] : [];

  useEffect(() => {
    setError(false);
    if (!route || !routeGeo[route.id]) {
      setResult(null);
      return;
    }
    const cached = osrmCache.get(route.id);
    if (cached) {
      setResult(cached);
      return;
    }
    setResult(null);
    let cancelled = false;
    const coordStr = routeGeo[route.id]
      .map((p) => `${p.coords[1]},${p.coords[0]}`)
      .join(';');
    fetch(`https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const r0 = data.routes?.[0];
        if (!r0) throw new Error('no route');
        const res: OsrmResult = {
          coords: (r0.geometry.coordinates as [number, number][]).map(([lng, lat]) => [lat, lng]),
          distanceKm: r0.distance / 1000,
          durationMin: r0.duration / 60,
        };
        osrmCache.set(route.id, res);
        setResult(res);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [route]);

  // When routing fails, fall back to a straight dashed line between waypoints.
  const lineCoords = result?.coords ?? (error ? waypoints.map((p) => p.coords) : []);
  const fitCoords = lineCoords.length ? lineCoords : waypoints.map((p) => p.coords);

  const origin = waypoints[0];
  const dest = waypoints[waypoints.length - 1];
  const isLoop =
    origin && dest && origin.coords[0] === dest.coords[0] && origin.coords[1] === dest.coords[1];
  const vias = waypoints.slice(1, -1);

  return (
    <div className="relative z-0 h-full w-full">
      <MapContainer
        bounds={DEFAULT_BOUNDS}
        boundsOptions={{ padding: [48, 48] }}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <FitBounds coords={fitCoords} />

        {/* Faint dots for all towns when nothing is selected */}
        {!route &&
          allPlaces.map((p) => (
            <CircleMarker
              key={p.name}
              center={p.coords}
              radius={5}
              pathOptions={{ color: '#fff', weight: 2, fillColor: '#5f6368', fillOpacity: 0.9 }}
            >
              <Tooltip direction="top" offset={[0, -6]}>{p.name}</Tooltip>
            </CircleMarker>
          ))}

        {lineCoords.length > 0 && (
          <>
            {/* Google-style route line: dark casing under a blue stroke */}
            <Polyline
              positions={lineCoords}
              pathOptions={{
                color: '#1a5dc7',
                weight: 9,
                opacity: 0.9,
                dashArray: error ? '8 10' : undefined,
              }}
            />
            <Polyline
              positions={lineCoords}
              pathOptions={{
                color: '#4285F4',
                weight: 5,
                opacity: 1,
                dashArray: error ? '8 10' : undefined,
              }}
            />
          </>
        )}

        {route && vias.map((p) => (
          <CircleMarker
            key={p.name}
            center={p.coords}
            radius={4}
            pathOptions={{ color: '#fff', weight: 2, fillColor: '#5f6368', fillOpacity: 1 }}
          >
            <Tooltip direction="top" offset={[0, -6]}>{p.name}</Tooltip>
          </CircleMarker>
        ))}

        {route && origin && (
          <CircleMarker
            center={origin.coords}
            radius={7}
            pathOptions={{ color: '#5f6368', weight: 3, fillColor: '#fff', fillOpacity: 1 }}
          >
            <Tooltip permanent direction="top" offset={[0, -8]}>{origin.name}</Tooltip>
          </CircleMarker>
        )}

        {route && dest && !isLoop && (
          <CircleMarker
            center={dest.coords}
            radius={8}
            pathOptions={{ color: '#fff', weight: 3, fillColor: '#EA4335', fillOpacity: 1 }}
          >
            <Tooltip permanent direction="top" offset={[0, -9]}>{dest.name}</Tooltip>
          </CircleMarker>
        )}
      </MapContainer>
    </div>
  );
}
