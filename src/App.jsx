import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Viajes } from './pages/Viajes';
import { Historial } from './pages/Historial';
import { Mio } from './pages/Mio';
import { Tareas } from './pages/Tareas'; // Importamos la nueva vista

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/viajes" element={<Viajes />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/mio" element={<Mio />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}

export default App;