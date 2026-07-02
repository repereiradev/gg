import React, { useState } from 'react';
import { CruisingArea, SessionInfo, AreaPresence } from '../types';

interface ZoneDetailsProps {
  area: CruisingArea;
  session: SessionInfo;
  presences: AreaPresence[];
  isActiveHere: boolean;
  onJoinArea: (areaId: string) => void;
  onLeaveArea: (areaId: string) => void;
  onOpenChat: () => void;
  onReportArea: (area: CruisingArea, reason: string, details: string) => void;
  onDeselect: () => void;
}

export default function ZoneDetails({
  area,
  session,
  presences,
  isActiveHere,
  onJoinArea,
  onLeaveArea,
  onOpenChat,
  onReportArea,
  onDeselect,
}: ZoneDetailsProps) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Informações falsas');
  const [reportDetails, setReportDetails] = useState('');

  const activePresences = presences.filter(p => p.areaId === area.id);

  const handlePresenceToggle = () => {
    if (isActiveHere) {
      onLeaveArea(area.id);
    } else {
      onJoinArea(area.id);
    }
  };

  const submitReport = (e: React.FormEvent) => {
    e.preventDefault();
    onReportArea(area, reportReason, reportDetails);
    setReportModalOpen(false);
    setReportDetails('');
    alert('Zona denunciada com sucesso. Agradecemos por ajudar a manter o gCruise seguro.');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800" id="zone-details-panel">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center space-x-3">
        <button
          onClick={onDeselect}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Voltar ao mapa"
          id="btn-back-to-map"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-indigo-400">
            Zona de Cruising
          </span>
          <h3 className="text-sm font-semibold text-slate-100">{area.city} • {area.country}</h3>
        </div>
      </div>

      {/* Main details body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Title & Description */}
        <div className="space-y-1.5 font-sans">
          <h2 className="text-base font-bold text-slate-100 tracking-tight leading-tight">
            {area.name}
          </h2>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-indigo-400">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{area.city}, {area.country}</span>
          </div>
          <p className="text-xs text-slate-300 mt-3 leading-relaxed bg-[#141414] p-3 rounded-xl border border-slate-850 italic">
            "{area.description}"
          </p>
        </div>

        {/* Presence Counter Card */}
        <div className="bg-[#141414] border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${area.activeCount > 0 ? 'bg-indigo-500 animate-pulse' : 'bg-slate-600'}`} />
              <span className="text-xs font-semibold text-slate-200">Presença de Cruisers</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Contagem agregada discreta</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-slate-100 tracking-tight font-sans">
              {area.activeCount}
            </span>
            <span className="block text-[10px] font-mono text-slate-500">
              {area.activeCount === 1 ? 'pessoa na zona' : 'pessoas na zona'}
            </span>
          </div>
        </div>

        {/* Automatic Presence Status Panel */}
        <div className="space-y-2">
          {isActiveHere ? (
            <div className="bg-emerald-950/25 border border-emerald-900/40 text-emerald-400 p-3.5 rounded-xl flex items-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div>
                <p className="font-semibold text-slate-200 text-xs">Presença Ativa (Automática)</p>
                <p className="text-[10px] text-emerald-500/80 mt-0.5 font-mono">⚡ Detetado no local via GPS / Simulação</p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/55 border border-slate-800 text-slate-400 p-3.5 rounded-xl flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-slate-600 shrink-0" />
              <div>
                <p className="font-semibold text-slate-300 text-xs">Presença Inativa</p>
                <p className="text-[10px] text-slate-500 mt-0.5 font-mono">📍 Aproxime-se do local ou clique no mapa para simular presença</p>
              </div>
            </div>
          )}

          <button
            onClick={onOpenChat}
            className="w-full flex items-center justify-center gap-2 bg-[#141414] hover:bg-[#1a1a1a] text-slate-200 hover:text-white font-semibold py-3 px-4 rounded-xl transition border border-slate-800 cursor-pointer"
            id="btn-open-chat-room"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-400">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Entrar no Chat da Zona
          </button>
        </div>

        {/* Privacy Terms disclaimer */}
        <div className="p-3.5 bg-[#141414]/50 rounded-xl border border-slate-800/80 text-[10px] text-slate-500 space-y-1.5 leading-relaxed">
          <h5 className="font-semibold text-slate-400 uppercase tracking-wide">Regras de Privacidade do gCruise</h5>
          <p>
            1. As coordenadas individuais nunca são transmitidas para outros utilizadores.
          </p>
          <p>
            2. A presença é apenas associada genericamente à zona.
          </p>
          <p>
            3. A presença expira automaticamente ao fechar o chat/app ou após 5 minutos de inatividade total.
          </p>
        </div>

        {/* Report Button */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={() => setReportModalOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 text-[10px] text-slate-500 hover:text-rose-400 font-mono tracking-widest uppercase py-2 bg-transparent hover:bg-rose-950/10 rounded-lg border border-transparent hover:border-rose-900/40 transition-all cursor-pointer"
            id="btn-trigger-report-area"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            DENUNCIAR LOCAL OU CONTEÚDO IMPRÓPRIO
          </button>
        </div>
      </div>

      {/* Sticky Bottom Action Button for Mobile Chat */}
      <div className="md:hidden p-4 bg-slate-950 border-t border-slate-800/80 sticky bottom-0 left-0 right-0 z-20 flex flex-col shadow-[0_-8px_20px_rgba(0,0,0,0.5)]">
        <button
          onClick={onOpenChat}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition-all cursor-pointer text-xs uppercase tracking-wider"
          id="btn-open-chat-room-mobile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Entrar no Chat da Zona
        </button>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="bg-[#0a0a0a] border border-slate-800 rounded-2xl shadow-2xl p-5 w-full max-w-sm animate-fade-in font-sans">
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-rose-500">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Denunciar Zona de Cruising
            </h4>

            <form onSubmit={submitReport} className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Motivo da Denúncia
                </label>
                <select 
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full bg-[#141414] border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Informações falsas ou inexatas">Informações falsas ou inexatas</option>
                  <option value="Localização de alto risco ou perigosa">Localização de alto risco ou perigosa</option>
                  <option value="Zona privada (não autorizada)">Zona privada (não autorizada)</option>
                  <option value="Spam / Duplicado">Spam / Duplicado</option>
                  <option value="Atividade ilegal no local">Atividade ilegal no local</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Detalhes Importantes para Moderação
                </label>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  rows={3}
                  required
                  placeholder="Explique o motivo detalhadamente para que os moderadores possam agir..."
                  className="w-full bg-[#141414] border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-600 leading-relaxed"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="flex-1 bg-slate-800 text-slate-300 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 hover:bg-rose-500 text-white px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer"
                >
                  Submeter Denúncia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
