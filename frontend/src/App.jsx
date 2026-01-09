import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Wisata from './pages/Wisata';
import Umkm from './pages/Umkm';
import WisataDetail from './pages/WisataDetail';
import UmkmDetail from './pages/UmkmDetail';

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          
          <Route path="/wisata" element={<Wisata />} />
          <Route path="/wisata/:id" element={<WisataDetail />} />
          
          <Route path="/umkm" element={<Umkm />} />
          <Route path="/umkm/:id" element={<UmkmDetail />} />
        </Routes>
      </div>
      
      <footer className="bg-slate-800 text-slate-300 py-8 text-center mt-auto">
        <div className="max-w-7xl mx-auto px-4">
            <p>&copy; 2025 KKN Desa Sukajaya Lempasing. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;