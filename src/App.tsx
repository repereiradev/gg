import React, { useState, useEffect, useRef } from 'react';

const Compass = ({ className, title }: { className?: string, title?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {title && <title>{title}</title>}
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ShieldAlert = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const Globe = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const Lock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const RefreshCw = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Sparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
    <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
  </svg>
);

const AlertOctagon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const UserCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const UserX = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="17" y1="8" x2="22" y2="13" />
    <line x1="22" y1="8" x2="17" y2="13" />
  </svg>
);

const Activity = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const Heart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const MapIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const ListIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const VoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

import Map from './components/Map';
import Chat from './components/Chat';
import SuggestZone from './components/SuggestZone';
import ZoneDetails from './components/ZoneDetails';
import AdminPanel from './components/AdminPanel';
import { 
  CruisingArea, 
  SessionInfo, 
  AreaPresence, 
  AreaMessage, 
  AreaSuggestion, 
  Report, 
  SystemLog 
} from './types';

// Helper function to calculate distance in meters between two GPS coordinates (Haversine formula)
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function App() {
  // Session & Auth
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [sessionBanned, setSessionBanned] = useState<boolean>(false);
  const [banReason, setBanReason] = useState<string>('');
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);
  const [isUpdatingNick, setIsUpdatingNick] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>('');
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(() => localStorage.getItem('gCruise_18plus') === 'true');
  const [ageDenied, setAgeDenied] = useState<boolean>(false);

  // Core Data
  const [areas, setAreas] = useState<CruisingArea[]>([]);
  const [suggestions, setSuggestions] = useState<AreaSuggestion[]>([]);
  const [presences, setPresences] = useState<AreaPresence[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  
  // Chat Rooms State (Indexed by areaId)
  const [chatMessages, setChatMessages] = useState<{ [areaId: string]: AreaMessage[] }>({});
  const [typingUsers, setTypingUsers] = useState<{ [areaId: string]: string[] }>({});
  const [showChatDrawer, setShowChatDrawer] = useState<boolean>(false);

  // Active UI Navigation / Views
  // 'map' | 'list' | 'details' | 'suggest' | 'admin' | 'settings' | 'vote'
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'details' | 'suggest' | 'admin' | 'settings' | 'vote'>('map');
  
  // Suggest Zone State
  const [temporaryCoords, setTemporaryCoords] = useState<[number, number] | null>(null);
  const [temporaryRadius, setTemporaryRadius] = useState<number>(150);

  // Admin Data (synchronized dynamically)
  const [adminSuggestions, setAdminSuggestions] = useState<AreaSuggestion[]>([]);
  const [adminReports, setAdminReports] = useState<Report[]>([]);
  const [adminLogs, setAdminLogs] = useState<SystemLog[]>([]);
  const [adminSessions, setAdminSessions] = useState<SessionInfo[]>([]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // WebSockets Connection
  const socketRef = useRef<WebSocket | null>(null);
  const [wsConnected, setWsConnected] = useState<boolean>(false);
  const [activeAreaParticipation, setActiveAreaParticipation] = useState<string | null>(null); // areaId where "I am active"

  // Geolocation & Auto Presence States
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [isAutoPresenceActive, setIsAutoPresenceActive] = useState<boolean>(true);

  // 1. Watch Geolocation continuously (Real GPS tracking)
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(`📍 Real GPS updated: ${lat}, ${lng}`);
      setUserCoords([lat, lng]);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("Error obtaining geolocation:", error);
    };

    // Get initial position
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });

    // Watch position
    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // 2. Automatic check-in / check-out based on user location (Real or Simulated)
  useEffect(() => {
    if (!isAutoPresenceActive || !userCoords || areas.length === 0 || !wsConnected || !session) return;

    let matchedArea: CruisingArea | null = null;

    // Check if user is inside any approved cruising area
    for (const area of areas) {
      const [areaLat, areaLng] = area.geometryJson.center;
      const radius = area.geometryJson.radius || 200; // in meters
      const distance = getDistance(userCoords[0], userCoords[1], areaLat, areaLng);

      if (distance <= radius) {
        matchedArea = area;
        break; // Match the first area we find ourselves in
      }
    }

    if (matchedArea) {
      // If we are in an area and are not marked active in it yet, join it automatically
      if (activeAreaParticipation !== matchedArea.id) {
        console.log(`📍 Auto-CheckIn: Entering area ${matchedArea.name} (${matchedArea.id})`);
        
        // Join socket presence
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ type: 'join:area', areaId: matchedArea.id }));
          setActiveAreaParticipation(matchedArea.id);
          // Fetch chat history for this area automatically
          fetchChatHistory(matchedArea.id);
        }

        // Open details view
        setSelectedAreaId(matchedArea.id);
        setActiveTab('details');

        alert(`📍 Presença Automática: Entrou em "${matchedArea.name}"! Ligação segura em tempo real ativa.`);
      }
    } else {
      // If we were inside an area but now we are outside all of them, automatically check out
      if (activeAreaParticipation) {
        const previousArea = areas.find(a => a.id === activeAreaParticipation);
        const previousName = previousArea ? previousArea.name : "zona";
        console.log(`📍 Auto-CheckOut: Leaving area ${activeAreaParticipation}`);

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ type: 'leave:area', areaId: activeAreaParticipation }));
        }
        setActiveAreaParticipation(null);

        alert(`📍 Presença Automática: Saiu de "${previousName}". Presença desativada automaticamente para sua total privacidade.`);
      }
    }
  }, [userCoords, areas, wsConnected, session, isAutoPresenceActive, activeAreaParticipation]);

  // 3. Fetch Session on Mount
  useEffect(() => {
    async function initSession() {
      try {
        const storedSessId = localStorage.getItem('gcruise_session_id') || '';
        const storedNick = localStorage.getItem('gcruise_nickname') || '';

        const res = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: storedSessId,
            requestedNickname: storedNick
          })
        });

        if (res.status === 403) {
          const errData = await res.json();
          setSessionBanned(true);
          setBanReason(errData.reason || 'Sessão suspensa por violação dos termos.');
          setIsLoadingSession(false);
          return;
        }

        const data: SessionInfo = await res.json();
        setSession(data);
        setNewNickname(data.nickname);
        localStorage.setItem('gcruise_session_id', data.sessionId);
        localStorage.setItem('gcruise_nickname', data.nickname);
      } catch (err) {
        console.error("Error setting up session:", err);
      } finally {
        setIsLoadingSession(false);
      }
    }

    initSession();
    fetchAreas();
    fetchSuggestions();
  }, []);

  // 2. Fetch public cruising areas
  const fetchAreas = async () => {
    try {
      const res = await fetch('/api/areas');
      if (res.ok) {
        const data = await res.json();
        setAreas(data);
      }
    } catch (err) {
      console.error("Error loading cruising areas:", err);
    }
  };

  // Fetch pending suggestions for community voting
  const fetchSuggestions = async () => {
    try {
      const res = await fetch('/api/suggestions');
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data);
      }
    } catch (err) {
      console.error("Error loading suggestions:", err);
    }
  };

  // 3. Connect WebSockets once Session is active
  useEffect(() => {
    if (!session || sessionBanned) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/gcruise-ws?sessionId=${session.sessionId}&nickname=${encodeURIComponent(session.nickname)}`;

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setWsConnected(true);
      console.log("WebSocket connected to gCruise server.");

      // If already active in a zone on reconnect, automatically notify backend
      if (activeAreaParticipation) {
        socket.send(JSON.stringify({ type: 'join:area', areaId: activeAreaParticipation }));
      }
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'system:banned': {
            setSessionBanned(true);
            setBanReason(data.payload.reason || 'Violação dos termos.');
            socket.close();
            break;
          }

          case 'area:presence_joined': {
            const { areaId, presence, activeCount } = data.payload;
            
            // Add to active presences array (idempotent checks)
            setPresences(prev => {
              if (prev.some(p => p.sessionId === presence.sessionId)) {
                return prev.map(p => p.sessionId === presence.sessionId ? presence : p);
              }
              return [...prev, presence];
            });

            // Update area activeCount
            setAreas(prev => prev.map(a => a.id === areaId ? { ...a, activeCount } : a));
            break;
          }

          case 'area:presence_left': {
            const { areaId, sessionId, activeCount } = data.payload;
            
            // Remove from presences array
            setPresences(prev => prev.filter(p => p.sessionId !== sessionId));

            // Update area activeCount
            setAreas(prev => prev.map(a => a.id === areaId ? { ...a, activeCount } : a));
            break;
          }

          case 'area:active_count_updated': {
            const { areaId, activeCount } = data.payload;
            setAreas(prev => prev.map(a => a.id === areaId ? { ...a, activeCount } : a));
            break;
          }

          case 'chat:message_sent': {
            const { areaId, message } = data.payload;
            setChatMessages(prev => {
              const currentList = prev[areaId] || [];
              if (currentList.some(m => m.id === message.id)) return prev; // Avoid duplicates
              return { ...prev, [areaId]: [...currentList, message] };
            });
            break;
          }

          case 'chat:system_message': {
            const { areaId, message } = data.payload;
            setChatMessages(prev => {
              const currentList = prev[areaId] || [];
              return { ...prev, [areaId]: [...currentList, message] };
            });
            break;
          }

          case 'chat:message_deleted': {
            const { areaId, messageId } = data.payload;
            setChatMessages(prev => {
              const currentList = prev[areaId] || [];
              return { ...prev, [areaId]: currentList.filter(m => m.id !== messageId) };
            });
            break;
          }

          case 'chat:typing': {
            const { areaId, nickname, isTyping } = data.payload;
            if (nickname === session.nickname) return; // ignore self typing events

            setTypingUsers(prev => {
              const list = prev[areaId] || [];
              if (isTyping) {
                if (list.includes(nickname)) return prev;
                return { ...prev, [areaId]: [...list, nickname] };
              } else {
                return { ...prev, [areaId]: list.filter(n => n !== nickname) };
              }
            });
            break;
          }

          case 'map:area_created':
          case 'map:area_approved': {
            const { area } = data.payload;
            setAreas(prev => {
              if (prev.some(a => a.id === area.id)) return prev;
              return [...prev, area];
            });
            // Update suggestions if they match (for admin panel)
            setAdminSuggestions(prev => prev.filter(s => s.name !== area.name));
            fetchSuggestions(); // Reload public suggestions list
            break;
          }

          case 'map:area_updated': {
            const { area } = data.payload;
            setAreas(prev => prev.map(a => a.id === area.id ? area : a));
            break;
          }

          case 'map:area_removed': {
            const { areaId } = data.payload;
            setAreas(prev => prev.filter(a => a.id !== areaId));
            if (selectedAreaId === areaId) {
              setSelectedAreaId(null);
              setActiveTab('list');
            }
            break;
          }

          // Admin notifications / Public Suggestion Created or Updated
          case 'admin:suggestion_created': {
            const { suggestion } = data.payload;
            setAdminSuggestions(prev => {
              if (prev.some(s => s.id === suggestion.id)) {
                return prev.map(s => s.id === suggestion.id ? suggestion : s);
              }
              return [suggestion, ...prev];
            });
            fetchSuggestions(); // Reload public suggestions list
            break;
          }

          case 'admin:report_created': {
            const { report } = data.payload;
            setAdminReports(prev => [report, ...prev]);
            break;
          }

          case 'admin:log_added': {
            const { log } = data.payload;
            setAdminLogs(prev => [log, ...prev]);
            break;
          }
        }
      } catch (err) {
        console.error("Error reading socket payload:", err);
      }
    };

    socket.onclose = () => {
      setWsConnected(false);
      console.log("WebSocket disconnected. Retrying in 5 seconds...");
      setTimeout(() => {
        if (socketRef.current === socket) {
          // Reconnect trigger
          setSession({ ...session! });
        }
      }, 5000);
    };

    // Presence Hearbeat loop (every 20 seconds)
    const heartbeatInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'heartbeat' }));
      }
    }, 20000);

    return () => {
      clearInterval(heartbeatInterval);
      socket.close();
    };
  }, [session, sessionBanned]);

  // Fetch admin items if admin mode is opened
  useEffect(() => {
    if (isAdminMode) {
      fetchAdminData();
    }
  }, [isAdminMode]);

  const fetchAdminData = async () => {
    try {
      const [sugRes, repRes, logRes, sessRes] = await Promise.all([
        fetch('/api/admin/suggestions'),
        fetch('/api/admin/reports'),
        fetch('/api/admin/logs'),
        fetch('/api/admin/sessions')
      ]);

      if (sugRes.ok) setAdminSuggestions(await sugRes.json());
      if (repRes.ok) setAdminReports(await repRes.json());
      if (logRes.ok) setAdminLogs(await logRes.json());
      if (sessRes.ok) setAdminSessions(await sessRes.json());
    } catch (err) {
      console.error("Error fetching admin modules:", err);
    }
  };

  // 4. Handle entering/leaving area
  const handleJoinArea = (areaId: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      alert("Ligação ao servidor em falta. Aguarde um momento.");
      return;
    }

    socketRef.current.send(JSON.stringify({ type: 'join:area', areaId }));
    setActiveAreaParticipation(areaId);

    // Fetch initial chat history
    fetchChatHistory(areaId);
  };

  const handleLeaveArea = (areaId: string) => {
    if (!socketRef.current) return;
    socketRef.current.send(JSON.stringify({ type: 'leave:area', areaId }));
    setActiveAreaParticipation(null);
  };

  const fetchChatHistory = async (areaId: string) => {
    try {
      const res = await fetch(`/api/areas/${areaId}/chat`);
      if (res.ok) {
        const history = await res.json();
        setChatMessages(prev => ({ ...prev, [areaId]: history }));
      }
    } catch (err) {
      console.error("Error reading chat history:", err);
    }
  };

  // 5. Send message via REST API
  const handleSendMessage = async (text: string): Promise<boolean> => {
    if (!selectedAreaId || !session) return false;

    try {
      const res = await fetch(`/api/areas/${selectedAreaId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.sessionId,
          nickname: session.nickname,
          message: text
        })
      });

      if (res.status === 429) {
        const err = await res.json();
        throw new Error(err.error);
      }

      return res.ok;
    } catch (err: any) {
      throw new Error(err.message || "Erro de ligação.");
    }
  };

  // Emit typing indicator over WebSocket
  const handleSendTyping = (isTyping: boolean) => {
    if (!selectedAreaId || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify({
      type: 'typing',
      areaId: selectedAreaId,
      isTyping
    }));
  };

  // Submit report via REST API
  const handleReportMessage = async (msg: AreaMessage, reason: string) => {
    if (!session) return;
    try {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportableType: 'message',
          reportableId: msg.id,
          reason,
          reportedBySessionId: session.sessionId,
          targetLabel: `Mensagem: "${msg.message}" enviada por ${msg.nickname}`
        })
      });
    } catch (err) {
      console.error("Error reporting message:", err);
    }
  };

  const handleReportArea = async (area: CruisingArea, reason: string, details: string) => {
    if (!session) return;
    try {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportableType: 'area',
          reportableId: area.id,
          reason,
          details,
          reportedBySessionId: session.sessionId,
          targetLabel: `Zona: ${area.name} (${area.city})`
        })
      });
    } catch (err) {
      console.error("Error reporting area:", err);
    }
  };

  // Submit Suggestion via REST API
  const handleSuggestSubmit = async (data: {
    name: string;
    description: string;
    country: string;
    city: string;
    center: [number, number];
    radius: number;
  }): Promise<boolean> => {
    if (!session) return false;
    try {
      const res = await fetch('/api/areas/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          country: data.country,
          city: data.city,
          geometryType: 'circle',
          geometryJson: {
            center: data.center,
            radius: data.radius
          },
          sessionId: session.sessionId
        })
      });

      if (res.status === 429) {
        const err = await res.json();
        throw new Error(err.error);
      }

      if (res.ok) {
        fetchSuggestions();
        return true;
      }
      return false;
    } catch (err: any) {
      throw new Error(err.message || 'Erro de rede.');
    }
  };

  // Update nickname REST API
  const handleUpdateNickname = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || isUpdatingNick) return;

    setIsUpdatingNick(true);
    try {
      const res = await fetch('/api/session/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.sessionId,
          nickname: newNickname
        })
      });

      if (res.ok) {
        const updatedSession = await res.json();
        setSession(updatedSession);
        localStorage.setItem('gcruise_nickname', updatedSession.nickname);
        alert('Nickname atualizado com sucesso em todas as salas ativas.');
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao atualizar nickname.');
      }
    } catch (err) {
      console.error("Error changing nickname:", err);
    } finally {
      setIsUpdatingNick(false);
    }
  };

  // Admin specific action triggers
  const handleApproveSuggestion = async (id: string, notes: string) => {
    try {
      const res = await fetch(`/api/admin/suggestions/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: notes })
      });
      if (res.ok) {
        setAdminSuggestions(prev => prev.filter(s => s.id !== id));
        fetchAreas(); // redraw map
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectSuggestion = async (id: string, notes: string) => {
    try {
      const res = await fetch(`/api/admin/suggestions/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: notes })
      });
      if (res.ok) {
        setAdminSuggestions(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveReport = async (id: string, status: 'resolved' | 'dismissed') => {
    try {
      const res = await fetch(`/api/admin/reports/${id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setAdminReports(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBanSession = async (sessionId: string, reason: string) => {
    try {
      const res = await fetch(`/api/admin/sessions/${sessionId}/ban`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
      if (res.ok) {
        setAdminSessions(prev => prev.map(s => s.sessionId === sessionId ? { ...s, isBanned: true, banReason: reason } : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveMessage = async (messageId: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${messageId}/remove`, {
        method: 'POST'
      });
      if (res.ok && selectedAreaId) {
        fetchChatHistory(selectedAreaId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Quick helper to select area
  const selectArea = (areaId: string) => {
    setSelectedAreaId(areaId);
    setActiveTab('details');
  };

  // Coordinate select click listener
  const handleMapClick = (coords: [number, number]) => {
    if (activeTab === 'suggest') {
      setTemporaryCoords(coords);
    } else {
      // Allow simulating user location by clicking on the map
      setUserCoords(coords);
      console.log(`📍 Simulated user location set to: ${coords}`);
    }
  };

  // 6. Ban Screen
  if (sessionBanned) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-red-950 border border-red-500/30 flex items-center justify-center text-red-500 mb-6 animate-pulse">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Acesso Suspenso</h1>
        <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
          Esta sessão foi bloqueada pela moderação do gCruise por violação direta das nossas diretrizes de privacidade e respeito mútuo.
        </p>
        <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl mt-6 max-w-sm w-full">
          <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">Motivo Declarado</span>
          <p className="text-xs text-red-400 font-medium mt-1 font-mono">"{banReason}"</p>
        </div>
        <p className="text-[10px] text-slate-600 mt-6 max-w-xs leading-relaxed font-mono">
          Caso considere esta decisão um erro, limpe os dados de navegação para obter um novo perfil anónimo. Mantenha as interações sempre respeitadoras.
        </p>
      </div>
    );
  }

  if (isLoadingSession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-300 font-sans space-y-4">
        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono tracking-wider text-slate-500">A iniciar ligação cifrada gCruise...</p>
      </div>
    );
  }

  const selectedArea = areas.find(a => a.id === selectedAreaId);

  const hideSidebarOnMobile = activeTab === 'map' || (activeTab === 'suggest' && !temporaryCoords);
  const showMapOnMobile = activeTab === 'map' || activeTab === 'suggest';

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* Mobile-Only Header & Sub-Tabs Switcher */}
      <div className="md:hidden flex flex-col bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6.5 h-6.5 bg-indigo-600 rounded-md flex items-center justify-center font-bold text-white text-xs">
              g
            </div>
            <div>
              <h1 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                gCruise <span className="text-[10px] text-indigo-400 font-normal">Plataforma de Cruising</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex p-2 gap-1 bg-slate-950/60 border-t border-slate-850 justify-around">
          <button
            onClick={() => {
              setSelectedAreaId(null);
              setActiveTab('map');
            }}
            className={`flex-1 flex justify-center items-center py-2.5 rounded-xl transition ${
              activeTab === 'map'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
            id="tab-mobile-map"
            title="Mapa"
          >
            <MapIcon className="w-5.5 h-5.5" />
          </button>
          <button
            onClick={() => {
              setSelectedAreaId(null);
              setActiveTab('list');
            }}
            className={`flex-1 flex justify-center items-center py-2.5 rounded-xl transition ${
              activeTab === 'list' || activeTab === 'details'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
            id="tab-mobile-list"
            title="Lista"
          >
            <ListIcon className="w-5.5 h-5.5" />
          </button>
          <button
            onClick={() => {
              fetchSuggestions();
              setActiveTab('vote');
            }}
            className={`flex-1 flex justify-center items-center py-2.5 rounded-xl transition relative ${
              activeTab === 'vote'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
            id="tab-mobile-votes"
            title="Votação de Novas Zonas"
          >
            <div className="relative">
              <VoteIcon className="w-5.5 h-5.5" />
              {suggestions.filter(s => s.status === 'pending').length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white font-sans ring-2 ring-slate-900">
                  {suggestions.filter(s => s.status === 'pending').length}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-1 h-full overflow-hidden relative">
        {/* 1. Sidebar Section */}
        <aside className={`flex flex-col bg-slate-900 border-r border-slate-800 shrink-0 z-10 animate-fade-in ${hideSidebarOnMobile ? 'hidden md:flex' : 'flex'} ${activeTab === 'suggest' && temporaryCoords ? 'absolute bottom-0 left-0 right-0 h-[55%] md:relative md:h-full md:w-96' : 'w-full md:w-96 h-full'}`}>
          
          {/* App Branding Header (Desktop only) */}
          <header className="hidden md:flex p-4 border-b border-slate-800 bg-slate-900 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 font-sans">
                g
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  gCruise
                </h1>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  Zonas de Cruising Gay
                </p>
              </div>
            </div>
          </header>

          {/* Desktop Navigation Sub-Tabs Switcher */}
          <div className="hidden md:flex border-b border-slate-800 bg-slate-950/60 p-2 gap-1.5 shrink-0 justify-around">
            <button
              onClick={() => {
                setSelectedAreaId(null);
                setActiveTab('list');
              }}
              className={`flex-1 flex justify-center items-center py-2.5 rounded-xl transition ${
                activeTab === 'list' || activeTab === 'details' || activeTab === 'map'
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
              id="tab-desktop-list"
              title="Lista"
            >
              <ListIcon className="w-5.5 h-5.5" />
            </button>
            <button
              onClick={() => {
                fetchSuggestions();
                setActiveTab('vote');
              }}
              className={`flex-1 flex justify-center items-center py-2.5 rounded-xl transition relative ${
                activeTab === 'vote'
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
              id="tab-desktop-votes"
              title="Votação de Novas Zonas"
            >
              <div className="relative">
                <VoteIcon className="w-5.5 h-5.5" />
                {suggestions.filter(s => s.status === 'pending').length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white font-sans ring-2 ring-slate-900">
                    {suggestions.filter(s => s.status === 'pending').length}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Dynamic Sidebar Views (Switchable content panel) */}
          <div className="flex-1 overflow-hidden">
            {(activeTab === 'list' || activeTab === 'map') && (
            <div className="h-full flex flex-col" id="sidebar-list-view">
              {/* Quick Profile Widget */}
              <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <div className={`w-1.5 h-1.5 rounded-full ${wsConnected ? 'bg-green-500 animate-pulse' : 'bg-rose-500'}`} />
                  <span className="text-[9px] text-green-500 font-medium uppercase tracking-wider">
                    {wsConnected ? 'Live Connected' : 'Disconnected'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 truncate max-w-[100px]">{session?.nickname}</span>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-[#141414] border border-[#2a2a2a] px-2 py-0.5 rounded transition"
                  >
                    Configurar
                  </button>
                </div>
              </div>

              {/* Title & Suggest Button */}
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                  Zonas de Cruising
                </h3>
                <button
                  onClick={() => {
                    setTemporaryCoords(null);
                    setActiveTab('suggest');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-indigo-600/15 cursor-pointer"
                  id="btn-trigger-suggest"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar Zona
                </button>
              </div>

              {/* Cruising Areas List */}
              <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2.5">
                {areas.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono">
                    Carregando localizações no mapa...
                  </div>
                ) : (
                  areas.map((area) => {
                    const isSelected = selectedAreaId === area.id;
                    const isActiveParticipant = activeAreaParticipation === area.id;

                    return (
                      <div
                        key={area.id}
                        onClick={() => selectArea(area.id)}
                        className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isSelected 
                            ? 'bg-indigo-600/10 border-indigo-500/30 shadow-lg shadow-indigo-500/5' 
                            : 'bg-[#141414] border-slate-800/60 hover:bg-[#1a1a1a] hover:border-[#2a2a2a]'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-semibold text-slate-100 leading-tight">
                              {area.name}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                              {area.city}, {area.country}
                            </p>
                          </div>
                          
                          {/* Active Presence Count bubble */}
                          <div className="text-right">
                            <span className={`inline-flex items-center gap-1 px-2 rounded-full text-[10px] font-medium ${
                              area.activeCount > 0 
                                ? 'bg-indigo-500/20 text-indigo-300' 
                                : 'bg-gray-500/10 text-gray-500'
                            }`}>
                              👥 {area.activeCount > 0 ? `${area.activeCount} ${area.activeCount === 1 ? 'pessoa' : 'pessoas'} na zona` : '0 pessoas na zona'}
                            </span>
                          </div>
                        </div>

                        {isActiveParticipant && (
                          <div className="mt-2.5 flex items-center gap-1 text-[9px] bg-indigo-950/30 text-indigo-400 border border-indigo-900/40 rounded px-1.5 py-0.5 font-mono w-max">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                            Marcado como presente
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'details' && selectedArea && (
            <ZoneDetails
              area={selectedArea}
              session={session!}
              presences={presences}
              isActiveHere={activeAreaParticipation === selectedArea.id}
              onJoinArea={handleJoinArea}
              onLeaveArea={handleLeaveArea}
              onOpenChat={() => {
                setShowChatDrawer(true);
                // On mobile, keep it clean. Drawer overlays.
              }}
              onReportArea={handleReportArea}
              onDeselect={() => {
                setSelectedAreaId(null);
                setActiveTab('map');
              }}
            />
          )}

          {activeTab === 'suggest' && (
            <SuggestZone
              onCancel={() => {
                setTemporaryCoords(null);
                setTemporaryRadius(150); // Reset to default radius
                setActiveTab('map');
              }}
              onSubmit={handleSuggestSubmit}
              selectedCoords={temporaryCoords}
              onClearCoords={() => setTemporaryCoords(null)}
              radius={temporaryRadius}
              onChangeRadius={setTemporaryRadius}
            />
          )}

          {activeTab === 'vote' && (
            <div className="h-full flex flex-col bg-slate-900" id="sidebar-vote-view">
              {/* Header Info */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex flex-col gap-3">
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-indigo-400">
                    Autonomia da Comunidade
                  </span>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-1">
                    🗳️ Aprovação de Novas Zonas
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                    Zonas sugeridas entram em votação pública. Ao atingirem <strong className="text-indigo-400 font-bold font-sans">5 aprovações</strong> de diferentes cruisers, são publicadas!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTemporaryCoords(null);
                    setActiveTab('suggest');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-indigo-600/15 cursor-pointer"
                  id="btn-suggest-from-votes"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Nova Zona
                </button>
              </div>

              {/* Suggestions list for community voting */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
                {suggestions.filter(s => s.status === 'pending').length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono leading-relaxed px-4">
                    Nenhuma sugestão sob votação de momento. Toque no mapa e clique em "Sugerir" para propor uma zona!
                  </div>
                ) : (
                  suggestions.filter(s => s.status === 'pending').map((suggestion) => {
                    const votes = suggestion.upvotes || [];
                    const currentSessionVoted = session && votes.includes(session.sessionId);
                    const votesLeft = Math.max(0, 5 - votes.length);

                    return (
                      <div
                        key={suggestion.id}
                        className="p-3.5 rounded-xl bg-[#141414] border border-slate-800/80 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-slate-100 leading-tight">
                              {suggestion.name}
                            </h4>
                            <span className="text-[10px] font-mono font-semibold bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 rounded px-2 py-0.5">
                              {votes.length}/5 Votos
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                            {suggestion.city}, {suggestion.country}
                          </p>
                          <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed bg-[#0c0c0c] p-2.5 rounded-lg border border-slate-900 italic">
                            "{suggestion.description}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-slate-500 font-mono">
                            {votesLeft === 0 
                              ? "A processar aprovação..." 
                              : `Faltam ${votesLeft} aprovações`}
                          </span>
                          <button
                            onClick={async () => {
                              if (!session) return;
                              try {
                                const res = await fetch(`/api/suggestions/${suggestion.id}/upvote`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ sessionId: session.sessionId })
                                });

                                if (res.ok) {
                                  const data = await res.json();
                                  if (data.approved) {
                                    alert(`🎉 Zona "${suggestion.name}" foi aprovada pela comunidade e já está ativa no mapa!`);
                                    fetchAreas();
                                  } else {
                                    alert(`🗳️ A sua aprovação foi registada com sucesso! (${data.suggestion.upvotes.length}/5 votos)`);
                                  }
                                  fetchSuggestions();
                                } else {
                                  const err = await res.json();
                                  alert(err.error || 'Erro ao votar.');
                                }
                              } catch (err) {
                                console.error("Error voting:", err);
                              }
                            }}
                            disabled={currentSessionVoted}
                            className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] transition flex items-center gap-1 cursor-pointer ${
                              currentSessionVoted
                                ? 'bg-indigo-950/20 text-indigo-500/60 border border-indigo-950/40 cursor-default'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950/20 active:scale-95'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${currentSessionVoted ? 'fill-indigo-500/60' : ''}`} />
                            {currentSessionVoted ? 'Aprovado' : 'Aprovar'}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <AdminPanel
              suggestions={adminSuggestions}
              reports={adminReports}
              logs={adminLogs}
              sessions={adminSessions}
              onApproveSuggestion={handleApproveSuggestion}
              onRejectSuggestion={handleRejectSuggestion}
              onResolveReport={handleResolveReport}
              onBanSession={handleBanSession}
              onRemoveMessage={handleRemoveMessage}
              onClose={() => setActiveTab('list')}
            />
          )}

          {activeTab === 'settings' && (
            <div className="p-4 space-y-4 h-full flex flex-col bg-slate-900" id="settings-view">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-2">
                <Settings className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-100">Configurações de Identidade</h3>
              </div>

              {/* Profile setup form */}
              <form onSubmit={handleUpdateNickname} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    O Seu Nickname Público (Anónimo)
                  </label>
                  <input
                    type="text"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    placeholder="Mude o seu nickname público..."
                    maxLength={25}
                    className="w-full bg-[#141414] text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    id="settings-nickname-input"
                  />
                  <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed font-mono">
                    Todos os chats e contadores mostram apenas este nome anónimo. Nunca revele dados pessoais.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isUpdatingNick || newNickname.trim() === session?.nickname}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl transition active:scale-95 disabled:opacity-40 cursor-pointer"
                  id="settings-save-btn"
                >
                  {isUpdatingNick ? 'A Guardar...' : 'Guardar Alterações'}
                </button>
              </form>

              {/* Tech Stats Indicator */}
              <div className="p-3 bg-[#141414] border border-slate-800 rounded-xl space-y-2 font-mono text-[10px] text-slate-400">
                <div className="flex justify-between">
                  <span>Sessão Cifrada:</span>
                  <span className="text-indigo-400">Ativa</span>
                </div>
                <div className="flex justify-between">
                  <span>ID Canal:</span>
                  <span className="truncate max-w-[140px] text-slate-300">{session?.sessionId}</span>
                </div>
                <div className="flex justify-between">
                  <span>WS Link:</span>
                  <span className={wsConnected ? 'text-emerald-400' : 'text-rose-400'}>
                    {wsConnected ? 'LIGADO' : 'DESLIGADO'}
                  </span>
                </div>
              </div>

              {/* Back button */}
              <div className="pt-4 mt-auto">
                <button
                  onClick={() => setActiveTab('list')}
                  className="w-full bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white py-2.5 rounded-xl font-semibold transition"
                  id="btn-back-settings"
                >
                  Voltar ao Painel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Global Bottom Switch to experience the admin review loops (Architectural Honesty) */}
        <footer className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[10px]">gCruise Admin-Link</span>
          <button
            onClick={() => {
              if (activeTab === 'admin') {
                setActiveTab('list');
                setIsAdminMode(false);
              } else {
                setActiveTab('admin');
                setIsAdminMode(true);
              }
            }}
            className={`px-2.5 py-1 rounded font-semibold text-[10px] tracking-wide transition ${
              activeTab === 'admin' 
                ? 'bg-indigo-950 text-indigo-400 border border-indigo-900/50' 
                : 'bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
            id="toggle-admin-mode-btn"
          >
            {activeTab === 'admin' ? 'Ver Mapa de Utilizador' : 'Entrar no Modo Admin'}
          </button>
        </footer>
      </aside>

      {/* 2. Interactive Map Section */}
      <main className={`flex-1 h-full relative overflow-hidden bg-slate-950 ${showMapOnMobile ? 'block' : 'hidden md:block'}`}>
        {activeTab === 'suggest' && !temporaryCoords && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-indigo-950/90 border border-indigo-500/40 text-indigo-200 px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium text-center backdrop-blur max-w-[85%] animate-bounce">
            📍 Toque no mapa para marcar o local da nova zona de cruising
          </div>
        )}

        <Map
          areas={areas}
          selectedAreaId={selectedAreaId}
          onSelectArea={selectArea}
          onMapClick={handleMapClick}
          suggestModeActive={activeTab === 'suggest'}
          temporarySuggestedCoords={temporaryCoords}
          temporarySuggestedRadius={temporaryRadius}
          userCoords={userCoords}
        />

        {/* High-visibility Floating Button to suggest/add a zone on mobile or map click */}
        {activeTab !== 'suggest' && activeTab !== 'admin' && activeTab !== 'settings' && (
          <button
            onClick={() => {
              setTemporaryCoords(null);
              setActiveTab('suggest');
            }}
            className="absolute bottom-5 left-5 z-[1000] flex items-center gap-1.5 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-indigo-400/20 font-sans font-bold text-xs uppercase tracking-widest cursor-pointer"
            id="map-floating-suggest-btn"
            title="Sugerir Nova Zona de Cruising"
          >
            <Plus className="w-4 h-4" />
            Adicionar Zona
          </button>
        )}

        {/* Floating Button to open chat for selected area directly from map screen */}
        {selectedArea && activeTab === 'map' && (
          <button
            onClick={() => setShowChatDrawer(true)}
            className="absolute bottom-5 right-5 z-[1000] flex items-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-emerald-400/20 font-sans font-bold text-xs uppercase tracking-wider cursor-pointer"
            id="map-floating-chat-btn"
            title={`Entrar no Chat de ${selectedArea.name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Entrar no Chat (${selectedArea.activeCount})
          </button>
        )}

        {/* Chat Drawer Slideout (overlays on map screen with absolute positioning) */}
        {showChatDrawer && selectedArea && (
          <div className="absolute top-0 right-0 h-full w-full sm:w-96 z-20 shadow-2xl transition-all duration-300 animate-slide-in">
            <Chat
              areaId={selectedArea.id}
              areaName={selectedArea.name}
              session={session!}
              messages={chatMessages[selectedArea.id] || []}
              typingUsers={typingUsers[selectedArea.id] || []}
              onSendMessage={handleSendMessage}
              onSendTyping={handleSendTyping}
              onReportMessage={handleReportMessage}
              isAdmin={isAdminMode}
              onRemoveMessage={handleRemoveMessage}
              onClose={() => setShowChatDrawer(false)}
              presences={presences}
            />
          </div>
        )}
      </main>
      </div>

      {/* AdMob Reserved Area (Banner at the very bottom) */}
      <div className="bg-slate-900 border-t border-slate-800 p-2 text-center shrink-0 flex flex-col items-center justify-center min-h-[60px] z-20" id="admob-placeholder-banner">
        <div className="text-[9px] uppercase tracking-wider font-mono text-slate-500 mb-0.5">Espaço Reservado AdMob</div>
        <div className="w-full max-w-[320px] h-[50px] bg-slate-950 border border-dashed border-slate-800 rounded flex items-center justify-center text-slate-600 text-[10px] font-mono">
          Anúncio Responsivo / Smart Banner 320x50
        </div>
      </div>

      {/* Age Verification Overlay (z-9999 blocks entire screen interaction until accepted) */}
      {!isAgeVerified && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 p-4 overflow-y-auto" id="age-verification-gate">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center space-y-6 animate-fade-in relative">
            <div className="mx-auto w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center text-rose-500 text-3xl font-sans font-bold">
              18+
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Confirmação de Maioridade</h2>
              <p className="text-xs text-slate-400 font-mono tracking-wide uppercase">Controle de Conteúdo Adulto</p>
            </div>

            {ageDenied ? (
              <div className="space-y-4 py-2 animate-fade-in">
                <p className="text-xs text-rose-400 bg-rose-950/20 border border-rose-900/40 p-3 rounded-xl leading-relaxed">
                  Lamentamos, mas deve ter pelo menos 18 anos de idade para aceder ao gCruise. O acesso foi bloqueado.
                </p>
                <button
                  onClick={() => window.location.href = 'https://google.com'}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition cursor-pointer text-xs uppercase tracking-widest font-mono"
                >
                  Sair do Site
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Este site contém informações sobre zonas de cruising gay, chats em tempo real e interações adultas. Para prosseguir, confirme que tem pelo menos 18 anos de idade e que concorda com os termos de discrição.
                </p>

                <div className="flex flex-col space-y-2.5 pt-2 font-sans">
                  <button
                    onClick={() => {
                      localStorage.setItem('gCruise_18plus', 'true');
                      setIsAgeVerified(true);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition active:scale-[0.98] shadow-lg shadow-indigo-500/10 cursor-pointer text-xs"
                    id="btn-age-verify-yes"
                  >
                    Sim, sou maior de 18 anos
                  </button>
                  <button
                    onClick={() => setAgeDenied(true)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold py-3 rounded-xl transition cursor-pointer text-xs"
                    id="btn-age-verify-no"
                  >
                    Não, sou menor de 18 anos
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 font-mono leading-relaxed">
                  gCruise opera com total discrição técnica. Nós não recolhemos dados pessoais identificáveis.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
