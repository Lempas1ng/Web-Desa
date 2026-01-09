import { Link } from 'react-router-dom';
import { umkmData } from '../data';
import { ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Umkm() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">UMKM & Ekonomi Kreatif</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Dukung ekonomi lokal dengan membeli produk asli buatan warga desa. Kualitas terjamin, harga bersahabat.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {umkmData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row group"
            >
              <div className="md:w-2/5 relative overflow-hidden min-h-[250px]">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-0 left-0 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                   Terlaris
                </div>
              </div>
              
              <div className="p-6 md:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-2">
                  <User size={16} />
                  <span>{item.owner}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{item.name}</h3>
                <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">{item.description}</p>
                
                <div className="mt-auto flex items-center justify-between">
                   <div className="flex items-center gap-2 text-slate-700 font-medium bg-slate-100 px-3 py-1 rounded-lg text-sm">
                      <ShoppingBag size={14} />
                      {item.priceRange}
                   </div>
                   <Link 
                    to={`/umkm/${item.id}`} 
                    className="bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary transition-colors duration-300"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}