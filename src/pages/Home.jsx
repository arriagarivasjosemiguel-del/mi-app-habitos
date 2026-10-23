import { useState } from 'react';
import { Bell, CheckCircle2, Circle, MoreVertical, Trash2, LogIn, CheckSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HabitForm } from '../components/HabitForm';
import { TaskForm } from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { user, habits, tasks, toggleHabit, deleteHabit, loginWithGoogle } = useApp();
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const sortedHabits = [...habits].sort((a, b) => Number(a.completed) - Number(b.completed));
  const completedCount = habits.filter(h => h.completed).length;
  const progress = habits.length === 0 ? 0 : (completedCount / habits.length) * 100;

  // Tareas de hoy (comparando fecha actual con la fecha límite de la tarea)
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === todayStr || !t.date);

  return (
    <div className="relative min-h-full animate-slide-up pb-32">
      <header className="sticky top-0 z-40 bg-bgDark/90 backdrop-blur-md px-6 py-4 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Hoy</h1>
          <p className="text-textMuted text-xs mt-0.5">Pequeños hábitos, grandes resultados.</p>
        </div>
        <button onClick={() => setShowNotifications(true)} className="relative p-2 bg-cardDark rounded-full border border-gray-700">
          <Bell size={20} className="text-white" />
          {habits.some(h => !h.completed) && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>}
        </button>
      </header>

      <div className="p-6">
        {!user && (
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">Inicia sesión con Google</p>
              <p className="text-textMuted text-xs">Para guardar tu progreso.</p>
            </div>
            <button onClick={loginWithGoogle} className="bg-accent p-2 rounded-xl text-white"><LogIn size={18} /></button>
          </div>
        )}

        <div onClick={() => navigate('/viajes')} className="relative rounded-2xl overflow-hidden mb-6 h-40 flex flex-col justify-end p-5 border border-gray-800 shadow-lg cursor-pointer transform transition hover:scale-[1.02]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="relative z-10">
            <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block uppercase tracking-wider">Recomendado</span>
            <h2 className="text-xl font-bold leading-tight mb-2 text-white">Construye la mejor<br/>versión de ti</h2>
            <button className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full">Ver viajes →</button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-bold text-lg text-white">Hábitos de Hoy</h3>
            <span className="text-sm text-textMuted font-medium">{completedCount}/{habits.length}</span>
          </div>
          <div className="w-full bg-cardDark h-2.5 rounded-full overflow-hidden border border-gray-800">
            <div className="bg-accent h-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <AnimatePresence>
            {sortedHabits.map((habit) => (
              <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key={habit.id} className="bg-cardDark p-4 rounded-2xl flex items-center justify-between border border-gray-800 relative z-10 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${habit.color || 'bg-accent'} rounded-xl flex items-center justify-center`}><CheckCircle2 size={20} className="text-white" /></div>
                  <div>
                    <h4 className={`font-semibold text-white ${habit.completed ? 'line-through text-textMuted' : ''}`}>{habit.title}</h4>
                    <p className="text-xs text-textMuted">{habit.description} • {habit.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleHabit(habit.id, habit.completed)}>
                    {habit.completed ? <CheckCircle2 size={24} className="text-accent" /> : <Circle size={24} className="text-gray-600" />}
                  </button>
                  <button onClick={() => setMenuOpen(menuOpen === habit.id ? null : habit.id)}><MoreVertical size={20} className="text-gray-500" /></button>
                </div>
                {menuOpen === habit.id && (
                  <div className="absolute right-4 top-14 bg-gray-800 rounded-lg shadow-xl z-20 border border-gray-700">
                    <button onClick={() => { deleteHabit(habit.id); setMenuOpen(null); }} className="flex items-center gap-2 px-4 py-2 text-red-400 text-sm hover:bg-gray-700 rounded-lg"><Trash2 size={14} /> Eliminar</button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Separador de Tareas */}
        {todayTasks.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px bg-gray-700 flex-1"></div>
              <span className="text-xs text-textMuted font-bold uppercase tracking-widest">Tareas de Hoy</span>
              <div className="h-px bg-gray-700 flex-1"></div>
            </div>
            <div className="space-y-3">
              {todayTasks.map(task => (
                <div key={task.id} className="bg-cardDark p-4 rounded-2xl flex items-center gap-4 border border-gray-800">
                  <CheckSquare size={20} className={task.completed ? "text-[#FF9800]" : "text-gray-500"} />
                  <div>
                    <h4 className={`font-semibold text-sm text-white ${task.completed ? 'line-through text-textMuted' : ''}`}>{task.title}</h4>
                    <p className="text-[10px] text-[#FF9800]">{task.priority} • {task.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="fixed bottom-20 left-0 w-full flex flex-col items-center gap-2 z-40 pointer-events-none px-6">
        <button onClick={() => setShowTaskForm(true)} className="w-full max-w-sm py-2.5 bg-[#FF9800] text-white rounded-xl font-bold shadow-lg shadow-[#FF9800]/30 pointer-events-auto hover:bg-[#F57C00] transition-colors flex justify-center items-center gap-2">
          <CheckSquare size={18} /> Agregar Tarea
        </button>
        <button onClick={() => setShowHabitForm(true)} className="w-full max-w-sm py-3 bg-accent text-white rounded-xl font-bold shadow-lg shadow-accent/30 pointer-events-auto hover:bg-accentHover transition-colors">
          + Agregar Hábito
        </button>
      </div>

      {showHabitForm && <HabitForm onClose={() => setShowHabitForm(false)} />}
      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
    </div>
  );
};