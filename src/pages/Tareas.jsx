import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckSquare, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { TaskForm } from '../components/TaskForm';
import { motion, AnimatePresence } from 'framer-motion';

export const Tareas = () => {
  const { tasks, toggleTask, deleteTask } = useApp();
  const [showForm, setShowForm] = useState(false);

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="p-6 pb-24 animate-slide-up min-h-full">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Tareas</h1>
        <p className="text-textMuted text-sm mt-1">Gestiona tus pendientes.</p>
      </header>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex flex-col items-center">
          <span className="text-2xl font-bold text-green-400">{completedCount}</span>
          <span className="text-xs text-green-500 font-semibold mt-1">Cumplidas</span>
        </div>
        <div className="flex-1 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex flex-col items-center">
          <span className="text-2xl font-bold text-red-400">{pendingCount}</span>
          <span className="text-xs text-red-500 font-semibold mt-1">Pendientes</span>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {tasks.map(task => (
            <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} key={task.id} className="bg-cardDark p-4 rounded-2xl flex items-center justify-between border border-gray-800 relative">
              <div className="flex items-center gap-4">
                <button onClick={() => toggleTask(task.id, task.completed)}>
                   {task.completed ? <CheckCircle2 size={24} className="text-[#FF9800]" /> : <Circle size={24} className="text-gray-600" />}
                </button>
                <div>
                  <h4 className={`font-semibold text-sm text-white ${task.completed ? 'line-through text-textMuted' : ''}`}>{task.title}</h4>
                  <p className="text-[10px] text-textMuted flex gap-2">
                    <span className="text-accent">{task.priority}</span>
                    {task.date && <span>📅 {task.date}</span>}
                    {task.time && <span>⏰ {task.time}</span>}
                  </p>
                </div>
              </div>
              <button onClick={() => deleteTask(task.id)} className="text-red-500/50 hover:text-red-500 transition p-2">
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {tasks.length === 0 && <p className="text-center text-textMuted mt-10">No tienes tareas pendientes.</p>}
      </div>

      <button onClick={() => setShowForm(true)} className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm py-3 bg-[#FF9800] text-white rounded-xl font-bold shadow-lg shadow-[#FF9800]/30 flex justify-center items-center gap-2">
        <Plus size={20} /> Nueva Tarea
      </button>

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  );
};