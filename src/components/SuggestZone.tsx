import React, { useState } from 'react';

interface SuggestZoneProps {
  onCancel: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    country: string;
    city: string;
    center: [number, number];
    radius: number;
  }) => Promise<boolean>;
  selectedCoords: [number, number] | null;
  onClearCoords?: () => void;
  radius?: number;
  onChangeRadius?: (radius: number) => void;
}

export default function SuggestZone({
  onCancel,
  onSubmit,
  selectedCoords,
  onClearCoords,
  radius: propRadius,
  onChangeRadius,
}: SuggestZoneProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('Portugal');
  const [city, setCity] = useState('');
  const [localRadius, setLocalRadius] = useState(150); // Default 150m radius fallback
  const radius = propRadius !== undefined ? propRadius : localRadius;
  const setRadius = onChangeRadius ? onChangeRadius : setLocalRadius;
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Nome da zona é obrigatório.');
      return;
    }
    if (!city.trim()) {
      setError('Cidade é obrigatória.');
      return;
    }
    if (!description.trim()) {
      setError('Uma breve descrição é obrigatória para orientar outros utilizadores.');
      return;
    }
    if (!selectedCoords) {
      setError('Por favor, toque no mapa ao lado para selecionar a localização da zona.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSubmit({
        name: name.trim(),
        description: description.trim(),
        country: country.trim(),
        city: city.trim(),
        center: selectedCoords,
        radius,
      });

      if (success) {
        setIsSuccess(true);
      } else {
        setError('Erro ao enviar sugestão. Pode ter atingido o limite temporário de envios.');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao processar sugestão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-slate-900 border-r border-slate-800 animate-fade-in" id="suggest-success-panel">
        <div className="w-12 h-12 rounded-full bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-100">Sugestão Publicada!</h3>
        <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
          Obrigado pela sua contribuição à comunidade gCruise! A sua sugestão está disponível para votação pública pela comunidade e aparecerá automaticamente no mapa ao atingir 5 aprovações de utilizadores.
        </p>
        <button
          onClick={onCancel}
          className="mt-6 w-full max-w-xs bg-[#141414] hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-200 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
          id="btn-back-from-success"
        >
          Voltar ao Mapa
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800" id="suggest-zone-panel">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center space-x-3">
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Voltar"
          id="btn-cancel-suggest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-indigo-400">
            Contribuir
          </span>
          <h3 className="text-sm font-semibold text-slate-100">Sugerir Nova Zona</h3>
        </div>
      </div>

      {/* Content Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900 text-rose-300 text-xs leading-relaxed">
            {error}
          </div>
        )}



        {/* Inputs */}
        <div className="space-y-3 font-sans text-xs">
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Nome da Zona (ex: Parque de Monsanto - Trilho Leste)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Atribua um nome claro e discreto"
              maxLength={50}
              className="w-full bg-[#141414] text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              id="suggest-name-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Cidade
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Lisboa"
                maxLength={30}
                className="w-full bg-[#141414] text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                id="suggest-city-input"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                País
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#141414] text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                id="suggest-country-input"
              >
                <option value="Portugal">Portugal</option>
                <option value="Brasil">Brasil</option>
                <option value="Espanha">Espanha</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Raio de Abrangência Estimado
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="flex-1 accent-indigo-500 bg-[#141414] h-1 rounded"
              />
              <span className="font-mono text-slate-300 w-12 text-right">{radius}m</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Descrição Discreta & Dicas de Acesso
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Como aceder? Qual o melhor horário? Há vegetação protetora? Ajude a manter o local limpo e seguro."
              rows={4}
              maxLength={400}
              className="w-full bg-[#141414] text-slate-100 p-3 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-600 leading-relaxed"
              id="suggest-desc-input"
            />
            <span className="block text-[10px] text-slate-500 font-mono mt-1 text-right">
              {description.length}/400 carateres
            </span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl active:scale-[0.98] transition shadow-lg shadow-indigo-950/20 disabled:opacity-40 cursor-pointer"
            id="suggest-submit-btn"
          >
            {isSubmitting ? 'A Enviar Sugestão...' : 'Submeter Sugestão'}
          </button>
        </div>
      </form>
    </div>
  );
}
