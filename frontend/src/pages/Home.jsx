import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { villageInfo } from '../data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('${villageInfo.heroImage}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Desa {villageInfo.name}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{villageInfo.regency}, {villageInfo.province}</p>
          <Link to="/profil" className="bg-primary hover:bg-sky-600 text-white px-8 py-3 rounded-full font-semibold transition duration-300 inline-flex items-center gap-2">
            Jelajahi Desa <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Sekilas Info */}
      <div className="py-16 px-4 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Tentang Desa Kami</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {villageInfo.description}
          </p>
          <div className="flex items-center text-gray-500 gap-2 mb-4">
            <MapPin className="text-primary" />
            <span>Kecamatan {villageInfo.district}, Kab. {villageInfo.regency}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <span className="block text-4xl font-bold text-primary mb-2">2+</span>
            <span className="text-gray-600">Destinasi Wisata</span>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <span className="block text-4xl font-bold text-primary mb-2">10+</span>
            <span className="text-gray-600">UMKM Aktif</span>
          </div>
        </div>
      </div>
    </div>
  );
}