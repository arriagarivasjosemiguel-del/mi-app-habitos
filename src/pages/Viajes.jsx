import { Play } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const JOURNEYS = [
  { id: 'j1', title: 'Rutina de mañana', desc: 'Empieza el día con energía y enfoque.', days: '7 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Beber un vaso de agua', description: 'Al despertar', color: 'bg-blue-500' }, { title: 'Estiramiento de 5 min', description: 'Rutina de mañana', color: 'bg-green-500' }] },
  { id: 'j2', title: 'Meditación para tranquilidad', desc: 'Calma tu mente, mejora tu enfoque.', days: '7 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Meditar 10 min', description: 'En silencio', color: 'bg-purple-500' }] },
  { id: 'j3', title: 'Despídete del azúcar', desc: 'Más energía, mejor salud.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'No comer azúcar', description: 'Todo el día', color: 'bg-red-500' }, { title: 'Comer 1 fruta', description: 'Merienda', color: 'bg-orange-500' }] },
  { id: 'j4', title: 'Lectura diaria', desc: 'Alimenta tu mente con buenos libros.', days: '21 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Leer 10 páginas', description: 'Antes de dormir', color: 'bg-yellow-500' }] },
  { id: 'j5', title: 'Ejercicio en casa', desc: 'Mantente en forma sin ir al gimnasio.', days: '30 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600', habits: [{ title: '20 Flexiones', description: 'Por la mañana', color: 'bg-red-500' }, { title: '20 Sentadillas', description: 'Por la noche', color: 'bg-red-500' }] },
  { id: 'j6', title: 'Hidratación extrema', desc: 'Toma más agua durante el día.', days: '7 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Beber 2L de agua', description: 'Durante el día', color: 'bg-blue-500' }] },
  { id: 'j7', title: 'Dormir mejor', desc: 'Mejora la calidad de tu sueño.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'No usar celular 1h antes', description: 'Antes de dormir', color: 'bg-purple-500' }, { title: 'Dormir 8 horas', description: 'Noche', color: 'bg-blue-500' }] },
  { id: 'j8', title: 'Aprender un idioma', desc: 'Practica un nuevo idioma cada día.', days: '30 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600', habits: [{ title: '15 min de inglés', description: 'Diario', color: 'bg-green-500' }] },
  { id: 'j9', title: 'Productividad', desc: 'Optimiza tu tiempo y enfócate.', days: '14 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Planificar el día', description: 'Al despertar', color: 'bg-yellow-500' }, { title: 'Pomodoro 25 min', description: 'Sesión de trabajo', color: 'bg-orange-500' }] },
  { id: 'j10', title: 'Alimentación sana', desc: 'Come mejor para sentirte mejor.', days: '21 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Comer 5 vegetales', description: 'En el día', color: 'bg-green-500' }] },
  { id: 'j11', title: 'Yoga para principiantes', desc: 'Flexibilidad y relajación.', days: '7 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Yoga 15 min', description: 'Mañana', color: 'bg-purple-500' }] },
  { id: 'j12', title: 'Caminar diario', desc: 'Da 10,000 pasos al día.', days: '30 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Caminar 30 min', description: 'Al aire libre', color: 'bg-green-500' }] },
  { id: 'j13', title: 'Diario de gratitud', desc: 'Escribe 3 cosas buenas al día.', days: '21 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Escribir 3 gratitudes', description: 'Antes de dormir', color: 'bg-yellow-500' }] },
  { id: 'j14', title: 'Cuidado de la piel', desc: 'Rutina básica de skincare.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Lavar la cara', description: 'Mañana y noche', color: 'bg-blue-500' }, { title: 'Usar protector solar', description: 'Mañana', color: 'bg-yellow-500' }] },
  { id: 'j15', title: 'Sin redes sociales', desc: 'Desconéctate del mundo digital.', days: '7 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'No usar redes 2h', description: 'Durante el día', color: 'bg-red-500' }] },
  { id: 'j16', title: 'Orden en casa', desc: 'Mantén tu espacio limpio.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Tender la cama', description: 'Al despertar', color: 'bg-orange-500' }, { title: 'Limpiar 10 min', description: 'Por la noche', color: 'bg-blue-500' }] },
  { id: 'j17', title: 'Finanzas personales', desc: 'Ahorra y controla tus gastos.', days: '30 días', level: 'Intermedio', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Registrar gastos', description: 'Diario', color: 'bg-green-500' }] },
  { id: 'j18', title: 'Creatividad', desc: 'Dibuja o escribe algo nuevo.', days: '21 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Dibujar 15 min', description: 'Libre', color: 'bg-purple-500' }] },
  { id: 'j19', title: 'Cocina saludable', desc: 'Prepara tus propias comidas.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Cocinar en casa', description: 'Almuerzo', color: 'bg-orange-500' }] },
  { id: 'j20', title: 'Conexión social', desc: 'Habla con alguien que quieras.', days: '7 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Llamar a un amigo', description: 'Diario', color: 'bg-blue-500' }] },
  { id: 'j21', title: 'Respiración consciente', desc: 'Reduce el estrés con respiración.', days: '7 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=600', habits: [{ title: 'Respirar 5 min', description: 'Al despertar', color: 'bg-green-500' }] },
];

export const Viajes = () => {
  const { addHabit } = useApp();
  const navigate = useNavigate();

  const handleJoin = (journey) => {
    journey.habits.forEach(h => addHabit(h));
    alert(`¡Te has unido a "${journey.title}"! Revisa tus hábitos de Hoy.`);
    navigate('/');
  };

  return (
    <div className="p-6 pb-24 animate-in fade-in duration-500">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">Viajes</h1>
        <p className="text-textMuted text-sm mt-1">Desafíos que te llevan más lejos.</p>
      </header>

      <div className="relative rounded-2xl overflow-hidden mb-8 h-52 flex flex-col justify-end p-4">
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" alt="Run" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/50 to-transparent"></div>
        <div className="relative z-10">
          <span className="bg-accent text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block text-white">DESTACADO</span>
          <h2 className="text-2xl font-bold mb-1 text-white">Rutina de mañana</h2>
          <p className="text-sm text-gray-300 mb-3">Empieza el día con energía y enfoque.</p>
          <div className="flex items-center gap-3 text-xs text-gray-300 mb-3">
            <span>⏱ 7 días</span>
            <span>📶 Principiante</span>
          </div>
          <button onClick={() => handleJoin(JOURNEYS[0])} className="bg-accent w-full py-2 rounded-xl font-bold flex justify-center items-center gap-2 text-white">
            Unirme <Play size={16} fill="white" />
          </button>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-4 text-white">Todos los viajes ({JOURNEYS.length})</h3>
      <div className="space-y-4">
        {JOURNEYS.map((c) => (
          <div key={c.id} className="flex gap-4 bg-cardDark p-3 rounded-2xl border border-gray-800 cursor-pointer" onClick={() => handleJoin(c)}>
            <img src={c.img} alt={c.title} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1 py-1">
              <h4 className="font-bold text-sm text-white">{c.title}</h4>
              <p className="text-xs text-textMuted mb-2 line-clamp-1">{c.desc}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span>⏱ {c.days}</span>
                <span>•</span>
                <span>📶 {c.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};