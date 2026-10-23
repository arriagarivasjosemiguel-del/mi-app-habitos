import { useState, useEffect } from 'react';
import { Play, X, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JOURNEYS = [
  { id: 'j1', title: 'Rutina de mañana', desc: 'Empieza el día con energía y enfoque.', days: '7 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600' },
  { id: 'j2', title: 'Meditación para tranquilidad', desc: 'Calma tu mente, mejora tu enfoque.', days: '7 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600' },
  { id: 'j3', title: 'Despídete del azúcar', desc: 'Más energía, mejor salud.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&q=80&w=600' },
  { id: 'j4', title: 'Lectura diaria', desc: 'Alimenta tu mente con buenos libros.', days: '21 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600' },
  { id: 'j5', title: 'Ejercicio en casa', desc: 'Mantente en forma sin ir al gimnasio.', days: '30 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600' },
  { id: 'j6', title: 'Hidratación extrema', desc: 'Toma más agua durante el día.', days: '7 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600' },
  { id: 'j7', title: 'Dormir mejor', desc: 'Mejora la calidad de tu sueño.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600' },
  { id: 'j8', title: 'Aprender un idioma', desc: 'Practica un nuevo idioma cada día.', days: '30 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600' },
  { id: 'j9', title: 'Productividad', desc: 'Optimiza tu tiempo y enfócate.', days: '14 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=600' },
  { id: 'j10', title: 'Alimentación sana', desc: 'Come mejor para sentirte mejor.', days: '21 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600' },
  { id: 'j11', title: 'Yoga para principiantes', desc: 'Flexibilidad y relajación.', days: '7 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600' },
  { id: 'j12', title: 'Caminar diario', desc: 'Da 10,000 pasos al día.', days: '30 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600' },
  { id: 'j13', title: 'Diario de gratitud', desc: 'Escribe 3 cosas buenas al día.', days: '21 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600' },
  { id: 'j14', title: 'Cuidado de la piel', desc: 'Rutina básica de skincare.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600' },
  { id: 'j15', title: 'Sin redes sociales', desc: 'Desconéctate del mundo digital.', days: '7 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600' },
  { id: 'j16', title: 'Orden en casa', desc: 'Mantén tu espacio limpio.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
  { id: 'j17', title: 'Finanzas personales', desc: 'Ahorra y controla tus gastos.', days: '30 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600' },
  { id: 'j18', title: 'Creatividad', desc: 'Dibuja o escribe algo nuevo.', days: '21 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600' },
  { id: 'j19', title: 'Cocina saludable', desc: 'Prepara tus propias comidas.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' },
  { id: 'j20', title: 'Conexión social', desc: 'Habla con alguien que quieras.', days: '7 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600' },
  { id: 'j21', title: 'Respiración consciente', desc: 'Reduce el estrés con respiración.', days: '7 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=600' },
];

export const Viajes = () => {
  // Guardar en localStorage para que no se borren al recargar
  const [myJourneys, setMyJourneys] = useState(() => {
    const saved = localStorage.getItem('myJourneys');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('Principiante');
  const [selectedFreq, setSelectedFreq] = useState('Lunes a Lunes (Todos los días)');

  // Efecto para guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('myJourneys', JSON.stringify(myJourneys));
  }, [myJourneys]);

  const handleJoin = () => {
    setMyJourneys([...myJourneys, selectedJourney.id]);
    setSelectedJourney(null);
    alert(`¡Te has unido a "${selectedJourney.title}"!`);
  };

  return (
    <div className="p-6 pb-24 animate-slide-up min-h-full">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Viajes</h1>
        <p className="text-textMuted text-sm mt-1">Desafíos que te llevan más lejos.</p>
      </header>

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

      <AnimatePresence>
        {selectedJourney && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            {/* MODAL CENTRADO Y COMPACTO */}
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-cardDark w-full max-w-sm rounded-3xl p-6 border border-gray-700 max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-white">Configurar Viaje</h2>
                <button onClick={() => setSelectedJourney(null)} className="p-1.5 bg-gray-800 rounded-full text-gray-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-textMuted mb-2 block uppercase tracking-wider">Nivel de dificultad</label>
                  <div className="flex gap-2">
                    {['Principiante', 'Intermedio', 'Maestro'].map(lvl => (
                      <button key={lvl} onClick={() => setSelectedLevel(lvl)} className={`flex-1 py-2 border rounded-lg text-[11px] transition ${selectedLevel === lvl ? 'bg-accent/20 border-accent text-accent font-bold' : 'bg-bgDark border-gray-800 text-white hover:border-gray-600'}`}>
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-textMuted mb-2 block uppercase tracking-wider">Frecuencia</label>
                  <div className="flex flex-col gap-2">
                    {['Lunes a Lunes (Todos los días)', 'Lunes a Viernes (Días laborales)', 'Personalizado'].map(freq => (
                      <button key={freq} onClick={() => setSelectedFreq(freq)} className={`w-full py-2.5 border rounded-lg text-xs text-left px-3 transition ${selectedFreq === freq ? 'bg-accent/10 border-accent text-accent font-semibold' : 'bg-bgDark border-gray-800 text-white hover:border-gray-600'}`}>
                        {freq}
                      </button>
                    ))}
                    <p className="text-[10px] text-yellow-500 mt-1">💡 Recomendado: al menos 5 días a la semana.</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-textMuted mb-2 block uppercase tracking-wider">Hora y duración</label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-bgDark border border-gray-800 rounded-lg p-2.5 flex items-center gap-2">
                      <Clock size={14} className="text-accent" />
                      <input type="time" className="bg-transparent text-white outline-none w-full text-xs" defaultValue="08:00" />
                    </div>
                    <div className="flex-1 bg-bgDark border border-gray-800 rounded-lg p-2.5 flex items-center gap-2">
                      <Calendar size={14} className="text-accent" />
                      <select className="bg-transparent text-white outline-none w-full text-xs appearance-none">
                        <option>10 min</option>
                        <option>15 min</option>
                        <option>20 min</option>
                        <option>30 min</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button onClick={handleJoin} className="w-full py-3.5 bg-accent text-white font-bold rounded-xl text-sm shadow-lg shadow-accent/30 hover:bg-accentHover transition mt-2">
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