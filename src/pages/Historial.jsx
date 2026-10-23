import { Flame, CheckCircle, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';

export const Historial = () => {
  const { habits } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const total = habits.length;
  const completed = habits.filter(h => h.completed).length;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
  const streak = completed > 0 ? 1 : 0; 

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  // Ajustar para que la semana empiece en Lunes (0 = Lunes, 6 = Domingo)
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const today = new Date().getDate();

  return (
    <div className="p-6 pb-24 animate-in fade-in duration-500">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">Historial</h1>
        <p className="text-textMuted text-sm mt-1">Tu progreso, en números.</p>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-accent p-3 rounded-2xl flex flex-col items-start justify-between h-28">
          <Flame size={20} className="text-white/80" />
          <div>
            <p className="text-xs text-white/80 font-semibold mb-1">Racha actual</p>
            <p className="text-3xl font-bold leading-none text-white">{streak} <span className="text-sm font-normal">días</span></p>
          </div>
        </div>
        <div className="bg-[#FF3B5C] p-3 rounded-2xl flex flex-col items-start justify-between h-28">
          <CheckCircle size={20} className="text-white/80" />
          <div>
            <p className="text-xs text-white/80 font-semibold mb-1">Completados</p>
            <p className="text-3xl font-bold leading-none text-white">{completed} <span className="text-sm font-normal">hoy</span></p>
          </div>
        </div>
        <div className="bg-[#FFC107] p-3 rounded-2xl flex flex-col items-start justify-between h-28 text-black">
          <Target size={20} className="text-black/60" />
          <div>
            <p className="text-xs text-black/60 font-semibold mb-1">Éxito hoy</p>
            <p className="text-3xl font-bold leading-none">{rate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-cardDark p-4 rounded-2xl border border-gray-800 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-textMuted mb-2">
          <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8 w-8"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === today && currentMonth.getMonth() === new Date().getMonth();
            return (
              <div key={day} className={`py-1.5 rounded-full flex justify-center items-center h-8 w-8 mx-auto ${isToday ? 'bg-accent font-bold text-white' : 'text-gray-300'}`}>
                {day}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-cardDark p-4 rounded-2xl border border-gray-800">
        <h3 className="font-bold mb-4 text-white">Resumen del día</h3>
        <div className="flex justify-between text-sm mb-2 text-gray-300">
          <span>Hábitos completados hoy</span>
          <span className="font-bold text-white">{completed} de {total || 1}</span>
        </div>
        <div className="w-full bg-bgDark h-3 rounded-full overflow-hidden">
          <div className="bg-accent h-full rounded-full transition-all duration-500" style={{ width: `${rate}%` }}></div>
        </div>
      </div>
    </div>
  );
};