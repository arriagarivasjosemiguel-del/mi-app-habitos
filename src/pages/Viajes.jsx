import { Play } from 'lucide-react';

export const Viajes = () => {
  const challenges = [
    { title: 'Rutina de mañana', desc: 'Empieza el día con energía y enfoque.', days: '7 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600' },
    { title: 'Meditación para tranquilidad', desc: 'Calma tu mente, mejora tu enfoque.', days: '7 días', level: 'Todos los niveles', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600' },
    { title: 'Despídete del azúcar', desc: 'Más energía, mejor salud.', days: '14 días', level: 'Principiante', img: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Viajes</h1>
        <p className="text-textMuted text-sm">Desafíos que te llevan más lejos.</p>
      </header>

      <div className="relative rounded-2xl overflow-hidden mb-8 h-52 flex flex-col justify-end p-4">
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" alt="Run" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/50 to-transparent"></div>
        <div className="relative z-10">
          <span className="bg-accent text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">DESTACADO</span>
          <h2 className="text-2xl font-bold mb-1">Rutina de mañana</h2>
          <p className="text-sm text-gray-300 mb-3">Empieza el día con energía y enfoque.</p>
          <div className="flex items-center gap-3 text-xs text-gray-300 mb-3">
            <span>⏱ 7 días</span>
            <span>📶 Principiante</span>
          </div>
          <button className="bg-accent w-full py-2 rounded-xl font-bold flex justify-center items-center gap-2">
            Unirme <Play size={16} fill="white" />
          </button>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-4">Todos los viajes</h3>
      <div className="space-y-4">
        {challenges.map((c, i) => (
          <div key={i} className="flex gap-4 bg-cardDark p-3 rounded-2xl border border-gray-800">
            <img src={c.img} alt={c.title} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1 py-1">
              <h4 className="font-bold text-sm">{c.title}</h4>
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