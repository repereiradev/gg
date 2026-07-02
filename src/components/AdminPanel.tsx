import React, { useState } from 'react';
import { AreaSuggestion, Report, SystemLog, SessionInfo } from '../types';

const Check = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const ShieldAlert = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
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

const MessageSquare = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const Ban = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

interface AdminPanelProps {
  suggestions: AreaSuggestion[];
  reports: Report[];
  logs: SystemLog[];
  sessions: SessionInfo[];
  onApproveSuggestion: (id: string, notes: string) => void;
  onRejectSuggestion: (id: string, notes: string) => void;
  onResolveReport: (id: string, action: 'resolved' | 'dismissed') => void;
  onBanSession: (sessionId: string, reason: string) => void;
  onRemoveMessage: (messageId: string) => void;
  onClose: () => void;
}

export default function AdminPanel({
  suggestions,
  reports,
  logs,
  sessions,
  onApproveSuggestion,
  onRejectSuggestion,
  onResolveReport,
  onBanSession,
  onRemoveMessage,
  onClose,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'reports' | 'sessions' | 'logs'>('suggestions');
  const [adminNotes, setAdminNotes] = useState<{ [key: string]: string }>({});
  const [banReason, setBanReason] = useState<{ [key: string]: string }>({});

  const handleApprove = (id: string) => {
    onApproveSuggestion(id, adminNotes[id] || '');
  };

  const handleReject = (id: string) => {
    onRejectSuggestion(id, adminNotes[id] || '');
  };

  const handleBan = (sessionId: string) => {
    const reason = banReason[sessionId] || 'Comportamento inadequado no chat.';
    if (confirm(`Tem certeza de que deseja banir permanentemente esta sessão?`)) {
      onBanSession(sessionId, reason);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800" id="admin-panel">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-indigo-400" />
          <div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-indigo-400">
              Painel de Administração
            </span>
            <h3 className="text-sm font-semibold text-slate-100">Painel Moderador</h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="bg-slate-800 hover:bg-indigo-600 border border-transparent hover:border-indigo-500 text-slate-200 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
          id="btn-close-admin"
        >
          Sair do Admin
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#141414] border-b border-slate-800 px-2 py-1.5 space-x-1">
        <button
          onClick={() => setActiveTab('suggestions')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition cursor-pointer ${
            activeTab === 'suggestions' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          id="tab-admin-suggestions"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Sugestões ({suggestions.filter(s => s.status === 'pending').length})
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition cursor-pointer ${
            activeTab === 'reports' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          id="tab-admin-reports"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Denúncias ({reports.filter(r => r.status === 'pending').length})
        </button>

        <button
          onClick={() => setActiveTab('sessions')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition cursor-pointer ${
            activeTab === 'sessions' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          id="tab-admin-sessions"
        >
          <Users className="w-3.5 h-3.5" />
          Contas ({sessions.length})
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition cursor-pointer ${
            activeTab === 'logs' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          id="tab-admin-logs"
        >
          <FileText className="w-3.5 h-3.5" />
          Logs ({logs.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB SUGGESTIONS */}
        {activeTab === 'suggestions' && (
          <div className="space-y-4" id="admin-suggestions-view">
            {suggestions.filter(s => s.status === 'pending').length === 0 ? (
              <div className="text-center p-8 text-slate-500 text-xs italic">
                Nenhuma sugestão pendente para análise.
              </div>
            ) : (
              suggestions.filter(s => s.status === 'pending').map((sug) => (
                <div key={sug.id} className="bg-[#141414] border border-slate-800 rounded-xl p-3.5 space-y-3 font-sans">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-100">{sug.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sug.city}, {sug.country}</p>
                    <p className="text-xs text-slate-300 mt-2 bg-slate-900 p-2.5 rounded border border-slate-800/80 leading-relaxed italic">
                      "{sug.description}"
                    </p>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono bg-slate-900 p-1.5 rounded border border-slate-800 flex justify-between">
                    <span>Coordenadas de Entrada:</span>
                    <span className="text-indigo-400 font-sans font-medium">{sug.geometryJson.center[0].toFixed(5)}, {sug.geometryJson.center[1].toFixed(5)}</span>
                  </div>

                  {/* Admin notes input */}
                  <div>
                    <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                      Notas do Moderador
                    </label>
                    <input
                      type="text"
                      value={adminNotes[sug.id] || ''}
                      onChange={(e) => setAdminNotes({ ...adminNotes, [sug.id]: e.target.value })}
                      placeholder="Ex: Área validada, boa vegetação"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Quick decisions */}
                  <div className="flex space-x-2 pt-1.5">
                    <button
                      onClick={() => handleReject(sug.id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-rose-950/30 hover:bg-rose-950/50 text-rose-300 hover:text-rose-200 border border-rose-900 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      Rejeitar
                    </button>
                    <button
                      onClick={() => handleApprove(sug.id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-xs font-medium transition shadow-lg shadow-indigo-950/20 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Aprovar Zona
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-4" id="admin-reports-view">
            {reports.filter(r => r.status === 'pending').length === 0 ? (
              <div className="text-center p-8 text-slate-500 text-xs italic">
                Nenhuma denúncia pendente para moderação.
              </div>
            ) : (
              reports.filter(r => r.status === 'pending').map((rep) => (
                <div key={rep.id} className="bg-[#141414] border border-slate-800 rounded-xl p-3.5 space-y-3 font-sans">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="bg-rose-950/30 text-rose-400 border border-rose-900/60 text-[9px] px-2 py-0.5 rounded uppercase font-mono font-semibold">
                        Denúncia: {rep.reportableType}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1.5">
                        Criada em: {new Date(rep.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                      Item Alvo / Contexto
                    </span>
                    <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-xs text-slate-300 italic">
                      {rep.targetLabel || `Item ID: ${rep.reportableId}`}
                    </div>
                  </div>

                  <div className="space-y-1 bg-slate-900 p-2.5 rounded border border-slate-800/60">
                    <span className="block text-[9px] font-mono text-slate-400">MOTIVO:</span>
                    <p className="text-xs font-medium text-slate-200">{rep.reason}</p>
                    {rep.details && (
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        "{rep.details}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-1.5">
                    <button
                      onClick={() => onResolveReport(rep.id, 'dismissed')}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer"
                    >
                      Descartar / Ignorar
                    </button>
                    <button
                      onClick={() => {
                        // Resolve report
                        onResolveReport(rep.id, 'resolved');
                        // If it's a message, automatically moderate it
                        if (rep.reportableType === 'message') {
                          onRemoveMessage(rep.reportableId);
                        } else if (rep.reportableType === 'user') {
                          onBanSession(rep.reportableId, 'Denunciado no chat por má conduta.');
                        }
                      }}
                      className="flex-1 bg-rose-600 hover:bg-rose-500 text-white px-3 py-2 rounded-lg text-xs font-medium transition shadow-lg shadow-rose-950/20 cursor-pointer"
                    >
                      Aplicar Punição
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB SESSIONS / BAN LIST */}
        {activeTab === 'sessions' && (
          <div className="space-y-3" id="admin-sessions-view">
            {sessions.map((sess) => (
              <div key={sess.sessionId} className="bg-[#141414] border border-slate-800 rounded-xl p-3 flex flex-col justify-between space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                      {sess.nickname}
                      {sess.isBanned && (
                        <span className="bg-rose-950/40 text-rose-400 border border-rose-900/60 text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold">
                          BANIDO
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[200px] font-mono">
                      ID: {sess.sessionId}
                    </p>
                  </div>
                </div>

                {!sess.isBanned ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Motivo do Ban (Ex: Spam)"
                        value={banReason[sess.sessionId] || ''}
                        onChange={(e) => setBanReason({ ...banReason, [sess.sessionId]: e.target.value })}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleBan(sess.sessionId)}
                        className="bg-rose-950/30 hover:bg-rose-950/50 text-rose-300 border border-rose-900/60 p-2 rounded-lg transition flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        Banir
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-rose-400 italic bg-rose-950/10 p-2 rounded border border-rose-900/40">
                    Banido por: "{sess.banReason}"
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB REALTIME ACTIVITY LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-2" id="admin-logs-view">
            <div className="bg-[#050505] rounded-xl p-3.5 border border-slate-800 font-mono text-[10px] text-emerald-400 overflow-y-auto max-h-[450px] space-y-2">
              <div className="text-slate-500 italic mb-2">// Registro de eventos em tempo real</div>
              {logs.length === 0 ? (
                <div className="text-slate-600 italic">Nenhum log registrado ainda.</div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="border-b border-slate-900/80 pb-1.5">
                    <div className="flex justify-between text-slate-500">
                      <span>[{log.action.toUpperCase()}]</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-slate-300 mt-0.5 font-sans leading-relaxed">{log.details}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
