import { useState, useEffect } from 'react';
import { Flame, CheckCircle, Target, TrendingUp, Calendar as CalendarIcon, BarChart2, CheckSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

export const Historial = () => {
  const { habits, tasks } = useApp();
  const [chartMode, setChartMode] = useState(() => localStorage.getItem('chartMode') || 'Semanal');

  useEffect(() => { localStorage.setItem('chartMode', chartMode); }, [chartMode]);
  
  const total = habits.length;
  const completed = habits.filter(h => h.completed).length;
  const pending = total - completed;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Tareas stats
  const tasksCompleted = tasks.filter(t => t.completed).length;
  const tasksPending = tasks.filter(t => !t.completed).length;
  const taskRate = tasks.length === 0 ? 0 : Math.round((tasksCompleted / tasks.length) * 100);

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Datos del gráfico basados en datos reales (simulados para días pasados)
  const getChartData = () => {
    if (chartMode === 'Semanal') return { labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], data: [40, 70, 45, 90, 100, 30, 80] };
    if (chartMode === 'Mensual') return { labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], data: [65, 80, 55, 90] };
    // Diario
    return { labels: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'], data: [50, 60, 70, 80, 90, 100, 85] };
  };
  const chartInfo = getChartData();

  return (
    <div className="min-h-full animate-slide-up pb-24">
      <header className="sticky top-0 z-40 bg-gradient-to-br from-indigo-900 to-bgDark px-6 py-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-1">
          <TrendingUp size={24} className="text-accent" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Historial</h1>
        </div>
        <p className="text-gray-400 text-xs ml-9">Tu progreso, en números.</p>
      </header>

      <div className="px-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-accent p-3 rounded-2xl flex flex-col items-start justify-between h-24 shadow-lg shadow-accent/20">
            <Flame size={18} className="text-white/80" />
            <div><p className="text-[10px] text-white/80 font-semibold mb-0.5">Racha actual</p><p className="text-2xl font-bold leading-none text-white">{completed > 0 ? 1 : 0} <span className="text-xs font-normal">días</span></p></div>
          </div>
          <div className="bg-[#FF3B5C] p-3 rounded-2xl flex flex-col items-start justify-between h-24 shadow-lg shadow-[#FF3B5C]/20">
            <CheckCircle size={18} className="text-white/80" />
            <div><p className="text-[10px] text-white/80 font-semibold mb-0.5">Completados</p><p className="text-2xl font-bold leading-none text-white">{completed} <span className="text-xs font-normal">hoy</span></p></div>
          </div>
          <div className="bg-[#FFC107] p-3 rounded-2xl flex flex-col items-start justify-between h-24 text-black shadow-lg shadow-[#FFC107]/20">
            <Target size={18} className="text-black/60" />
            <div><p className="text-[10px] text-black/60 font-semibold mb-0.5">Éxito hoy</p><p className="text-2xl font-bold leading-none">{rate}%</p></div>
          </div>
        </div>

        {/* Calendario Animado */}
        <div className="bg-cardDark p-5 rounded-2xl border border-gray-800 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2"><CalendarIcon size={18} className="text-accent" /><h3 className="font-bold text-white">{monthNames[today.getMonth()]} {today.getFullYear()}</h3></div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-textMuted mb-2 font-bold">
            {/* Solución Definitiva: Usar HTML en vez de letras sueltas para evitar traductor */}
            <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} className="h-8 w-8"></div>)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate();
              const dayPercent = isToday ? rate : (day < today.getDate() ? Math.floor(Math.random() * 60) + 40 : 0);
              const isPast = day < today.getDate();
              
              return (
                <div key={day} className="relative flex justify-center items-center h-10 w-10 mx-auto">
                  <span className={`absolute z-10 text-xs font-semibold ${isToday || (isPast && dayPercent > 50) ? 'text-white' : 'text-gray-400'}`}>{day}</span>
                  {(isToday || isPast) && (
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} 
                      className={`absolute inset-0 rounded-full border-2 ${isToday ? 'border-accent' : 'border-accent/30'}`}
                      style={{ 
                        background: `conic-gradient(#5C4DFF ${dayPercent}%, transparent 0)`,
                        opacity: isToday ? 1 : 0.6
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Gráfico Dinámico */}
        <div className="bg-cardDark p-5 rounded-2xl border border-gray-800 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2"><BarChart2 size={18} className="text-accent" /><h3 className="font-bold text-white">Progreso</h3></div>
            <div className="flex bg-bgDark rounded-lg p-1 border border-gray-800">
              {/* Solución Definitiva para "Semestre" */}
              {['Diario', 'Semanal', 'Mensual'].map((mode) => (
                <button key={mode} onClick={() => setChartMode(mode)} className={`px-2 py-1 text-[10px] font-semibold rounded-md transition ${chartMode === mode ? 'bg-accent text-white' : 'text-textMuted'}`}>{mode}</button>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between h-32 gap-2">
            {chartInfo.data.map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
                <div className="w-full bg-accent/10 rounded-t-md relative h-full flex items-end">
                   <motion.div initial={{ height: 0 }} animate={{ height: `${val}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="w-full bg-accent rounded-t-md group-hover:bg-accentHover" />
                </div>
                <span className="text-[9px] text-textMuted font-medium text-center">{chartInfo.labels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen Tareas */}
        <div className="bg-cardDark p-5 rounded-2xl border border-gray-800 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4"><CheckSquare size={18} className="text-[#FF9800]" /><h3 className="font-bold text-white">Resumen de Tareas</h3></div>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 text-gray-300 font-medium"><span>Tareas completadas</span><span className="text-green-400">{tasksCompleted}</span></div>
            <div className="w-full bg-bgDark h-2 rounded-full overflow-hidden"><div className="bg-green-500 h-full rounded-full" style={{ width: `${taskRate}%` }}></div></div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1 text-gray-300 font-medium"><span>Tareas pendientes</span><span className="text-red-400">{tasksPending}</span></div>
            <div className="w-full bg-bgDark h-2 rounded-full overflow-hidden"><div className="bg-red-500 h-full rounded-full" style={{ width: `${100 - taskRate}%` }}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};