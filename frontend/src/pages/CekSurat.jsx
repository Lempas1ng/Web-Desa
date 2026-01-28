import { useState } from 'react';
import api from '../api';
import { Search, Clock, CheckCircle, FileText, AlertCircle, ArrowLeft, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

export default function CekSurat() {
  const [nik, setNik] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(null); 
  const [errorMsg, setErrorMsg] = useState('');

  const handleCek = async (e) => {
    e.preventDefault();
    if (nik.length < 16) {
      Swal.fire({
        icon: 'warning',
        title: 'NIK Tidak Valid',
        text: 'Mohon masukkan 16 digit angka NIK dengan benar.',
        confirmButtonColor: '#40513B' // Primary color
      });
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setHasil(null);

    try {
      const response = await api.post('/cek-surat', { nik });
      setHasil(response.data.data);
      
      if(response.data.data.length > 0) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            background: '#FAF9F6', // Surface
            color: '#40513B' // Primary
        });
        Toast.fire({
            icon: 'success',
            title: `Ditemukan ${response.data.data.length} surat`
        });
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        setHasil([]); 
      } else {
        setErrorMsg("Terjadi kesalahan sistem.");
        Swal.fire({
            icon: 'error',
            title: 'Terjadi Kesalahan',
            text: 'Gagal menghubungi server. Silakan coba lagi nanti.',
            confirmButtonColor: '#E67E22' // Accent color
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const StatusBadge = ({ status }) => {
    if (status === 'Selesai') {
      return <span className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-primary/20"><CheckCircle size={14}/> Selesai</span>;
    } else if (status === 'Ditolak') {
      return <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-red-200"><XCircle size={14}/> Ditolak</span>;
    } else {
      return <span className="flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-accent/20"><Clock size={14}/> Menunggu</span>;
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 px-4 font-sans">
      <div className="max-w-xl mx-auto">
        
        <Link to="/" className="inline-flex items-center text-secondary hover:text-accent mb-6 transition-colors font-medium">
          <ArrowLeft size={20} className="mr-2" /> Kembali ke Beranda
        </Link>

        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-neutral text-center mb-8 relative overflow-hidden">
          {/* Hiasan Background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-neutral"></div>
          
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <Search className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2">Lacak Status Surat</h1>
          <p className="text-sm sm:text-base text-slate-600 mb-6">Masukkan NIK Pemohon untuk melihat progres surat Anda.</p>

          <form onSubmit={handleCek} className="relative">
            <input 
              type="number" 
              placeholder="Masukan NIK (16 Digit)..." 
              className="w-full pl-5 pr-14 py-3 sm:py-4 rounded-xl border-2 border-neutral focus:border-secondary outline-none text-base sm:text-lg font-bold text-primary transition-all placeholder:font-normal placeholder:text-slate-400 bg-surface focus:bg-white"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-secondary text-white px-4 rounded-lg font-bold transition-all disabled:opacity-70 flex items-center justify-center shadow-md"
            >
              {loading ? <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div> : <Search size={20}/>}
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center justify-center gap-2 animate-pulse border border-red-100">
              <AlertCircle size={16} className="shrink-0"/> <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Hasil Pencarian */}
        <div className="space-y-4">
          <AnimatePresence>
            {hasil && hasil.length > 0 ? (
              hasil.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-neutral hover:shadow-md transition-all hover:border-secondary flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="bg-surface p-3 rounded-xl text-secondary group-hover:bg-primary group-hover:text-white transition-colors hidden sm:block shrink-0">
                      <FileText size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-primary text-lg leading-snug break-words">
                        {item.jenis_surat}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">
                        Diajukan: {new Date(item.created_at).toLocaleDateString('id-ID')}
                      </p>
                      <p className="text-xs text-secondary mt-0.5 truncate font-medium">
                        a.n. {item.nama_pemohon}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-neutral/50">
                    <span className="text-xs text-slate-400 font-medium sm:hidden">Status Pengajuan:</span>
                    <StatusBadge status={item.status} />
                  </div>
                </motion.div>
              ))
            ) : hasil && hasil.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 bg-white rounded-3xl border border-neutral border-dashed">
                <div className="inline-block p-4 bg-surface rounded-full mb-3 text-neutral"><FileText size={30}/></div>
                <h3 className="font-bold text-primary">Tidak Ada Data</h3>
                <p className="text-slate-500 text-sm">Belum ada surat yang diajukan dengan NIK tersebut.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}