import { umkmData } from '../data';
import { ShoppingBag } from 'lucide-react';

export default function Umkm() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">UMKM Desa</h1>
        <p className="text-gray-600">Produk unggulan karya warga desa</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {umkmData.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:w-1/3">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover min-h-[200px]" />
            </div>
            <div className="p-6 flex flex-col justify-center md:w-2/3">
              <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-2">
                <ShoppingBag size={16} />
                <span>{item.owner}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button className="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 self-start transition">
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}