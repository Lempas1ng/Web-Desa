import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "text-primary font-bold" : "text-gray-600 hover:text-primary";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Home className="w-6 h-6 text-primary" />
              <span>Sukajaya Lempasing</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Beranda</Link>
            <Link to="/profil" className={isActive('/profil')}>Profil Desa</Link>
            <Link to="/wisata" className={isActive('/wisata')}>Wisata</Link>
            <Link to="/umkm" className={isActive('/umkm')}>UMKM</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-gray-100">Beranda</Link>
            <Link to="/profil" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-gray-100">Profil Desa</Link>
            <Link to="/wisata" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-gray-100">Wisata</Link>
            <Link to="/umkm" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-gray-100">UMKM</Link>
          </div>
        </div>
      )}
    </nav>
  );
}