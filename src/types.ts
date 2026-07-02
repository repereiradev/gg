export type GeometryType = 'circle' | 'polygon';

export interface GeometryJson {
  center: [number, number]; // [lat, lng]
  radius?: number;          // in meters, for circles
  coordinates?: [number, number][]; // for polygons
}

export interface CruisingArea {
  id: string;
  name: string;
  slug: string;
  description: string;
  country: string;
  city: string;
  geometryType: GeometryType;
  geometryJson: GeometryJson;
  status: 'pending' | 'approved' | 'rejected';
  createdBy?: string; // sessionId
  approvedBy?: string;
  approvedAt?: string; // ISO string
  createdAt: string;
  updatedAt: string;
  activeCount: number; // calculated dynamically but stored for convenience
}

export interface AreaPresence {
  id: string;
  areaId: string;
  sessionId: string;
  nickname: string;
  lastSeenAt: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

export interface AreaMessage {
  id: string;
  areaId: string;
  sessionId: string;
  nickname: string;
  message: string;
  type: 'text' | 'system';
  status: 'visible' | 'removed' | 'reported';
  createdAt: string;
  updatedAt: string;
}

export interface AreaSuggestion {
  id: string;
  name: string;
  description: string;
  country: string;
  city: string;
  geometryType: GeometryType;
  geometryJson: GeometryJson;
  status: 'pending' | 'approved' | 'rejected';
  sessionId?: string;
  adminNotes?: string;
  upvotes?: string[]; // list of sessionIds that supported/voted for this suggestion
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  reportableType: 'area' | 'message' | 'user';
  reportableId: string; // ID of the area, message, or session
  reason: string;
  details: string;
  reportedBySessionId: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
  updatedAt: string;
  // Extra info for easy rendering in admin
  targetLabel?: string; // e.g. "Message: 'hello' by Nick" or "Area: Parque"
}

export interface SessionInfo {
  sessionId: string;
  nickname: string;
  isBanned: boolean;
  banReason?: string;
  createdAt: string;
}

export interface SystemLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
}

// WebSocket Event Payloads
export type WsEvent =
  | { type: 'area:presence_joined'; payload: { areaId: string; presence: AreaPresence; activeCount: number } }
  | { type: 'area:presence_left'; payload: { areaId: string; sessionId: string; activeCount: number } }
  | { type: 'area:presence_updated'; payload: { areaId: string; presences: AreaPresence[] } }
  | { type: 'area:active_count_updated'; payload: { areaId: string; activeCount: number } }
  | { type: 'chat:message_sent'; payload: { areaId: string; message: AreaMessage } }
  | { type: 'chat:message_deleted'; payload: { areaId: string; messageId: string } }
  | { type: 'chat:typing'; payload: { areaId: string; nickname: string; isTyping: boolean } }
  | { type: 'chat:system_message'; payload: { areaId: string; message: AreaMessage } }
  | { type: 'map:area_created'; payload: { area: CruisingArea } }
  | { type: 'map:area_approved'; payload: { area: CruisingArea } }
  | { type: 'map:area_updated'; payload: { area: CruisingArea } }
  | { type: 'map:area_removed'; payload: { areaId: string } }
  | { type: 'admin:suggestion_created'; payload: { suggestion: AreaSuggestion } }
  | { type: 'admin:report_created'; payload: { report: Report } }
  | { type: 'admin:log_added'; payload: { log: SystemLog } };
