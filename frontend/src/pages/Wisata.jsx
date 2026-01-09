import { Link } from 'react-router-dom';
import { wisataData } from '../data';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Wisata() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4"> {/* Padding top ditambah karena navbar fixed */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Destinasi Wisata</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Temukan surga tersembunyi di pesisir Lampung. Dari pantai yang tenang hingga hutan mangrove yang asri.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wisataData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Link to={`/wisata/${item.id}`} className="group block h-full">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="relative overflow-hidden h-64">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      Wisata Alam
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                      <MapPin size={14} />
                      {item.location}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-slate-600 line-clamp-3 mb-6 flex-grow">{item.description}</p>
                    
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-primary font-bold">{item.price.split(' ')[0]} <span className="text-xs font-normal text-gray-500">/ tiket</span></span>
                      <span className="text-sm font-semibold text-slate-700 group-hover:underline">Detail &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}