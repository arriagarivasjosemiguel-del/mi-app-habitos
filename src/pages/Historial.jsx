import { Flame, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Historial = () => {
  const { habits } = useApp();
  const total = habits.length;
  const completed = habits.filter(h => h.completed).length;
  const pending = total - completed;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="min-h-full animate-slide-up">
      {/* HEADER HISTORIAL PRO */}
      <header className="sticky top-0 z-40 bg-gradient-to-br from-indigo-900 to-bgDark px-6 py-8 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={28} className="text-accent" />
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Historial</h1>
        </div>
        <p className="text-gray-300 text-sm">Tu progreso, en números.</p>
      </header>

      <div className="px-6 pb-24">
        {/* TARJETAS DE ESTADÍSTICAS */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-accent p-3 rounded-2xl flex flex-col items-start justify-between h-28 shadow-lg shadow-accent/20">
            <Flame size={20} className="text-white/80" />
            <div>
              <p className="text-xs text-white/80 font-semibold mb-1">Racha actual</p>
              <p className="text-3xl font-bold leading-none text-white">{completed > 0 ? 1 : 0} <span className="text-sm font-normal">días</span></p>
            </div>
          </div>
          <div className="bg-[#FF3B5C] p-3 rounded-2xl flex flex-col items-start justify-between h-28 shadow-lg shadow-[#FF3B5C]/20">
            <CheckCircle size={20} className="text-white/80" />
            <div>
              <p className="text-xs text-white/80 font-semibold mb-1">Completados</p>
              <p className="text-3xl font-bold leading-none text-white">{completed} <span className="text-sm font-normal">hoy</span></p>
            </div>
          </div>
          <div className="bg-[#FFC107] p-3 rounded-2xl flex flex-col items-start justify-between h-28 text-black shadow-lg shadow-[#FFC107]/20">
            <Target size={20} className="text-black/60" />
            <div>
              <p className="text-xs text-black/60 font-semibold mb-1">Éxito hoy</p>
              <p className="text-3xl font-bold leading-none">{rate}%</p>
            </div>
          </div>
        </div>

        {/* GRÁFICO DE BARRAS SIMULADO */}
        <div className="bg-cardDark p-5 rounded-2xl border border-gray-800 mb-6 shadow-sm">
          <h3 className="font-bold mb-4 text-white">Progreso Semanal</h3>
          <div className="flex items-end justify-between h-32 gap-2">
            {[40, 70, 45, 90, 100, 30, 80].map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
                <div className="w-full bg-accent/20 rounded-t-md relative h-full flex items-end">
                   <div className="w-full bg-accent rounded-t-md transition-all duration-1000 group-hover:bg-accentHover" style={{ height: `${val}%` }}></div>
                </div>
                <span className="text-[10px] text-textMuted">{['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RESUMEN DE HOY */}
        <div className="bg-cardDark p-5 rounded-2xl border border-gray-800 shadow-sm mb-6">
          <h3 className="font-bold mb-4 text-white">Resumen de Hoy</h3>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 text-gray-300 font-medium">
              <span>Hábitos completados</span>
              <span className="text-green-400">{completed}</span>
            </div>
            <div className="w-full bg-bgDark h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full transition-all duration-500" style={{ width: `${rate}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 text-gray-300 font-medium">
              <span>Hábitos pendientes</span>
              <span className="text-red-400">{pending}</span>
            </div>
            <div className="w-full bg-bgDark h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${100 - rate}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};