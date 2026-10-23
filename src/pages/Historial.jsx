import { useState } from 'react';
import { Flame, CheckCircle, Target, TrendingUp, Calendar as CalendarIcon, BarChart2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Historial = () => {
  const { habits } = useApp();
  const [chartMode, setChartMode] = useState('Semanal'); // Diario, Semanal, Mensual
  
  const total = habits.length;
  const completed = habits.filter(h => h.completed).length;
  const pending = total - completed;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const currentMonth = new Date();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const today = new Date().getDate();
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <div className="min-h-full animate-slide-up pb-24">
      {/* HEADER REDISEÑADO (Más pequeño) */}
      <header className="sticky top-0 z-40 bg-gradient-to-br from-indigo-900 to-bgDark px-6 py-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-1">
          <TrendingUp size={24} className="text-accent" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Historial</h1>
        </div>
        <p className="text-gray-400 text-xs ml-9">Tu progreso, en números.</p>
      </header>

      <div className="px-6">
        {/* TARJETAS DE ESTADÍSTICAS */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-accent p-3 rounded-2xl flex flex-col items-start justify-between h-24 shadow-lg shadow-accent/20">
            <Flame size={18} className="text-white/80" />
            <div>
              <p className="text-[10px] text-white/80 font-semibold mb-0.5">Racha actual</p>
              <p className="text-2xl font-bold leading-none text-white">{completed > 0 ? 1 : 0} <span className="text-xs font-normal">días</span></p>
            </div>
          </div>
          <div className="bg-[#FF3B5C] p-3 rounded-2xl flex flex-col items-start justify-between h-24 shadow-lg shadow-[#FF3B5C]/20">
            <CheckCircle size={18} className="text-white/80" />
            <div>
              <p className="text-[10px] text-white/80 font-semibold mb-0.5">Completados</p>
              <p className="text-2xl font-bold leading-none text-white">{completed} <span className="text-xs font-normal">hoy</span></p>
            </div>
          </div>
          <div className="bg-[#FFC107] p-3 rounded-2xl flex flex-col items-start justify-between h-24 text-black shadow-lg shadow-[#FFC107]/20">
            <Target size={18} className="text-black/60" />
            <div>
              <p className="text-[10px] text-black/60 font-semibold mb-0.5">Éxito hoy</p>
              <p className="text-2xl font-bold leading-none">{rate}%</p>
            </div>
          </div>
        </div>

        {/* CALENDARIO (Restaurado) */}
        <div className="bg-cardDark p-5 rounded-2xl border border-gray-800 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} className="text-accent" />
              <h3 className="font-bold text-white">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-textMuted mb-2 font-bold">
            <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8 w-8"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today;
              return (
                <div key={day} className={`py-1.5 rounded-full flex justify-center items-center h-8 w-8 mx-auto ${isToday ? 'bg-accent font-bold text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 transition'}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* GRÁFICO DE BARRAS INTERACTIVO */}
        <div className="bg-cardDark p-5 rounded-2xl border border-gray-800 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BarChart2 size={18} className="text-accent" />
              <h3 className="font-bold text-white">Progreso</h3>
            </div>
            {/* Selector de modo */}
            <div className="flex bg-bgDark rounded-lg p-1 border border-gray-800">
              {['Diario', 'Semanal', 'Mensual'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setChartMode(mode)}
                  className={`px-2 py-1 text-[10px] font-semibold rounded-md transition ${chartMode === mode ? 'bg-accent text-white' : 'text-textMuted hover:text-white'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between h-32 gap-2">
            {[40, 70, 45, 90, 100, 30, 80].map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
                <div className="w-full bg-accent/10 rounded-t-md relative h-full flex items-end">
                   <div className="w-full bg-accent rounded-t-md transition-all duration-1000 group-hover:bg-accentHover" style={{ height: `${val}%` }}></div>
                </div>
                <span className="text-[10px] text-textMuted font-medium">{['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}</span>
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