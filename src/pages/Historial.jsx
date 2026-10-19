import { Flame, CheckCircle, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Historial = () => {
  const { habits } = useApp();
  const completed = habits.filter(h => h.completed).length;
  const total = habits.length;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Historial</h1>
        <p className="text-textMuted text-sm">Tu progreso, en números.</p>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-accent p-3 rounded-2xl flex flex-col items-start justify-between h-28">
          <Flame size={20} className="text-white/80" />
          <div>
            <p className="text-xs text-white/80 font-semibold mb-1">Racha actual</p>
            <p className="text-3xl font-bold leading-none">{completed > 0 ? 1 : 0} <span className="text-sm font-normal">días</span></p>
          </div>
        </div>
        <div className="bg-[#FF3B5C] p-3 rounded-2xl flex flex-col items-start justify-between h-28">
          <CheckCircle size={20} className="text-white/80" />
          <div>
            <p className="text-xs text-white/80 font-semibold mb-1">Completados</p>
            <p className="text-3xl font-bold leading-none">{completed} <span className="text-sm font-normal">total</span></p>
          </div>
        </div>
        <div className="bg-[#FFC107] p-3 rounded-2xl flex flex-col items-start justify-between h-28 text-black">
          <Target size={20} className="text-black/60" />
          <div>
            <p className="text-xs text-black/60 font-semibold mb-1">Tasa de éxito</p>
            <p className="text-3xl font-bold leading-none">{rate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-cardDark p-4 rounded-2xl border border-gray-800 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Octubre 2026</h3>
          <div className="flex gap-2 text-textMuted">
            <span>&lt;</span>
            <span>&gt;</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-textMuted mb-2">
          <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {Array.from({ length: 31 }).map((_, i) => (
            <div key={i} className={`py-1.5 rounded-full flex justify-center items-center h-8 w-8 mx-auto ${i === 23 ? 'bg-accent font-bold text-white' : 'text-gray-300'}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-cardDark p-4 rounded-2xl border border-gray-800">
        <h3 className="font-bold mb-4">Resumen del mes</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>Hábitos completados</span>
          <span className="font-bold">{completed} de {total || 52}</span>
        </div>
        <div className="w-full bg-bgDark h-3 rounded-full overflow-hidden">
          <div className="bg-accent h-full rounded-full transition-all duration-500" style={{ width: `${rate}%` }}></div>
        </div>
      </div>
    </div>
  );
};