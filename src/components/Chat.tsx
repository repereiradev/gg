import React, { useState, useEffect, useRef } from 'react';
import { AreaMessage, SessionInfo, AreaPresence } from '../types';

interface ChatProps {
  areaId: string;
  areaName: string;
  session: SessionInfo;
  messages: AreaMessage[];
  typingUsers: string[];
  onSendMessage: (msg: string) => Promise<boolean>;
  onSendTyping: (isTyping: boolean) => void;
  onReportMessage: (message: AreaMessage, reason: string) => void;
  isAdmin: boolean;
  onRemoveMessage?: (messageId: string) => void;
  onClose: () => void;
  presences: AreaPresence[];
}

export default function Chat({
  areaId,
  areaName,
  session,
  messages,
  typingUsers,
  onSendMessage,
  onSendTyping,
  onReportMessage,
  isAdmin,
  onRemoveMessage,
  onClose,
  presences,
}: ChatProps) {
  const [inputText, setInputText] = useState('');
  const [isTypingState, setIsTypingState] = useState(false);
  const [reportModalMessage, setReportModalMessage] = useState<AreaMessage | null>(null);
  const [reportReason, setReportReason] = useState('Conteúdo impróprio');
  const [reportDetails, setReportDetails] = useState('');
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll to bottom when messages list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  // Handle typing debounce emitter
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);

    if (!isTypingState) {
      setIsTypingState(true);
      onSendTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTypingState(false);
      onSendTyping(false);
    }, 2000); // 2 seconds typing indicator timeout
  };

  // Submit message
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    setIsSending(true);
    setRateLimitError(null);
    const textToSend = inputText;
    
    // Clear typing indicators
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTypingState(false);
    onSendTyping(false);

    try {
      const success = await onSendMessage(textToSend);
      if (success) {
        setInputText('');
      } else {
        setRateLimitError('Erro ao enviar. Pode ser devido ao limite de envios.');
      }
    } catch (err: any) {
      setRateLimitError(err.message || 'Erro ao enviar mensagem.');
    } finally {
      setIsSending(false);
    }
  };

  // Handle report submission
  const submitReport = () => {
    if (!reportModalMessage) return;
    onReportMessage(reportModalMessage, `${reportReason}: ${reportDetails}`);
    setReportModalMessage(null);
    setReportDetails('');
    // Visual alert feedback
    alert('Mensagem denunciada com sucesso à equipe de moderação.');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 w-full" id="gcruise-chat-panel">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-indigo-400">
            Chat em Tempo Real
          </span>
          <h3 className="text-sm font-semibold text-slate-100 truncate max-w-[180px] sm:max-w-[240px]">
            {areaName}
          </h3>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850 border border-transparent hover:border-slate-800 transition cursor-pointer"
          title="Fechar Chat"
          id="btn-close-chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Legend sub-bar */}
      <div className="flex items-center gap-4 px-4 py-2 bg-slate-950 border-b border-slate-850 text-[10px] font-mono text-slate-400 shrink-0 select-none">
        <span className="text-[9px] uppercase font-bold text-slate-500 mr-1">Legenda:</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Na zona</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>Fora da zona</span>
        </span>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-500">
            <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold mb-2">?</span>
            <p className="text-xs">Nenhuma mensagem nesta zona ainda.</p>
            <p className="text-[10px] text-slate-600 mt-1">Seja o primeiro a enviar com total discrição.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sessionId === session.sessionId;
            const isSystem = msg.type === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="bg-slate-950/60 text-slate-400 text-[10px] px-3 py-1 rounded-full border border-slate-800/80 font-mono text-center">
                    🔒 {msg.message}
                  </div>
                </div>
              );
            }

            const isSenderActive = presences.some(p => p.sessionId === msg.sessionId && p.areaId === areaId);

            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group max-w-[85%] ${isMe ? 'ml-auto' : 'mr-auto'}`}
              >
                {/* Nickname & Timestamp */}
                <div className="flex items-center space-x-1.5 mb-1 px-1 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span 
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        isSenderActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                      }`}
                      title={isSenderActive ? 'Dentro da zona de cruising' : 'Fora da zona de cruising'}
                    />
                    <span className={`font-medium ${isMe ? 'text-amber-500/80' : 'text-slate-400'}`}>
                      {msg.nickname}
                    </span>
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Message Bubble Container */}
                <div className="flex items-center space-x-1 w-full">
                  {!isMe && (
                    <button
                      onClick={() => setReportModalMessage(msg)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-850 text-slate-500 hover:text-indigo-400 transition-opacity cursor-pointer"
                      title="Denunciar Mensagem"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </button>
                  )}

                  <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed break-words w-full ${
                    isMe 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/10' 
                      : 'bg-[#141414] border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.message}
                  </div>

                  {isAdmin && onRemoveMessage && (
                    <button
                      onClick={() => onRemoveMessage(msg.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-950 text-slate-500 hover:text-red-400 transition-opacity"
                      title="Apagar Mensagem (Moderador)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className="px-4 py-1.5 bg-slate-950/40 text-[10px] text-slate-400 font-mono italic animate-pulse">
          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'está' : 'estão'} a escrever...
        </div>
      )}

      {/* Rate limit warning */}
      {rateLimitError && (
        <div className="mx-4 mb-2 p-2 rounded bg-rose-950/50 border border-rose-900 text-[11px] text-rose-300">
          {rateLimitError}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enviar mensagem discreta..."
            maxLength={300}
            className="flex-1 bg-[#141414] text-xs text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition"
            id="chat-input-field"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className="p-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            id="chat-submit-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 px-1 text-[9px] text-slate-500 font-mono">
          <span>{inputText.length}/300 carateres</span>
          <span>Mensagens encriptadas e anónimas</span>
        </div>
      </form>

      {/* Report Modal */}
      {reportModalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl shadow-2xl p-5 w-full max-w-sm">
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-400">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Denunciar Mensagem
            </h4>
            
            <p className="text-xs text-slate-400 mb-4 bg-[#141414] p-2.5 rounded border border-slate-850 italic truncate">
              "{reportModalMessage.message}"
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Motivo da Denúncia
                </label>
                <select 
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full bg-[#141414] border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Conteúdo impróprio">Conteúdo impróprio</option>
                  <option value="Spam / Publicidade / Golpes">Spam / Publicidade / Golpes</option>
                  <option value="Falsa informação sobre a zona">Falsa informação sobre a zona</option>
                  <option value="Linguagem ofensiva ou assédio">Linguagem ofensiva ou assédio</option>
                  <option value="Comercialização / Serviços pagos">Comercialização / Serviços pagos</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Detalhes Adicionais (Opcional)
                </label>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  rows={2}
                  placeholder="Explique o problema para os moderadores..."
                  className="w-full bg-[#141414] border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-600"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReportModalMessage(null)}
                  className="flex-1 bg-slate-800 text-slate-300 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-700 hover:text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={submitReport}
                  className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-indigo-500 transition cursor-pointer"
                >
                  Enviar Denúncia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
