import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CruisingArea } from '../types';

interface MapProps {
  areas: CruisingArea[];
  selectedAreaId: string | null;
  onSelectArea: (areaId: string) => void;
  onMapClick?: (coords: [number, number]) => void;
  suggestModeActive: boolean;
  temporarySuggestedCoords: [number, number] | null;
  temporarySuggestedRadius?: number;
  userCoords?: [number, number] | null;
}

export default function Map({
  areas,
  selectedAreaId,
  onSelectArea,
  onMapClick,
  suggestModeActive,
  temporarySuggestedCoords,
  temporarySuggestedRadius,
  userCoords,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: { marker: L.Marker; circle?: L.Circle } }>({});
  const suggestionMarkerRef = useRef<L.Marker | null>(null);
  const suggestionCircleRef = useRef<L.Circle | null>(null);
  const userLocationMarkerRef = useRef<L.Marker | null>(null);
  const userLocationAccuracyCircleRef = useRef<L.Circle | null>(null);

  // Store callbacks in refs to keep effects stable and prevent map recreation/stale closures
  const onMapClickRef = useRef(onMapClick);
  useEffect(() => {
    onMapClickRef.current = onMapClick;
  }, [onMapClick]);

  const onSelectAreaRef = useRef(onSelectArea);
  useEffect(() => {
    onSelectAreaRef.current = onSelectArea;
  }, [onSelectArea]);

  // Initialize Map exactly once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create Leaflet map instance centered on Lisbon, Portugal
    const map = L.map(mapContainerRef.current, {
      center: [38.7285, -9.1558],
      zoom: 13,
      zoomControl: false, // Position custom zoom control on the bottom right for ergonomics
      attributionControl: false
    });

    // Add sleek dark map tiles (using OSM standard tiles + custom CSS filter)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      className: 'dark-map-tiles'
    }).addTo(map);

    // Add attribution at bottom right
    L.control.attribution({
      position: 'bottomright',
      prefix: 'OSM & gCruise'
    }).addTo(map);

    // Zoom control at bottom right (above attribution)
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    mapRef.current = map;

    // Handle map clicks for suggestion mode using stable ref callback
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (onMapClickRef.current) {
        onMapClickRef.current([e.latlng.lat, e.latlng.lng]);
      }
    });

    // ResizeObserver to automatically adjust map canvas boundaries
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      // Completely reset markers references to prevent attempts to interact with destroyed elements
      markersRef.current = {};
      suggestionMarkerRef.current = null;
      suggestionCircleRef.current = null;
    };
  }, []);

  // Handle temporary suggested coordinate marker & dynamic range/radius circle
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing temporary suggestion marker & circle
    if (suggestionMarkerRef.current) {
      suggestionMarkerRef.current.remove();
      suggestionMarkerRef.current = null;
    }
    if (suggestionCircleRef.current) {
      suggestionCircleRef.current.remove();
      suggestionCircleRef.current = null;
    }

    // Add new suggestion marker and dynamic circle if coordinates exist and suggestion mode is active
    if (suggestModeActive && temporarySuggestedCoords) {
      const icon = L.divIcon({
        html: `
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 border-2 border-white shadow-xl animate-bounce">
            <span class="w-3 h-3 rounded-full bg-white"></span>
          </div>
        `,
        className: 'suggestion-pin-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const marker = L.marker(temporarySuggestedCoords, { icon }).addTo(map);
      marker.bindPopup(`<div class="text-xs text-center font-medium p-1">Coordenadas selecionadas! Prontas para sugerir.</div>`).openPopup();
      suggestionMarkerRef.current = marker;

      // Draw coverage circle around the temporary suggestion point
      const currentRadius = temporarySuggestedRadius || 150;
      const circle = L.circle(temporarySuggestedCoords, {
        radius: currentRadius,
        color: '#6366f1',
        weight: 2,
        dashArray: '5, 5', // Dashed look to convey draft / suggestion status
        fillColor: '#6366f1',
        fillOpacity: 0.20,
        interactive: false
      }).addTo(map);
      suggestionCircleRef.current = circle;

      // Center map slightly on selected position
      map.panTo(temporarySuggestedCoords);
    }
  }, [suggestModeActive, temporarySuggestedCoords, temporarySuggestedRadius]);

  // Handle user's current or simulated location marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing user location markers
    if (userLocationMarkerRef.current) {
      userLocationMarkerRef.current.remove();
      userLocationMarkerRef.current = null;
    }
    if (userLocationAccuracyCircleRef.current) {
      userLocationAccuracyCircleRef.current.remove();
      userLocationAccuracyCircleRef.current = null;
    }

    if (userCoords) {
      // Create a gorgeous blue pulse marker for the user's own location
      const userIcon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center w-7 h-7">
            <span class="absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-60 animate-ping"></span>
            <div class="relative w-4 h-4 rounded-full bg-indigo-500 border-2 border-white shadow-xl"></div>
          </div>
        `,
        className: 'user-location-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(userCoords, { icon: userIcon }).addTo(map);
      marker.bindPopup(`<div class="text-xs text-center font-bold p-1 font-sans text-indigo-400">A Sua Localização (Simulada/GPS)</div>`);
      userLocationMarkerRef.current = marker;

      // Add a faint, elegant accuracy circle around the user's location
      const circle = L.circle(userCoords, {
        radius: 120, // default 120m accuracy representation
        color: '#6366f1',
        weight: 1,
        opacity: 0.15,
        fillColor: '#6366f1',
        fillOpacity: 0.04,
        interactive: false
      }).addTo(map);
      userLocationAccuracyCircleRef.current = circle;
    }
  }, [userCoords]);

  // Render and update cruising zone markers and circles
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear deleted markers
    const areaIdsInProps = new Set(areas.map(a => a.id));
    Object.keys(markersRef.current).forEach(id => {
      if (!areaIdsInProps.has(id)) {
        markersRef.current[id].marker.remove();
        if (markersRef.current[id].circle) {
          markersRef.current[id].circle?.remove();
        }
        delete markersRef.current[id];
      }
    });

    // Update or add markers
    areas.forEach(area => {
      const center = area.geometryJson.center;
      const activeCount = area.activeCount || 0;

      // Define custom div-icon for this hotspot
      const createHotspotIcon = (count: number, isSelected: boolean) => {
        const size = count > 0 ? 38 : 30;
        
        let colorClass = 'bg-cyan-500 border-cyan-200 text-white shadow-lg shadow-cyan-500/30';
        if (count > 5) {
          colorClass = 'bg-rose-500 border-rose-200 text-white shadow-lg shadow-rose-500/50';
        } else if (count > 0) {
          colorClass = 'bg-emerald-500 border-emerald-200 text-white shadow-lg shadow-emerald-500/50';
        }

        if (isSelected) {
          colorClass += ' ring-4 ring-indigo-500 ring-offset-2 ring-offset-[#050505]';
        }

        const pulseClass = count > 0 ? 'hotspot-pulse' : '';
        const badgeMarkup = count > 0 
          ? `<span class="text-xs font-bold leading-none font-sans">${count}</span>` 
          : `<span class="w-1.5 h-1.5 rounded-full bg-white/80"></span>`;

        return L.divIcon({
          html: `
            <div class="relative flex items-center justify-center w-full h-full rounded-full border-2 ${colorClass} ${pulseClass} shadow-lg transition-all duration-300">
              ${badgeMarkup}
            </div>
          `,
          className: 'custom-hotspot-marker-container',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          popupAnchor: [0, -size / 2]
        });
      };

      const isSelected = selectedAreaId === area.id;
      const icon = createHotspotIcon(activeCount, isSelected);

      // Create permanent tooltip HTML
      const tooltipContent = `
        <div class="px-2.5 py-1.5 bg-slate-950/95 border border-slate-800 rounded-xl font-sans flex flex-col gap-0.5 shadow-2xl pointer-events-none text-left" style="min-width: 120px; backdrop-filter: blur(4px);">
          <div class="font-bold text-slate-100 text-[11px] leading-tight truncate" style="max-width: 150px;">${area.name}</div>
          <div class="flex items-center gap-1 mt-0.5 text-[9px] font-medium leading-none">
            <span class="w-1.5 h-1.5 rounded-full ${activeCount > 0 ? (activeCount > 5 ? 'bg-rose-500 animate-ping' : 'bg-emerald-500 animate-pulse') : 'bg-cyan-500'}"></span>
            <span class="${activeCount > 5 ? 'text-rose-400 font-bold' : activeCount > 0 ? 'text-emerald-400 font-bold' : 'text-cyan-400'} font-sans">
              ${activeCount > 0 ? `${activeCount} ${activeCount === 1 ? 'pessoa na zona' : 'pessoas na zona'}` : '0 pessoas na zona'}
            </span>
          </div>
        </div>
      `;

      if (markersRef.current[area.id]) {
        // Update existing marker icon and position
        const { marker, circle } = markersRef.current[area.id];
        marker.setIcon(icon);
        marker.setLatLng(center);

        // Update permanent tooltip
        marker.unbindTooltip();
        marker.bindTooltip(tooltipContent, {
          permanent: true,
          direction: 'top',
          offset: [0, -12],
          className: 'custom-leaflet-tooltip'
        });

        // Update circle radius and center
        if (circle && area.geometryJson.radius) {
          circle.setLatLng(center);
          circle.setRadius(area.geometryJson.radius);
          circle.setStyle({
            color: activeCount > 5 ? '#ec4899' : activeCount > 0 ? '#10b981' : '#06b6d4',
            fillColor: activeCount > 5 ? '#ec4899' : activeCount > 0 ? '#10b981' : '#06b6d4',
            weight: 3,
            fillOpacity: 0.25
          });
        }
      } else {
        // Create new marker
        const marker = L.marker(center, { icon }).addTo(map);

        // Attach click listener using stable callback ref to avoid stale closures
        marker.on('click', () => {
          if (onSelectAreaRef.current) {
            onSelectAreaRef.current(area.id);
          }
        });

        // Bind permanent tooltip
        marker.bindTooltip(tooltipContent, {
          permanent: true,
          direction: 'top',
          offset: [0, -12],
          className: 'custom-leaflet-tooltip'
        });

        // Add circle overlay to represent cruising boundaries
        let circle: L.Circle | undefined;
        if (area.geometryJson.radius) {
          circle = L.circle(center, {
            radius: area.geometryJson.radius,
            color: activeCount > 5 ? '#ec4899' : activeCount > 0 ? '#10b981' : '#06b6d4',
            weight: 3,
            fillColor: activeCount > 5 ? '#ec4899' : activeCount > 0 ? '#10b981' : '#06b6d4',
            fillOpacity: 0.25,
            interactive: false // Let map/marker receive events
          }).addTo(map);
        }

        markersRef.current[area.id] = { marker, circle };
      }
    });
  }, [areas, selectedAreaId]);

  // Center on selected area
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedAreaId) return;

    const area = areas.find(a => a.id === selectedAreaId);
    if (area) {
      map.setView(area.geometryJson.center, 15, {
        animate: true,
        duration: 0.8
      });

      // Automatically open the standard Leaflet popup with information as a fallback
      const { marker } = markersRef.current[selectedAreaId] || {};
      if (marker && map.hasLayer(marker)) {
        const activeText = area.activeCount > 0 
          ? `🔥 ${area.activeCount} ${area.activeCount === 1 ? 'pessoa na zona' : 'pessoas na zona'} agora` 
          : '0 pessoas na zona';
        
        marker.bindPopup(`
          <div class="p-1 font-sans">
            <h4 class="font-bold text-slate-100 text-sm leading-tight">${area.name}</h4>
            <p class="text-xs text-slate-400 mt-0.5">${area.city}, ${area.country}</p>
            <p class="text-xs text-emerald-400 font-medium mt-1">${activeText}</p>
          </div>
        `).openPopup();
      }
    }
  }, [selectedAreaId, areas]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
      <div id="leaflet-map-element" ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Visual Instruction Badge */}
      <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 shadow-lg text-xs font-medium text-slate-300 max-w-xs pointer-events-none">
        {suggestModeActive ? (
          <span className="text-indigo-400 animate-pulse">
            📍 Toque no mapa para selecionar onde criar a nova zona.
          </span>
        ) : (
          <span>📱 gCruise — Clique no mapa para simular o seu GPS ou selecione uma zona.</span>
        )}
      </div>

      {/* GPS Center Button */}
      {userCoords && (
        <button
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.setView(userCoords, 15, { animate: true, duration: 1 });
            }
          }}
          className="absolute bottom-16 right-4 z-10 p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/30 text-white shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          title="Centralizar no meu GPS"
          id="btn-center-on-gps"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 animate-spin-slow">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
          </svg>
        </button>
      )}

      {/* Discretion Indicator (Discreet human label, fits visual guidelines) */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#1f1f1f] shadow text-[10px] uppercase tracking-wider font-mono text-slate-400 font-medium pointer-events-none">
        Discretion: Active
      </div>
    </div>
  );
}
