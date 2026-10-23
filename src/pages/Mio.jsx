import { Bell, Settings, Globe, LogIn, LogOut, Moon, Sun, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Mio = () => {
  const { user, loginWithGoogle, logout } = useApp();

  return (
    <div className="p-6 pb-24 animate-slide-up min-h-full">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Mío</h1>
        <p className="text-textMuted text-sm mt-1">Tu espacio personal.</p>
      </header>

      {user ? (
        <div className="bg-cardDark p-4 rounded-2xl border border-gray-800 flex items-center gap-4 mb-6 shadow-sm">
          <img src={user.photoURL || "https://via.placeholder.com/150"} alt="Profile" className="w-16 h-16 rounded-full border-2 border-accent" />
          <div className="flex-1">
            <h2 className="font-bold text-lg text-white">{user.displayName || "Usuario"}</h2>
            <p className="text-xs text-textMuted mb-1">{user.email}</p>
            <span className="bg-yellow-500/20 text-yellow-500 text-[10px] px-2 py-0.5 rounded-full font-bold">Nivel 3</span>
          </div>
        </div>
      ) : (
        <div className="bg-cardDark p-6 rounded-2xl border border-gray-800 text-center mb-6 shadow-sm">
          <h2 className="font-bold text-lg mb-2 text-white">Bienvenido</h2>
          <p className="text-sm text-textMuted mb-4">Inicia sesión para guardar tu progreso en la nube.</p>
          <button onClick={loginWithGoogle} className="bg-accent text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto w-full hover:bg-accentHover transition">
            <LogIn size={18} /> Iniciar con Google
          </button>
        </div>
      )}

      <h3 className="font-bold text-sm mb-3 text-textMuted uppercase tracking-wider">Preferencias</h3>
      <div className="bg-cardDark rounded-2xl border border-gray-800 mb-6 overflow-hidden shadow-sm">
        
        <div className="flex items-center gap-4 p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 transition">
          <div className="bg-purple-500/20 p-2 rounded-lg"><Bell size={20} className="text-purple-400" /></div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-white">Notificaciones</h4>
            <p className="text-xs text-textMuted">Recordatorios y sonidos</p>
          </div>
          <span className="text-textMuted">›</span>
        </div>

        <div className="flex items-center gap-4 p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 transition">
          <div className="bg-blue-500/20 p-2 rounded-lg"><Palette size={20} className="text-blue-400" /></div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-white">Temas y Apariencia</h4>
            <p className="text-xs text-textMuted">Ardigital, Claro, Oscuro</p>
          </div>
          <span className="text-textMuted">›</span>
        </div>

        <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800/50 transition">
          <div className="bg-green-500/20 p-2 rounded-lg"><Globe size={20} className="text-green-400" /></div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-white">Idioma</h4>
            <p className="text-xs text-textMuted">Español</p>
          </div>
          <span className="text-textMuted">›</span>
        </div>
      </div>

      {user && (
        <button onClick={logout} className="w-full py-3 bg-red-500/10 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition">
          <LogOut size={18} /> Cerrar Sesión
        </button>
      )}
    </div>
  );
};