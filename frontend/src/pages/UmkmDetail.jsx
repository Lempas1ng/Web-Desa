import { useParams, Link } from 'react-router-dom';
import { umkmData } from '../data';
import { Phone, ArrowLeft, Tag, User } from 'lucide-react';

export default function UmkmDetail() {
  const { id } = useParams();
  const item = umkmData.find(p => p.id === parseInt(id));

  if (!item) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data UMKM Tidak Ditemukan</h2>
        <Link to="/umkm" className="text-primary hover:underline">Kembali ke Daftar UMKM</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/umkm" className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Daftar UMKM
      </Link>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover min-h-[300px]" />
        </div>
        
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.name}</h1>
          
          <div className="flex items-center gap-2 text-primary font-semibold mb-6">
            <User className="w-5 h-5" />
            <span>Pemilik: {item.owner}</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {item.longDescription || item.description}
          </p>

          <div className="space-y-4 border-t border-gray-100 pt-6">
             <div className="flex items-center gap-3 text-gray-700 bg-slate-50 p-3 rounded-lg">
                <Tag className="w-5 h-5 text-primary" />
                <span className="font-medium">Harga: {item.priceRange}</span>
             </div>
             <div className="flex items-center gap-3 text-gray-700 bg-slate-50 p-3 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-medium">Kontak: {item.contact}</span>
             </div>
          </div>

          <a 
            href={`https://wa.me/${item.contact?.replace(/[^0-9]/g, '')}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-sky-600 transition shadow-md hover:shadow-lg text-center block"
          >
            Hubungi Penjual (WhatsApp)
          </a>
        </div>
      </div>
    </div>
  );
}