import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// Import Profil dihapus
import Wisata from './pages/Wisata';
import Umkm from './pages/Umkm';
import WisataDetail from './pages/WisataDetail';
import UmkmDetail from './pages/UmkmDetail';
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Route Profil dihapus */}
        
        <Route path="/wisata" element={<Wisata />} />
        <Route path="/wisata/:id" element={<WisataDetail />} />
        
        <Route path="/umkm" element={<Umkm />} />
        <Route path="/umkm/:id" element={<UmkmDetail />} />

        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
      </Routes>
      
      <footer className="bg-slate-900 text-slate-300 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="mb-4">&copy; 2025 KKN Desa Sukajaya Lempasing. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;