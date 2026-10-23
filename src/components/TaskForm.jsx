import { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TaskForm = ({ onClose }) => {
  const { addTask } = useApp();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Obligatorio');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, priority, date, time });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-cardDark w-full max-w-sm rounded-3xl p-6 border border-gray-700 animate-slide-up">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-white">Nueva Tarea</h2>
          <button onClick={onClose} className="p-1.5 bg-gray-800 rounded-full text-gray-400"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-textMuted mb-1 block uppercase font-bold">Nombre de la tarea</label>
            <input type="text" placeholder="Ej: Entregar proyecto" className="w-full bg-bgDark text-white p-3 rounded-xl outline-none border border-gray-800 focus:border-accent" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </div>

          <div>
            <label className="text-xs text-textMuted mb-1 block uppercase font-bold">Prioridad</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full bg-bgDark text-white p-3 rounded-xl outline-none border border-gray-800 focus:border-accent appearance-none">
              <option>Obligatorio</option>
              <option>Intermedio</option>
              <option>Baja</option>
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-bgDark border border-gray-800 rounded-xl p-3 flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent text-white outline-none w-full text-xs" />
            </div>
            <div className="flex-1 bg-bgDark border border-gray-800 rounded-xl p-3 flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bg-transparent text-white outline-none w-full text-xs" />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#FF9800] text-white font-bold py-3 rounded-xl mt-2">Guardar Tarea</button>
        </form>
      </div>
    </div>
  );
};