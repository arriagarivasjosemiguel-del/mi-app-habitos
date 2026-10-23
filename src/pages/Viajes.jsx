import { useState } from 'react';
import { Play, X, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Base de datos de viajes (agregué unos cuantos como ejemplo)
const JOURNEYS = [
  { id: 'j1', title: 'Rutina de mañana', desc: 'Empieza el día con energía y enfoque.', days: '7 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600', habits: ['Beber agua', 'Estiramiento 5 min', 'Meditar'] },
  { id: 'j2', title: 'Meditación para tranquilidad', desc: 'Calma tu mente, mejora tu enfoque.', days: '7 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600', habits: ['Meditar 10 min', 'Respirar profundo', 'Yoga suave'] },
  { id: 'j3', title: 'Despídete del azúcar', desc: 'Más energía, mejor salud.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&q=80&w=600', habits: ['No azúcar', 'Comer fruta', 'Tomar agua'] },
  { id: 'j4', title: 'Ejercicio en casa', desc: 'Mantente en forma sin ir al gimnasio.', days: '30 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600', habits: ['Flexiones', 'Sentadillas', 'Plancha'] },
];

export const Viajes = () => {
  const [myJourneys, setMyJourneys] = useState([]);
  const [selectedJourney, setSelectedJourney] = useState(null);

  const handleJoin = (journey) => {
    setMyJourneys([...myJourneys, journey.id]);
    setSelectedJourney(null);
    alert(`¡Te has unido a "${journey.title}"! Revisa la pestaña "Mis Viajes".`);
  };

  return (
    <div className="p-6 pb-24 animate-slide-up min-h-full">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Viajes</h1>
        <p className="text-textMuted text-sm mt-1">Desafíos que te llevan más lejos.</p>
      </header>

      {/* MIS VIAJES */}
      {myJourneys.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold text-xl text-white mb-4">Mis Viajes Activos</h2>
          <div className="space-y-4">
            {JOURNEYS.filter(j => myJourneys.includes(j.id)).map((c) => (
              <div key={c.id} className="bg-gradient-to-r from-accent/20 to-cardDark p-4 rounded-2xl border border-accent/30 flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <Play size={20} className="text-white" fill="white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{c.title}</h4>
                  <p className="text-xs text-accent font-semibold">En progreso...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TODOS LOS VIAJES */}
      <h2 className="font-bold text-xl text-white mb-4">Viajes Disponibles</h2>
      <div className="space-y-4">
        {JOURNEYS.filter(j => !myJourneys.includes(j.id)).map((c) => (
          <div key={c.id} className="flex gap-4 bg-cardDark p-3 rounded-2xl border border-gray-800 cursor-pointer hover:border-accent/50 transition-colors" onClick={() => setSelectedJourney(c)}>
            <img src={c.img} alt={c.title} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1 py-1">
              <h4 className="font-bold text-sm text-white">{c.title}</h4>
              <p className="text-xs text-textMuted mb-2 line-clamp-1">{c.desc}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                <span className="bg-gray-800 px-2 py-0.5 rounded-full">⏱ {c.days}</span>
                <span className="bg-gray-800 px-2 py-0.5 rounded-full">📶 {c.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE CONFIGURACIÓN DE VIAJE */}
      <AnimatePresence>
        {selectedJourney && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center backdrop-blur-sm">
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }} className="bg-cardDark w-full max-w-md rounded-t-3xl p-6 border-t border-gray-700 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Configurar Viaje</h2>
                <button onClick={() => setSelectedJourney(null)} className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* NIVEL */}
                <div>
                  <label className="text-sm font-semibold text-textMuted mb-2 block">Nivel de dificultad</label>
                  <div className="flex gap-2">
                    {['Principiante', 'Intermedio', 'Maestro'].map(lvl => (
                      <button key={lvl} className="flex-1 py-2 bg-bgDark border border-gray-800 rounded-xl text-xs text-white hover:border-accent focus:border-accent focus:bg-accent/10 transition">{lvl}</button>
                    ))}
                  </div>
                </div>

                {/* DÍAS */}
                <div>
                  <label className="text-sm font-semibold text-textMuted mb-2 block">Frecuencia</label>
                  <div className="flex flex-col gap-2">
                    <button className="w-full py-3 bg-bgDark border border-gray-800 rounded-xl text-sm text-white text-left px-4 hover:border-accent transition">Lunes a Lunes (Todos los días)</button>
                    <button className="w-full py-3 bg-bgDark border border-gray-800 rounded-xl text-sm text-white text-left px-4 hover:border-accent transition">Lunes a Viernes (Días laborales)</button>
                    <button className="w-full py-3 bg-bgDark border border-gray-800 rounded-xl text-sm text-accent font-semibold text-left px-4 border-accent bg-accent/10">Personalizado</button>
                    <p className="text-[10px] text-yellow-500 mt-1">💡 Recomendado: al menos 5 días a la semana.</p>
                  </div>
                </div>

                {/* TIEMPO */}
                <div>
                  <label className="text-sm font-semibold text-textMuted mb-2 block">Hora y duración</label>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-bgDark border border-gray-800 rounded-xl p-3 flex items-center gap-2">
                      <Clock size={16} className="text-accent" />
                      <input type="time" className="bg-transparent text-white outline-none w-full text-sm" defaultValue="08:00" />
                    </div>
                    <div className="flex-1 bg-bgDark border border-gray-800 rounded-xl p-3 flex items-center gap-2">
                      <Calendar size={16} className="text-accent" />
                      <select className="bg-transparent text-white outline-none w-full text-sm appearance-none">
                        <option>10 min</option>
                        <option>15 min</option>
                        <option>20 min</option>
                        <option>30 min</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button onClick={() => handleJoin(selectedJourney)} className="w-full py-4 bg-accent text-white font-bold rounded-xl text-lg shadow-lg shadow-accent/30 hover:bg-accentHover transition mt-4">
                  Comenzar Viaje
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};