import { useState } from 'react';
import { X, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const COLORS = [
  { name: 'Azul', value: 'bg-blue-500' }, { name: 'Verde', value: 'bg-green-500' },
  { name: 'Morado', value: 'bg-purple-500' }, { name: 'Naranja', value: 'bg-orange-500' },
  { name: 'Rojo', value: 'bg-red-500' }, { name: 'Amarillo', value: 'bg-yellow-500' },
];

export const HabitForm = ({ onClose }) => {
  const { addHabit } = useApp();
  const [title, setTitle] = useState('');
  const [freq, setFreq] = useState('Lunes a Domingo');
  const [time, setTime] = useState('08:00');
  const [color, setColor] = useState('bg-accent');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addHabit({ title, description: freq, time, color });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-cardDark w-full max-w-sm rounded-3xl p-6 border border-gray-700 animate-slide-up">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-white">Nuevo Hábito</h2>
          <button onClick={onClose} className="p-1.5 bg-gray-800 rounded-full text-gray-400"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-textMuted mb-1 block uppercase font-bold">Nombre</label>
            <input type="text" placeholder="Ej: Beber agua" className="w-full bg-bgDark text-white p-3 rounded-xl outline-none border border-gray-800 focus:border-accent" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </div>

          <div>
            <label className="text-xs text-textMuted mb-1 block uppercase font-bold">Frecuencia</label>
            <select value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full bg-bgDark text-white p-3 rounded-xl outline-none border border-gray-800 focus:border-accent appearance-none">
              <option>Lunes a Domingo</option>
              <option>Lunes a Viernes</option>
              <option>Fin de semana</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-textMuted mb-1 block uppercase font-bold">Hora</label>
            <div className="bg-bgDark border border-gray-800 rounded-xl p-3 flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bg-transparent text-white outline-none w-full text-sm" />
            </div>
          </div>

          <div>
            <label className="text-xs text-textMuted mb-2 block uppercase font-bold">Color</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button key={c.name} type="button" onClick={() => setColor(c.value)} className={`w-8 h-8 rounded-full ${c.value} flex items-center justify-center ${color === c.value ? 'ring-2 ring-white' : ''}`} />
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-accent text-white font-bold py-3 rounded-xl mt-2">Guardar Hábito</button>
        </form>
      </div>
    </div>
  );
};