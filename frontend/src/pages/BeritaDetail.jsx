import { useParams, Link } from 'react-router-dom';
import { beritaData } from '../data';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BeritaDetail() {
  const { id } = useParams();
  const item = beritaData.find(p => p.id === parseInt(id));

  if (!item) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Berita tidak ditemukan</h2>
        <Link to="/berita" className="text-primary hover:underline">Kembali ke Kabar Desa</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4"
      >
        <Link to="/berita" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Daftar Berita
        </Link>

        {/* Header Content */}
        <div className="mb-8">
            <span className="text-primary font-bold tracking-wider uppercase text-sm bg-blue-50 px-3 py-1 rounded-full">{item.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 mb-6 leading-tight">{item.title}</h1>
            <div className="flex items-center gap-6 text-gray-500 text-sm border-b border-gray-100 pb-8">
                <span className="flex items-center gap-2"><Calendar size={16}/> {item.date}</span>
                <span className="flex items-center gap-2"><User size={16}/> {item.author}</span>
            </div>
        </div>

        {/* Main Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-10 h-[300px] md:h-[500px]">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>

        {/* Content Body */}
        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3">
                {item.content}
            </p>
        </div>
        
        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <span className="text-gray-500 font-medium">Bagikan berita ini:</span>
            <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100">
                <Share2 size={18} /> <span className="text-sm">Share</span>
            </button>
        </div>
      </motion.div>
    </div>
  );
}