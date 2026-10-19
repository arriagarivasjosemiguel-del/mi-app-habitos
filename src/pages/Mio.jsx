import { Bell, Settings, Globe, HelpCircle, LogIn, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Mio = () => {
  const { user, loginWithGoogle, logout } = useApp();

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mío</h1>
          <p className="text-textMuted text-sm">Tu espacio personal.</p>
        </div>
        <button className="p-2 bg-cardDark rounded-full"><Settings size={20} /></button>
      </header>

      {user ? (
        <div className="bg-cardDark p-4 rounded-2xl border border-gray-800 flex items-center gap-4 mb-6">
          <img src={user.photoURL || "https://via.placeholder.com/150"} alt="Profile" className="w-16 h-16 rounded-full border-2 border-accent" />
          <div className="flex-1">
            <h2 className="font-bold text-lg">{user.displayName || "Usuario"}</h2>
            <p className="text-xs text-textMuted mb-1">{user.email}</p>
            <span className="bg-yellow-500/20 text-yellow-500 text-[10px] px-2 py-0.5 rounded-full font-bold">Nivel 3</span>
          </div>
        </div>
      ) : (
        <div className="bg-cardDark p-6 rounded-2xl border border-gray-800 text-center mb-6">
          <h2 className="font-bold text-lg mb-2">Bienvenido</h2>
          <p className="text-sm text-textMuted mb-4">Inicia sesión para guardar tu progreso en la nube.</p>
          <button onClick={loginWithGoogle} className="bg-accent text-white px-6 py-2 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto w-full">
            <LogIn size={18} /> Iniciar con Google
          </button>
        </div>
      )}

      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-5 rounded-2xl mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-2xl mb-2 block">👑</span>
          <h3 className="font-bold text-lg leading-tight mb-1">Accede a contenido premium</h3>
          <p className="text-xs text-gray-300 mb-4">Más viajes, más hábitos, más resultados.</p>
          <button className="bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-lg">Ver planes →</button>
        </div>
      </div>

      <h3 className="font-bold text-sm mb-3 text-textMuted uppercase tracking-wider">Configuración</h3>
      <div className="bg-cardDark rounded-2xl border border-gray-800 mb-6 overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b border-gray-800">
          <div className="bg-purple-500/20 p-2 rounded-lg"><Bell size={20} className="text-purple-400" /></div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">Notificaciones</h4>
            <p className="text-xs text-textMuted">Recordatorios y alertas</p>
          </div>
          <span className="text-textMuted">›</span>
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-gray-800">
          <div className="bg-blue-500/20 p-2 rounded-lg"><Settings size={20} className="text-blue-400" /></div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">Configuración general</h4>
            <p className="text-xs text-textMuted">Ajustes de la aplicación</p>
          </div>
          <span className="text-textMuted">›</span>
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="bg-green-500/20 p-2 rounded-lg"><Globe size={20} className="text-green-400" /></div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">Idioma</h4>
            <p className="text-xs text-textMuted">Español</p>
          </div>
          <span className="text-textMuted">›</span>
        </div>
      </div>

      {user && (
        <button onClick={logout} className="w-full py-3 bg-red-500/10 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2">
          <LogOut size={18} /> Cerrar Sesión
        </button>
      )}
    </div>
  );
};