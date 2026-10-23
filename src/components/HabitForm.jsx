import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const COLORS = [
  { name: 'Azul', value: 'bg-blue-500' },
  { name: 'Verde', value: 'bg-green-500' },
  { name: 'Morado', value: 'bg-purple-500' },
  { name: 'Naranja', value: 'bg-orange-500' },
  { name: 'Rojo', value: 'bg-red-500' },
  { name: 'Amarillo', value: 'bg-yellow-500' },
];

export const HabitForm = ({ onClose }) => {
  const { addHabit } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [color, setColor] = useState('bg-accent');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addHabit({ title, description: category, color });
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-end justify-center rounded-t-3xl">
      <div className="bg-cardDark w-full rounded-t-3xl p-6 border-t border-gray-800 animate-in slide-in-from-bottom-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Nuevo Hábito</h2>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-gray-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-textMuted mb-1 block">Nombre del hábito</label>
            <input 
              type="text" 
              placeholder="Ej: Beber 2L de agua" 
              className="w-full bg-bgDark text-white p-3 rounded-xl outline-none border border-gray-800 focus:border-accent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm text-textMuted mb-1 block">Categoría / Hora</label>
            <input 
              type="text" 
              placeholder="Ej: Mañana" 
              className="w-full bg-bgDark text-white p-3 rounded-xl outline-none border border-gray-800 focus:border-accent"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-textMuted mb-2 block">Color</label>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-8 h-8 rounded-full ${c.value} flex items-center justify-center ${color === c.value ? 'ring-2 ring-white' : ''}`}
                >
                  {color === c.value && <Check size={16} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-accent text-white font-bold py-3 rounded-xl mt-4">
            Guardar Hábito
          </button>
        </form>
      </div>
    </div>
  );
};