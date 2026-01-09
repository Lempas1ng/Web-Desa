import { Link } from 'react-router-dom';
import { beritaData } from '../data';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Berita() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Kabar Desa</h1>
          <p className="text-slate-600 text-lg">Informasi terkini seputar kegiatan dan perkembangan desa</p>
          <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Search Bar (Visual Only) */}
        <div className="max-w-md mx-auto mb-12 relative">
            <input 
                type="text" 
                placeholder="Cari berita..." 
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </div>

        {/* Grid Berita */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beritaData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={`/berita/${item.id}`} className="group h-full block">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-primary" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} className="text-primary" />
                        <span>{item.author}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                      {item.snippet}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
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