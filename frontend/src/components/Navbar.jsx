import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek apakah user sudah login (ada token di localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // Cek ulang setiap kali ganti halaman

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600";
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO / BRAND */}
          <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <span>🏛️</span> Desa Digital
          </Link>

          {/* MENU DESKTOP (Tengah) */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={isActive('/')}>Beranda</Link>
            <Link to="/berita" className={isActive('/berita')}>Berita</Link>
            <Link to="/umkm" className={isActive('/umkm')}>UMKM</Link>
            <Link to="/wisata" className={isActive('/wisata')}>Wisata</Link>
            {/* Layanan Surat sekarang jadi menu biasa, tidak mencolok */}
            <Link to="/layanan-surat" className={isActive('/layanan-surat')}>Layanan Surat</Link>
          </div>

          {/* TOMBOL LOGIN / DASHBOARD (Kanan) */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <Link 
                to="/admin-dashboard" 
                className="bg-slate-800 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-900 transition shadow-md flex items-center gap-2"
              >
                ⚙️ Dashboard
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          {/* TOMBOL BURGER (Mobile) */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* MENU MOBILE (Dropdown) */}
        {isOpen && (
          <div className="md:hidden bg-slate-50 border-t border-slate-200 py-2">
            <Link to="/" className="block px-4 py-2 text-slate-700 hover:bg-blue-50" onClick={() => setIsOpen(false)}>Beranda</Link>
            <Link to="/berita" className="block px-4 py-2 text-slate-700 hover:bg-blue-50" onClick={() => setIsOpen(false)}>Berita</Link>
            <Link to="/umkm" className="block px-4 py-2 text-slate-700 hover:bg-blue-50" onClick={() => setIsOpen(false)}>UMKM</Link>
            <Link to="/wisata" className="block px-4 py-2 text-slate-700 hover:bg-blue-50" onClick={() => setIsOpen(false)}>Wisata</Link>
            <Link to="/layanan-surat" className="block px-4 py-2 text-slate-700 hover:bg-blue-50" onClick={() => setIsOpen(false)}>Layanan Surat</Link>
            <div className="border-t border-slate-200 mt-2 pt-2 px-4">
              {isLoggedIn ? (
                <Link to="/admin-dashboard" className="block w-full text-center bg-slate-800 text-white py-2 rounded" onClick={() => setIsOpen(false)}>Dashboard Admin</Link>
              ) : (
                <Link to="/login" className="block w-full text-center bg-blue-600 text-white py-2 rounded" onClick={() => setIsOpen(false)}>Login Admin</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}