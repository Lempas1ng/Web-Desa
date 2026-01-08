import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Wisata from './pages/Wisata';
import Umkm from './pages/Umkm';

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/wisata" element={<Wisata />} />
          <Route path="/umkm" element={<Umkm />} />
        </Routes>
      </div>
      
      {/* Footer Sederhana */}
      <footer className="bg-slate-800 text-slate-300 py-8 text-center">
        <p>&copy; 2025 KKN Desa Sukajaya Lempasing. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;