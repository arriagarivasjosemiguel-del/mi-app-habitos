import { useState } from 'react';
import { Bell, CheckCircle2, Circle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

export const Home = () => {
  const { user, habits, toggleHabit, addHabit } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const completedCount = habits.filter(h => h.completed).length;
  const progress = habits.length === 0 ? 0 : (completedCount / habits.length) * 100;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addHabit(newTitle, "Hábito diario", "Target", "bg-accent");
    setNewTitle('');
    setShowAdd(false);
  };

  if (!user) return <div className="p-6 text-center mt-20 text-textMuted">Inicia sesión en la pestaña "Mío" para ver tus hábitos.</div>;

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Hoy</h1>
          <p className="text-textMuted text-sm mt-1">Pequeños hábitos, grandes resultados.</p>
        </div>
        <button className="relative p-2 bg-cardDark rounded-full border border-gray-800">
          <Bell size={20} className="text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>
      </header>

      {/* Banner Recomendado */}
      <div className="relative rounded-2xl overflow-hidden mb-6 h-44 flex flex-col justify-end p-4 border border-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="relative z-10">
          <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-wider">Recomendado para ti</span>
          <h2 className="text-xl font-bold leading-tight mb-2 text-white">Construye la mejor<br/>versión de ti</h2>
          <p className="text-xs text-gray-300 mb-3">Disciplina hoy, libertad mañana.</p>
          <button className="bg-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full">Ver ahora →</button>
        </div>
      </div>

      {/* Progreso */}
      <div className="mb-4">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-bold text-lg text-white">Hábitos de Hoy</h3>
          <span className="text-sm text-textMuted">{completedCount}/{habits.length}</span>
        </div>
        <div className="w-full bg-cardDark h-2 rounded-full overflow-hidden border border-gray-800">
          <div className="bg-accent h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Lista de Hábitos */}
      <div className="space-y-3">
        {habits.map((habit) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            key={habit.id} 
            className="bg-cardDark p-4 rounded-2xl flex items-center justify-between border border-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 bg-accent rounded-xl flex items-center justify-center`}>
                <CheckCircle2 size={20} className="text-white" />
              </div>
              <div>
                <h4 className={`font-semibold text-white ${habit.completed ? 'line-through text-textMuted' : ''}`}>{habit.title}</h4>
                <p className="text-xs text-textMuted">{habit.description}</p>
              </div>
            </div>
            <button onClick={() => toggleHabit(habit.id, habit.completed)}>
              {habit.completed ? 
                <CheckCircle2 size={24} className="text-accent" /> : 
                <Circle size={24} className="text-gray-600" />
              }
            </button>
          </motion.div>
        ))}
      </div>

      {/* Botón Crear */}
      <div className="mt-6">
        {!showAdd ? (
          <button onClick={() => setShowAdd(true)} className="w-full py-3 bg-cardDark border border-accent/50 text-accent rounded-xl font-semibold border-dashed">
            + Agregar Hábito
          </button>
        ) : (
          <form onSubmit={handleAdd} className="bg-cardDark p-4 rounded-xl border border-gray-800">
            <input 
              type="text" 
              placeholder="Ej: Beber agua" 
              className="w-full bg-bgDark text-white p-3 rounded-lg mb-3 outline-none border border-gray-800 focus:border-accent"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-accent py-2 rounded-lg font-semibold text-white">Guardar</button>
              <button type="button" onClick={() => setShowAdd(false)} className="flex-1 bg-gray-800 py-2 rounded-lg font-semibold text-white">Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};