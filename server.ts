import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import { 
  CruisingArea, 
  AreaPresence, 
  AreaMessage, 
  AreaSuggestion, 
  Report, 
  SessionInfo, 
  SystemLog,
  WsEvent
} from './src/types';

// Database file path
const DB_FILE = path.join(process.cwd(), 'gcruise_db.json');

// Interface for database file structure
interface DbStructure {
  areas: CruisingArea[];
  presences: AreaPresence[];
  messages: AreaMessage[];
  suggestions: AreaSuggestion[];
  reports: Report[];
  sessions: SessionInfo[];
  logs: SystemLog[];
}

// Initial seed areas
const SEED_AREAS: CruisingArea[] = [
  {
    id: 'area-1',
    name: 'Parque Eduardo VII - Alameda Sul',
    slug: 'parque-eduardo-vii-alameda-sul',
    description: 'Zona arborizada na encosta baixa do parque. Mais movimentada ao final de tarde e noite. Entrada discreta pelas laterais.',
    country: 'Portugal',
    city: 'Lisboa',
    geometryType: 'circle',
    geometryJson: {
      center: [38.7285, -9.1558],
      radius: 120
    },
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activeCount: 0
  },
  {
    id: 'area-2',
    name: 'Monsanto - Miradouro das Antenas',
    slug: 'monsanto-miradouro-das-antenas',
    description: 'Parque Florestal de Monsanto. Zona de trilhos arborizados com bastante privacidade. Muito frequentado ao fim de semana.',
    country: 'Portugal',
    city: 'Lisboa',
    geometryType: 'circle',
    geometryJson: {
      center: [38.7350, -9.1920],
      radius: 250
    },
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activeCount: 0
  },
  {
    id: 'area-3',
    name: 'Jardins do Palácio de Cristal',
    slug: 'jardins-do-palacio-de-cristal',
    description: 'Caminhos inferiores junto às arribas arborizadas sobre o Rio Douro. Muita vegetação e recantos discretos.',
    country: 'Portugal',
    city: 'Porto',
    geometryType: 'circle',
    geometryJson: {
      center: [41.1478, -8.6258],
      radius: 100
    },
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activeCount: 0
  },
  {
    id: 'area-4',
    name: 'Parque del Retiro - La Chopera',
    slug: 'parque-del-retiro-la-chopera',
    description: 'Zona arborizada perto do monumento de Alfonso XII e trilhos circundantes. Atividade discreta após o anoitecer.',
    country: 'Espanha',
    city: 'Madrid',
    geometryType: 'circle',
    geometryJson: {
      center: [40.4115, -3.6825],
      radius: 140
    },
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activeCount: 0
  },
  {
    id: 'area-5',
    name: 'Aterro do Flamengo - Próximo à Marina',
    slug: 'aterro-do-flamengo-proximo-a-marina',
    description: 'Área de bosque entre o Museu de Arte Moderna (MAM) e a Marina da Glória. Muito movimentada nas noites quentes.',
    country: 'Brasil',
    city: 'Rio de Janeiro',
    geometryType: 'circle',
    geometryJson: {
      center: [-22.9235, -43.1718],
      radius: 200
    },
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activeCount: 0
  }
];

const SEED_SUGGESTIONS: AreaSuggestion[] = [
  {
    id: 'sug-1',
    name: 'Parque da Cidade - Bosque dos Lagos',
    description: 'Sugestão de zona calma no extremo norte do parque, perto dos lagos pequenos e da ribeira.',
    country: 'Portugal',
    city: 'Porto',
    geometryType: 'circle',
    geometryJson: {
      center: [41.1685, -8.6792],
      radius: 150
    },
    status: 'pending',
    upvotes: ['sess-seed1', 'sess-seed2', 'sess-seed3'], // Has 3 votes, needs 2 more
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sug-2',
    name: 'Parque Trianon - Alamedas Internas',
    description: 'Bosque denso tropical mesmo no meio da movimentada Avenida Paulista. Discreto e muito tradicional.',
    country: 'Brasil',
    city: 'São Paulo',
    geometryType: 'circle',
    geometryJson: {
      center: [-23.5620, -46.6575],
      radius: 80
    },
    status: 'pending',
    upvotes: ['sess-seed1'], // Has 1 vote, needs 4 more
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Initialize DB
let db: DbStructure = {
  areas: SEED_AREAS,
  presences: [],
  messages: [],
  suggestions: SEED_SUGGESTIONS,
  reports: [],
  sessions: [],
  logs: []
};

// Load database from file
function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      db = JSON.parse(data);
      // Ensure arrays exist
      db.areas = db.areas || [];
      db.presences = db.presences || [];
      db.messages = db.messages || [];
      db.suggestions = db.suggestions || [];
      db.reports = db.reports || [];
      db.sessions = db.sessions || [];
      db.logs = db.logs || [];
    } else {
      saveDb();
    }
  } catch (err) {
    console.error("Error loading database file:", err);
  }
}

// Save database to file
function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error saving database file:", err);
  }
}

// Add system log
function addLog(action: string, details: string) {
  const log: SystemLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    action,
    details,
    timestamp: new Date().toISOString()
  };
  db.logs.unshift(log);
  // Cap at 200 logs
  if (db.logs.length > 200) {
    db.logs = db.logs.slice(0, 200);
  }
  saveDb();
  broadcastAdmin({ type: 'admin:log_added', payload: { log } });
}

// Global active WebSocket connections with metadata
interface GcruiseWs extends WebSocket {
  sessionId?: string;
  nickname?: string;
  currentAreaId?: string | null;
  isAlive?: boolean;
}

const activeSockets = new Set<GcruiseWs>();

// Broadcast helper for specific area rooms
function broadcastToArea(areaId: string, event: WsEvent) {
  const messageStr = JSON.stringify(event);
  activeSockets.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN && ws.currentAreaId === areaId) {
      ws.send(messageStr);
    }
  });
}

// Broadcast helper for admin channel
function broadcastAdmin(event: WsEvent) {
  const messageStr = JSON.stringify(event);
  activeSockets.forEach((ws) => {
    // Admins are sessions or just any WS connected that opted in, or we send to all active for simplicity
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(messageStr);
    }
  });
}

// Broadcast to all clients
function broadcastGlobal(event: WsEvent) {
  const messageStr = JSON.stringify(event);
  activeSockets.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(messageStr);
    }
  });
}

// Initialize server
async function startServer() {
  loadDb();
  addLog("System", "gCruise backend server started and database loaded.");

  const app = express();
  app.use(express.json());

  const PORT = 3000;
  const server = createServer(app);

  // Rate Limiting helper states
  const messageRateLimits = new Map<string, number[]>(); // sessionId -> timestamps[]
  const suggestionRateLimits = new Map<string, number[]>(); // sessionId -> timestamps[]
  const reportRateLimits = new Map<string, number[]>(); // sessionId -> timestamps[]

  function checkRateLimit(sessionId: string, map: Map<string, number[]>, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const history = map.get(sessionId) || [];
    const validHistory = history.filter(ts => now - ts < windowMs);
    if (validHistory.length >= limit) {
      return false;
    }
    validHistory.push(now);
    map.set(sessionId, validHistory);
    return true;
  }

  // --- API Routes ---

  // Check if session is banned
  function isBanned(sessionId: string): boolean {
    const session = db.sessions.find(s => s.sessionId === sessionId);
    return session ? session.isBanned : false;
  }

  // Auth / Session Endpoint
  app.post('/api/session', (req, res) => {
    const { sessionId, requestedNickname } = req.body;
    let session = db.sessions.find(s => s.sessionId === sessionId);

    if (session) {
      if (session.isBanned) {
        return res.status(403).json({ banned: true, reason: session.banReason });
      }
      return res.json(session);
    }

    // Generate new session
    const newSessionId = sessionId || `sess-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    const adjectives = ['Secreto', 'Discreto', 'Ativo', 'Curioso', 'Misterioso', 'Quente', 'Noturno', 'Explorador', 'Silencioso', 'Livre'];
    const nouns = ['Cruiser', 'Safari', 'Hunter', 'Fox', 'Hawk', 'Night', 'Shadow', 'Phoenix', 'Wolf', 'Runner'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(100 + Math.random() * 900);
    const generatedNick = requestedNickname || `${randomAdjective}${randomNoun}#${randomNumber}`;

    session = {
      sessionId: newSessionId,
      nickname: generatedNick,
      isBanned: false,
      createdAt: new Date().toISOString()
    };

    db.sessions.push(session);
    saveDb();
    addLog("SessionCreated", `New user session registered: ${generatedNick}`);
    res.json(session);
  });

  // Update session nickname
  app.post('/api/session/update', (req, res) => {
    const { sessionId, nickname } = req.body;
    if (isBanned(sessionId)) {
      return res.status(403).json({ banned: true });
    }
    const session = db.sessions.find(s => s.sessionId === sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const trimmed = nickname?.trim();
    if (!trimmed || trimmed.length < 2 || trimmed.length > 25) {
      return res.status(400).json({ error: 'Nickname must be between 2 and 25 characters.' });
    }

    const oldNick = session.nickname;
    session.nickname = trimmed;
    saveDb();

    // Update active presences
    db.presences.forEach(p => {
      if (p.sessionId === sessionId) {
        p.nickname = trimmed;
      }
    });

    addLog("NicknameUpdated", `User changed nick from "${oldNick}" to "${trimmed}"`);
    res.json(session);
  });

  // Get active areas
  app.get('/api/areas', (req, res) => {
    // Dynamically calculate active count per area
    const now = new Date();
    db.areas.forEach(area => {
      const active = db.presences.filter(p => {
        const lastSeen = new Date(p.lastSeenAt);
        // presence is active if updated in the last 5 minutes
        return p.areaId === area.id && (now.getTime() - lastSeen.getTime() < 5 * 60 * 1000);
      });
      area.activeCount = active.length;
    });

    res.json(db.areas.filter(a => a.status === 'approved'));
  });

  // Get chat history for specific area
  app.get('/api/areas/:areaId/chat', (req, res) => {
    const { areaId } = req.params;
    const chatHistory = db.messages
      .filter(m => m.areaId === areaId && m.status === 'visible')
      .slice(-50); // last 50 messages
    res.json(chatHistory);
  });

  // Post chat message (REST-driven)
  app.post('/api/areas/:areaId/messages', (req, res) => {
    const { areaId } = req.params;
    const { sessionId, nickname, message } = req.body;

    if (!sessionId) return res.status(400).json({ error: 'Session ID is required' });
    if (isBanned(sessionId)) return res.status(403).json({ error: 'Banned' });

    // Rate Limit Check: Max 5 messages in 10 seconds
    if (!checkRateLimit(sessionId, messageRateLimits, 5, 10000)) {
      return res.status(429).json({ error: 'Muitas mensagens enviadas rapidamente. Aguarde um momento.' });
    }

    // Word Filter (Simples)
    const badWords = ['admin123', 'cheat', 'golpe', 'venda', 'scam', 'dinheiro', 'pix', 'pagamento'];
    let cleanMessage = message || '';
    badWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      cleanMessage = cleanMessage.replace(regex, '***');
    });

    if (!cleanMessage.trim()) {
      return res.status(400).json({ error: 'Mensagem vazia' });
    }

    const newMessage: AreaMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      areaId,
      sessionId,
      nickname: nickname || 'Anon',
      message: cleanMessage,
      type: 'text',
      status: 'visible',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.messages.push(newMessage);
    saveDb();

    // Broadcast to area
    broadcastToArea(areaId, {
      type: 'chat:message_sent',
      payload: { areaId, message: newMessage }
    });

    res.json(newMessage);
  });

  // Suggest a new area
  app.post('/api/areas/suggest', (req, res) => {
    const { name, description, country, city, geometryType, geometryJson, sessionId } = req.body;

    if (sessionId && isBanned(sessionId)) {
      return res.status(403).json({ error: 'Banned' });
    }

    // Rate Limit Check: Max 2 suggestions in 5 minutes
    if (sessionId && !checkRateLimit(sessionId, suggestionRateLimits, 2, 5 * 60 * 1000)) {
      return res.status(429).json({ error: 'Limite de sugestões atingido. Aguarde alguns minutos.' });
    }

    if (!name || !country || !city || !geometryJson?.center) {
      return res.status(400).json({ error: 'Nome, país, cidade e coordenadas são obrigatórios.' });
    }

    const newSuggestion: AreaSuggestion = {
      id: `sug-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      description: description || '',
      country,
      city,
      geometryType: geometryType || 'circle',
      geometryJson,
      status: 'pending',
      sessionId,
      upvotes: sessionId ? [sessionId] : [], // Pre-upvote by creator
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.suggestions.push(newSuggestion);
    saveDb();

    addLog("SuggestionCreated", `New area suggestion: "${name}" in ${city}, ${country} (Started with 1 vote)`);

    // Notify admins/global
    broadcastAdmin({
      type: 'admin:suggestion_created',
      payload: { suggestion: newSuggestion }
    });

    res.json(newSuggestion);
  });

  // Get active suggestions for community voting
  app.get('/api/suggestions', (req, res) => {
    res.json(db.suggestions.filter(s => s.status === 'pending'));
  });

  // Upvote a suggestion (Community self-approval mechanic: rule of 5 upvotes)
  app.post('/api/suggestions/:id/upvote', (req, res) => {
    const { id } = req.params;
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID é obrigatório para votar.' });
    }
    if (isBanned(sessionId)) {
      return res.status(403).json({ error: 'Sua sessão está banida.' });
    }

    const suggestionIndex = db.suggestions.findIndex(s => s.id === id);
    if (suggestionIndex === -1) {
      return res.status(404).json({ error: 'Sugestão não encontrada.' });
    }

    const suggestion = db.suggestions[suggestionIndex];
    if (suggestion.status !== 'pending') {
      return res.status(400).json({ error: 'Sugestão já foi aprovada ou rejeitada.' });
    }

    if (!suggestion.upvotes) {
      suggestion.upvotes = [];
    }

    if (suggestion.upvotes.includes(sessionId)) {
      return res.status(400).json({ error: 'Você já aprovou esta sugestão.' });
    }

    // Add vote
    suggestion.upvotes.push(sessionId);
    suggestion.updatedAt = new Date().toISOString();

    addLog("SuggestionUpvoted", `Suggestion "${suggestion.name}" approved by user ${sessionId}. Total votes: ${suggestion.upvotes.length}/5`);

    // Rule of 5: Auto-approve when 5 upvotes are reached!
    if (suggestion.upvotes.length >= 5) {
      suggestion.status = 'approved';
      suggestion.updatedAt = new Date().toISOString();

      // Create active cruising area
      const newArea: CruisingArea = {
        id: `area-${Date.now()}`,
        name: suggestion.name,
        slug: suggestion.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: suggestion.description,
        country: suggestion.country,
        city: suggestion.city,
        geometryType: suggestion.geometryType,
        geometryJson: suggestion.geometryJson,
        status: 'approved',
        createdBy: suggestion.sessionId,
        approvedBy: 'Community (5+ approvals)',
        approvedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        activeCount: 0
      };

      db.areas.push(newArea);
      db.suggestions.splice(suggestionIndex, 1); // remove from pending suggestions list
      saveDb();

      addLog("AreaApprovedByCommunity", `Community auto-approved area "${newArea.name}" in ${newArea.city} via 5 community approvals!`);

      // Broadcast update to global map & suggestions list
      broadcastGlobal({
        type: 'map:area_approved',
        payload: { area: newArea }
      });

      broadcastGlobal({
        type: 'admin:suggestion_created', // client listener can trigger a refresh
        payload: { suggestion }
      });

      return res.json({ success: true, approved: true, area: newArea, suggestion });
    } else {
      saveDb();
      // Broadcast change in upvotes count
      broadcastGlobal({
        type: 'admin:suggestion_created',
        payload: { suggestion }
      });
      return res.json({ success: true, approved: false, suggestion });
    }
  });

  // Report an area or message
  app.post('/api/reports', (req, res) => {
    const { reportableType, reportableId, reason, details, reportedBySessionId, targetLabel } = req.body;

    if (reportedBySessionId && isBanned(reportedBySessionId)) {
      return res.status(403).json({ error: 'Banned' });
    }

    // Rate Limit Check: Max 3 reports in 1 minute
    if (reportedBySessionId && !checkRateLimit(reportedBySessionId, reportRateLimits, 3, 60000)) {
      return res.status(429).json({ error: 'Muitas denúncias enviadas. Aguarde um momento.' });
    }

    const newReport: Report = {
      id: `rep-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      reportableType,
      reportableId,
      reason: reason || 'Outro motivo',
      details: details || '',
      reportedBySessionId: reportedBySessionId || 'Anon',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      targetLabel
    };

    db.reports.push(newReport);
    saveDb();

    addLog("ReportCreated", `New report submitted on ${reportableType} (ID: ${reportableId})`);

    // Notify admin
    broadcastAdmin({
      type: 'admin:report_created',
      payload: { report: newReport }
    });

    res.json(newReport);
  });

  // --- Admin Area Control Endpoints ---

  app.get('/api/admin/suggestions', (req, res) => {
    res.json(db.suggestions);
  });

  app.get('/api/admin/reports', (req, res) => {
    res.json(db.reports);
  });

  app.get('/api/admin/logs', (req, res) => {
    res.json(db.logs);
  });

  app.get('/api/admin/sessions', (req, res) => {
    res.json(db.sessions);
  });

  // Approve a suggestion
  app.post('/api/admin/suggestions/:id/approve', (req, res) => {
    const { id } = req.params;
    const { adminNotes } = req.body;

    const suggestionIndex = db.suggestions.findIndex(s => s.id === id);
    if (suggestionIndex === -1) {
      return res.status(404).json({ error: 'Sugestão não encontrada' });
    }

    const suggestion = db.suggestions[suggestionIndex];
    suggestion.status = 'approved';
    suggestion.adminNotes = adminNotes;
    suggestion.updatedAt = new Date().toISOString();

    // Create active cruising area
    const newArea: CruisingArea = {
      id: `area-${Date.now()}`,
      name: suggestion.name,
      slug: suggestion.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: suggestion.description,
      country: suggestion.country,
      city: suggestion.city,
      geometryType: suggestion.geometryType,
      geometryJson: suggestion.geometryJson,
      status: 'approved',
      createdBy: suggestion.sessionId,
      approvedBy: 'Admin',
      approvedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activeCount: 0
    };

    db.areas.push(newArea);
    db.suggestions.splice(suggestionIndex, 1); // remove from pending suggestions
    saveDb();

    addLog("AreaApproved", `Approved area "${newArea.name}" in ${newArea.city}`);

    // Update global map
    broadcastGlobal({
      type: 'map:area_approved',
      payload: { area: newArea }
    });

    res.json({ success: true, area: newArea });
  });

  // Reject a suggestion
  app.post('/api/admin/suggestions/:id/reject', (req, res) => {
    const { id } = req.params;
    const { adminNotes } = req.body;

    const suggestion = db.suggestions.find(s => s.id === id);
    if (!suggestion) {
      return res.status(404).json({ error: 'Sugestão não encontrada' });
    }

    suggestion.status = 'rejected';
    suggestion.adminNotes = adminNotes;
    suggestion.updatedAt = new Date().toISOString();
    saveDb();

    addLog("AreaRejected", `Rejected suggestion "${suggestion.name}"`);
    res.json({ success: true, suggestion });
  });

  // Delete an active area
  app.delete('/api/admin/areas/:id', (req, res) => {
    const { id } = req.params;
    const areaIndex = db.areas.findIndex(a => a.id === id);
    if (areaIndex === -1) {
      return res.status(404).json({ error: 'Área não encontrada' });
    }

    const removedArea = db.areas[areaIndex];
    db.areas.splice(areaIndex, 1);

    // Remove any active presences
    db.presences = db.presences.filter(p => p.areaId !== id);

    saveDb();

    addLog("AreaRemoved", `Deleted area "${removedArea.name}"`);

    // Broadcast update
    broadcastGlobal({
      type: 'map:area_removed',
      payload: { areaId: id }
    });

    res.json({ success: true });
  });

  // Ban session
  app.post('/api/admin/sessions/:sessionId/ban', (req, res) => {
    const { sessionId } = req.params;
    const { reason } = req.body;

    let session = db.sessions.find(s => s.sessionId === sessionId);
    if (!session) {
      // create ban entry even if session isn't in memory
      session = {
        sessionId,
        nickname: 'Banned User',
        isBanned: true,
        banReason: reason || 'Violação dos termos de uso.',
        createdAt: new Date().toISOString()
      };
      db.sessions.push(session);
    } else {
      session.isBanned = true;
      session.banReason = reason || 'Violação dos termos de uso.';
    }

    // Force disconnect if WS is open
    activeSockets.forEach(ws => {
      if (ws.sessionId === sessionId) {
        // Send ban alert
        ws.send(JSON.stringify({ type: 'system:banned', payload: { reason: session?.banReason } }));
        ws.close();
      }
    });

    // Remove active presence
    const activePresences = db.presences.filter(p => p.sessionId === sessionId);
    db.presences = db.presences.filter(p => p.sessionId !== sessionId);

    activePresences.forEach(p => {
      // update count
      const activeCount = db.presences.filter(pr => pr.areaId === p.areaId).length;
      broadcastGlobal({
        type: 'area:presence_left',
        payload: { areaId: p.areaId, sessionId, activeCount }
      });
    });

    saveDb();
    addLog("UserBanned", `Banned session ID ${sessionId}. Reason: ${reason}`);
    res.json({ success: true, session });
  });

  // Moderate chat message (remove message)
  app.post('/api/admin/messages/:id/remove', (req, res) => {
    const { id } = req.params;
    const message = db.messages.find(m => m.id === id);
    if (!message) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }

    message.status = 'removed';
    saveDb();

    addLog("MessageRemoved", `Removed inappropriate message by "${message.nickname}" in area ${message.areaId}`);

    // Broadcast to room
    broadcastToArea(message.areaId, {
      type: 'chat:message_deleted',
      payload: { areaId: message.areaId, messageId: id }
    });

    res.json({ success: true, message });
  });

  // Resolve a report
  app.post('/api/admin/reports/:id/resolve', (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // resolved, dismissed

    const report = db.reports.find(r => r.id === id);
    if (!report) {
      return res.status(404).json({ error: 'Denúncia não encontrada' });
    }

    report.status = status || 'resolved';
    report.updatedAt = new Date().toISOString();
    saveDb();

    addLog("ReportResolved", `Report ${id} marked as ${report.status}`);
    res.json({ success: true, report });
  });

  // Add a manual cruising area
  app.post('/api/admin/areas', (req, res) => {
    const { name, description, country, city, geometryType, geometryJson } = req.body;
    if (!name || !country || !city || !geometryJson?.center) {
      return res.status(400).json({ error: 'Missing values' });
    }

    const newArea: CruisingArea = {
      id: `area-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: description || '',
      country,
      city,
      geometryType: geometryType || 'circle',
      geometryJson,
      status: 'approved',
      createdBy: 'Admin',
      approvedBy: 'Admin',
      approvedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activeCount: 0
    };

    db.areas.push(newArea);
    saveDb();

    addLog("AreaCreated", `Admin created new cruising area "${name}" in ${city}`);

    // Broadcast update
    broadcastGlobal({
      type: 'map:area_created',
      payload: { area: newArea }
    });

    res.json(newArea);
  });

  // --- WebSocket Setup ---

  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const url = new URL(request.url || '', `http://${request.headers.host}`);
    if (url.pathname === '/gcruise-ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws: GcruiseWs, request) => {
    const url = new URL(request.url || '', `http://${request.headers.host}`);
    const sessionId = url.searchParams.get('sessionId') || '';
    const nickname = url.searchParams.get('nickname') || 'Anon';

    if (!sessionId || isBanned(sessionId)) {
      ws.send(JSON.stringify({ type: 'system:banned', payload: { reason: 'Sessão bloqueada.' } }));
      ws.close();
      return;
    }

    ws.sessionId = sessionId;
    ws.nickname = nickname;
    ws.currentAreaId = null;
    ws.isAlive = true;

    activeSockets.add(ws);

    // Keepalive pinging
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    // Message handler
    ws.on('message', (data) => {
      try {
        const payload = JSON.parse(data.toString());
        
        switch (payload.type) {
          case 'join:area': {
            const { areaId } = payload;
            if (!areaId) return;

            // Leave previous area if any
            if (ws.currentAreaId && ws.currentAreaId !== areaId) {
              handleLeaveArea(ws, ws.currentAreaId);
            }

            ws.currentAreaId = areaId;

            // Create/update active presence in DB
            const existingPresenceIndex = db.presences.findIndex(p => p.sessionId === ws.sessionId);
            const nowStr = new Date().toISOString();

            if (existingPresenceIndex !== -1) {
              db.presences[existingPresenceIndex].areaId = areaId;
              db.presences[existingPresenceIndex].lastSeenAt = nowStr;
              db.presences[existingPresenceIndex].updatedAt = nowStr;
            } else {
              const newPresence: AreaPresence = {
                id: `pres-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                areaId,
                sessionId: ws.sessionId!,
                nickname: ws.nickname!,
                lastSeenAt: nowStr,
                createdAt: nowStr,
                updatedAt: nowStr
              };
              db.presences.push(newPresence);
            }
            saveDb();

            // Calculate updated presence counts
            const activeCount = db.presences.filter(p => p.areaId === areaId).length;

            // Broadcast join to area
            broadcastToArea(areaId, {
              type: 'area:presence_joined',
              payload: {
                areaId,
                presence: db.presences.find(p => p.sessionId === ws.sessionId!)!,
                activeCount
              }
            });

            // Also broadcast a system join message
            const systemMsg: AreaMessage = {
              id: `sys-${Date.now()}`,
              areaId,
              sessionId: 'system',
              nickname: 'gCruise',
              message: `Entrou na zona. Discreção máxima ativada.`,
              type: 'system',
              status: 'visible',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            broadcastToArea(areaId, {
              type: 'chat:system_message',
              payload: { areaId, message: systemMsg }
            });

            // Broadcast active count globally for map markers
            broadcastGlobal({
              type: 'area:active_count_updated',
              payload: { areaId, activeCount }
            });

            break;
          }

          case 'leave:area': {
            if (ws.currentAreaId) {
              handleLeaveArea(ws, ws.currentAreaId);
              ws.currentAreaId = null;
            }
            break;
          }

          case 'typing': {
            const { areaId, isTyping } = payload;
            if (areaId && ws.nickname) {
              broadcastToArea(areaId, {
                type: 'chat:typing',
                payload: { areaId, nickname: ws.nickname, isTyping }
              });
            }
            break;
          }

          case 'heartbeat': {
            ws.isAlive = true;
            if (ws.currentAreaId && ws.sessionId) {
              const presence = db.presences.find(p => p.sessionId === ws.sessionId);
              if (presence) {
                presence.lastSeenAt = new Date().toISOString();
                saveDb();
              }
            }
            break;
          }
        }
      } catch (err) {
        console.error("WS Message Error:", err);
      }
    });

    ws.on('close', () => {
      activeSockets.delete(ws);
      if (ws.currentAreaId) {
        handleLeaveArea(ws, ws.currentAreaId);
      }
    });
  });

  // Helper to handle client leaving an area
  function handleLeaveArea(ws: GcruiseWs, areaId: string) {
    db.presences = db.presences.filter(p => p.sessionId !== ws.sessionId);
    saveDb();

    const activeCount = db.presences.filter(p => p.areaId === areaId).length;

    // Broadcast leave
    broadcastToArea(areaId, {
      type: 'area:presence_left',
      payload: {
        areaId,
        sessionId: ws.sessionId!,
        activeCount
      }
    });

    // Broadcast count globally
    broadcastGlobal({
      type: 'area:active_count_updated',
      payload: { areaId, activeCount }
    });
  }

  // Heartbeat ping interval to clear stale sockets (30 seconds)
  const pingInterval = setInterval(() => {
    wss.clients.forEach((ws: GcruiseWs) => {
      if (!ws.isAlive) {
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  // Expired Presence Cleaner (Simulates php artisan gcruise:clear-expired-presences scheduler)
  // Clears any presence record that hasn't sent heartbeat in 5 minutes
  const presenceCleanerInterval = setInterval(() => {
    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;
    
    const expiredPresences = db.presences.filter(p => {
      const lastSeen = new Date(p.lastSeenAt).getTime();
      return lastSeen < fiveMinutesAgo;
    });

    if (expiredPresences.length > 0) {
      expiredPresences.forEach(presence => {
        // Remove from DB
        db.presences = db.presences.filter(p => p.id !== presence.id);
        
        // Calculate updated active count for this area
        const activeCount = db.presences.filter(p => p.areaId === presence.areaId).length;

        // Broadcast presence left
        broadcastToArea(presence.areaId, {
          type: 'area:presence_left',
          payload: {
            areaId: presence.areaId,
            sessionId: presence.sessionId,
            activeCount
          }
        });

        // Broadcast count update globally for the map
        broadcastGlobal({
          type: 'area:active_count_updated',
          payload: { areaId: presence.areaId, activeCount }
        });

        addLog("PresenceExpired", `Session ${presence.nickname} presence expired automatically in area ${presence.areaId}`);
      });
      saveDb();
    }
  }, 15000); // Check every 15 seconds for snappiness!

  // Cleanup serverside timers on process exit
  process.on('SIGTERM', () => {
    clearInterval(pingInterval);
    clearInterval(presenceCleanerInterval);
  });

  // --- Vite Integration ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Launch Server
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`gCruise full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
