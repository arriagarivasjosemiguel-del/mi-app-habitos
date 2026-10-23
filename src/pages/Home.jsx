import { useState } from 'react';
import { Bell, CheckCircle2, Circle, MoreVertical, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HabitForm } from '../components/HabitForm';

export const Home = () => {
  const { user, habits, toggleHabit, deleteHabit } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const completedCount = habits.filter(h => h.completed).length;
  const progress = habits.length === 0 ? 0 : (completedCount / habits.length) * 100;

  if (!user) return <div className="p-6 text-center mt-20 text-textMuted">Inicia sesión en "Mío" para empezar.</div>;

  return (
    <div className="p-6 relative min-h-full">
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

      <div className="relative rounded-2xl overflow-hidden mb-6 h-44 flex flex-col justify-end p-4 border border-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="relative z-10">
          <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-wider">Recomendado</span>
          <h2 className="text-xl font-bold leading-tight mb-2 text-white">Construye la mejor<br/>versión de ti</h2>
          <button className="bg-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full">Ver viajes →</button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-bold text-lg text-white">Hábitos de Hoy</h3>
          <span className="text-sm text-textMuted">{completedCount}/{habits.length}</span>
        </div>
        <div className="w-full bg-cardDark h-2 rounded-full overflow-hidden border border-gray-800">
          <div className="bg-accent h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="space-y-3 pb-24">
        <AnimatePresence>
          {habits.map((habit) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={habit.id} 
              className="bg-cardDark p-4 rounded-2xl flex items-center justify-between border border-gray-800 relative z-10"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${habit.color || 'bg-accent'} rounded-xl flex items-center justify-center`}>
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <div>
                  <h4 className={`font-semibold text-white ${habit.completed ? 'line-through text-textMuted' : ''}`}>{habit.title}</h4>
                  <p className="text-xs text-textMuted">{habit.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button onClick={() => toggleHabit(habit.id, habit.completed)} className="p-1">
                  {habit.completed ? 
                    <CheckCircle2 size={24} className="text-accent" /> : 
                    <Circle size={24} className="text-gray-600" />
                  }
                </button>
                <button onClick={() => setMenuOpen(menuOpen === habit.id ? null : habit.id)} className="p-1 text-gray-500 hover:text-white">
                  <MoreVertical size={20} />
                </button>
              </div>

              {menuOpen === habit.id && (
                <div className="absolute right-4 top-14 bg-gray-800 rounded-lg shadow-xl z-20 border border-gray-700">
                  <button onClick={() => { deleteHabit(habit.id); setMenuOpen(null); }} className="flex items-center gap-2 px-4 py-2 text-red-400 text-sm w-full text-left hover:bg-gray-700 rounded-lg">
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button onClick={() => setShowForm(true)} className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm py-3 bg-accent text-white rounded-xl font-bold shadow-lg shadow-accent/30 z-40">
        + Agregar Hábito
      </button>

      {showForm && <HabitForm onClose={() => setShowForm(false)} />}
    </div>
  );
};