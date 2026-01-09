import { useParams, Link } from 'react-router-dom';
import { wisataData } from '../data';
import { MapPin, Ticket, ArrowLeft } from 'lucide-react';

export default function WisataDetail() {
  const { id } = useParams();
  const item = wisataData.find(p => p.id === parseInt(id));

  if (!item) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Wisata Tidak Ditemukan</h2>
        <Link to="/wisata" className="text-primary hover:underline">Kembali ke Daftar Wisata</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/wisata" className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Daftar Wisata
      </Link>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-[300px] md:h-[400px] object-cover" />
        
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.title}</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 text-sm text-gray-700">
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
              <MapPin className="text-primary w-5 h-5" />
              <span className="font-medium">{item.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
              <Ticket className="text-primary w-5 h-5" />
              <span className="font-medium">Tiket: {item.price}</span>
            </div>
          </div>

          <div className="prose max-w-none text-gray-600">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Tentang Destinasi Ini</h3>
            <p className="leading-relaxed">
              {item.longDescription || item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}