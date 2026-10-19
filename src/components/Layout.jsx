import { Home, Compass, BarChart2, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

export const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Hoy', path: '/', icon: Home },
    { name: 'Viajes', path: '/viajes', icon: Compass },
    { name: 'Historial', path: '/historial', icon: BarChart2 },
    { name: 'Mío', path: '/mio', icon: User },
  ];

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto relative bg-bgDark overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>
      
      {/* Bottom Nav */}
      <nav className="absolute bottom-0 w-full bg-cardDark border-t border-gray-800 flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.name} to={item.path} className="flex flex-col items-center justify-center w-full h-full">
              <Icon size={22} className={clsx(isActive ? 'text-accent' : 'text-gray-500')} />
              <span className={clsx("text-[10px] mt-1", isActive ? 'text-accent font-semibold' : 'text-gray-500')}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};