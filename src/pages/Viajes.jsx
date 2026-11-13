import { useState, useEffect } from 'react';
import { Play, X, Clock, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JOURNEYS = [
  { id: 'j1', title: 'Rutina de mañana', desc: 'Empieza el día con energía y enfoque.', days: '7 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600', routine: ['Beber 1 vaso de agua al despertar', 'Estiramiento de 5 minutos', 'Meditar 5 minutos', 'Escribir 3 gratitudes', 'Desayuno saludable', 'Leer 10 páginas', 'Caminar 10 minutos'] },
  { id: 'j2', title: 'Meditación para tranquilidad', desc: 'Calma tu mente, mejora tu enfoque.', days: '7 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600', routine: ['Respiración profunda 5 min', 'Meditación guiada 10 min', 'Caminar consciente', 'Diario de emociones', 'Yoga suave', 'Escuchar música relajante', 'Dormir 8 horas'] },
  { id: 'j3', title: 'Despídete del azúcar', desc: 'Más energía, mejor salud.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&q=80&w=600', routine: ['Beber 2L de agua', 'Comer 1 fruta', 'No refrescos', 'Caminar 20 min', 'Leer etiquetas', 'Comer vegetales', 'Dormir bien'] },
];

export const Viajes = () => {
  const [myJourneys, setMyJourneys] = useState(() => JSON.parse(localStorage.getItem('myJourneys')) || []);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [activeJourney, setActiveJourney] = useState(null); // Para ver el detalle
  
  const [selectedLevel, setSelectedLevel] = useState('Principiante');
  const [selectedFreq, setSelectedFreq] = useState('Lunes a Lunes');
  const [customDays, setCustomDays] = useState([]);

  useEffect(() => { localStorage.setItem('myJourneys', JSON.stringify(myJourneys)); }, [myJourneys]);

  const handleJoin = () => {
    setMyJourneys([...myJourneys, selectedJourney.id]);
    setSelectedJourney(null);
    alert(`¡Te has unido a "${selectedJourney.title}"!`);
  };

  // Vista de detalle del viaje activo
  if (activeJourney) {
    return (
      <div className="min-h-full animate-slide-up pb-24">
        <div className="relative h-64 w-full">
          <img src={activeJourney.img} alt={activeJourney.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/50 to-transparent"></div>
          <button onClick={() => setActiveJourney(null)} className="absolute top-6 left-6 p-2 bg-black/50 backdrop-blur-md rounded-full text-white"><ArrowLeft size={20} /></button>
          <div className="absolute bottom-6 left-6">
            <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block uppercase">En Progreso</span>
            <h1 className="text-3xl font-extrabold text-white">{activeJourney.title}</h1>
            <p className="text-textMuted text-sm">{activeJourney.desc}</p>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Tu rutina diaria</h2>
          <div className="space-y-3">
            {activeJourney.routine.map((task, i) => (
              <div key={i} className="bg-cardDark p-4 rounded-2xl border border-gray-800 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">{i + 1}</div>
                <p className="text-white text-sm font-medium">{task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
              <div key={c.id} onClick={() => setActiveJourney(c)} className="bg-gradient-to-r from-accent/20 to-cardDark p-4 rounded-2xl border border-accent/30 flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center"><Play size={20} className="text-white" fill="white" /></div>
                <div className="flex-1"><h4 className="font-bold text-white">{c.title}</h4><p className="text-xs text-accent font-semibold">Ver rutina →</p></div>
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
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-cardDark w-full max-w-sm rounded-3xl p-5 border border-gray-700 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Configurar</h2>
                <button onClick={() => setSelectedJourney(null)} className="p-1.5 bg-gray-800 rounded-full text-gray-400"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-textMuted mb-2 block uppercase">Dificultad</label>
                  <div className="flex gap-2">
                    {['Principiante', 'Intermedio', 'Maestro'].map(lvl => (
                      <button key={lvl} onClick={() => setSelectedLevel(lvl)} className={`flex-1 py-1.5 border rounded-lg text-[10px] transition ${selectedLevel === lvl ? 'bg-accent/20 border-accent text-accent font-bold' : 'bg-bgDark border-gray-800 text-white'}`}>{lvl}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-textMuted mb-2 block uppercase">Frecuencia</label>
                  <div className="flex flex-col gap-2">
                    {['Lunes a Lunes', 'Lunes a Viernes', 'Personalizado'].map(freq => (
                      <button key={freq} onClick={() => setSelectedFreq(freq)} className={`w-full py-2 border rounded-lg text-xs text-left px-3 transition ${selectedFreq === freq ? 'bg-accent/10 border-accent text-accent font-semibold' : 'bg-bgDark border-gray-800 text-white'}`}>{freq}</button>
                    ))}
                  </div>
                </div>
                <button onClick={handleJoin} className="w-full py-3 bg-accent text-white font-bold rounded-xl text-sm shadow-lg shadow-accent/30 mt-2">Comenzar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};