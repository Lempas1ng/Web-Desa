import { useState } from 'react';
import api from '../api';
import { Send, AlertTriangle, Camera, ArrowLeft, CheckCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pengaduan() {
  const [formData, setFormData] = useState({
    nama_pelapor: '', nik: '', no_hp: '', judul_laporan: '', lokasi: '', isi_laporan: '' 
  });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!foto) {
        alert("Wajib menyertakan foto bukti kejadian!");
        return;
    }

    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('foto_bukti', foto); 

    try {
      await api.post('/pengaduan', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim laporan. Pastikan semua data terisi.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 px-4 flex justify-center items-start bg-surface">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center border border-neutral">
          <CheckCircle size={50} className="text-secondary mx-auto mb-4"/>
          <h2 className="text-2xl font-bold text-primary mb-2">Laporan Diterima!</h2>
          <p className="text-slate-600 mb-6">Terima kasih. Laporan Anda akan segera kami tinjau.</p>
          <Link to="/" className="text-accent font-bold hover:underline">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-surface px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center text-secondary hover:text-accent mb-6 font-medium transition-colors">
            <ArrowLeft size={20} className="mr-2"/> Kembali
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl border border-neutral overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-5">
                <AlertTriangle size={150} />
             </div>
            <h1 className="text-3xl font-bold flex items-center gap-3 relative z-10">
                <AlertTriangle size={32} className="text-accent"/> Layanan Pengaduan
            </h1>
            <p className="opacity-90 mt-2 text-neutral relative z-10">Sampaikan aspirasi dengan jelas, sertakan lokasi dan bukti foto.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-bold text-primary mb-2 text-sm uppercase tracking-wider">Nama Pelapor</label>
                    <input type="text" required className="w-full p-3 rounded-xl border border-neutral bg-surface focus:bg-white focus:border-secondary outline-none transition-all text-primary font-medium" 
                        onChange={e => setFormData({...formData, nama_pelapor: e.target.value})} />
                </div>
                <div>
                    <label className="block font-bold text-primary mb-2 text-sm uppercase tracking-wider">No. HP / WA</label>
                    <input type="text" required className="w-full p-3 rounded-xl border border-neutral bg-surface focus:bg-white focus:border-secondary outline-none transition-all text-primary font-medium" 
                        onChange={e => setFormData({...formData, no_hp: e.target.value})} />
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-bold text-primary mb-2 text-sm uppercase tracking-wider">Judul Laporan</label>
                    <input type="text" placeholder="Contoh: Jalan Rusak" required className="w-full p-3 rounded-xl border border-neutral bg-surface focus:bg-white focus:border-secondary outline-none transition-all text-primary font-medium" 
                        onChange={e => setFormData({...formData, judul_laporan: e.target.value})} />
                </div>
                <div>
                    <label className="block font-bold text-primary mb-2 text-sm uppercase tracking-wider flex items-center gap-1"><MapPin size={16}/> Lokasi Kejadian</label>
                    <input type="text" placeholder="Contoh: Dusun 2, RT 01" required className="w-full p-3 rounded-xl border border-neutral bg-surface focus:bg-white focus:border-secondary outline-none transition-all text-primary font-medium" 
                        onChange={e => setFormData({...formData, lokasi: e.target.value})} />
                </div>
            </div>
            
            <div>
                <label className="block font-bold text-primary mb-2 text-sm uppercase tracking-wider">Detail Kejadian</label>
                <textarea rows="4" required className="w-full p-3 rounded-xl border border-neutral bg-surface focus:bg-white focus:border-secondary outline-none transition-all text-primary font-medium" 
                    placeholder="Jelaskan kronologi secara rinci..." 
                    onChange={e => setFormData({...formData, isi_laporan: e.target.value})}></textarea>
            </div>

            {/* Upload Area */}
            <div>
                <label className="block font-bold text-primary mb-2 text-sm uppercase tracking-wider">Foto Bukti <span className="text-red-500 text-xs normal-case">(Wajib)</span></label>
                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer relative group ${foto ? 'border-secondary bg-secondary/5' : 'border-neutral hover:border-accent hover:bg-neutral/20'}`}>
                    <input type="file" accept="image/*" required onChange={e => setFoto(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <div className="flex flex-col items-center text-slate-500 group-hover:text-primary transition-colors">
                        {foto ? (
                            <>
                                <CheckCircle size={32} className="mb-2 text-secondary" />
                                <span className="font-bold text-primary">{foto.name}</span>
                                <span className="text-xs text-secondary mt-1">Klik untuk ganti foto</span>
                            </>
                        ) : (
                            <>
                                <Camera size={32} className="mb-2 text-neutral group-hover:text-accent transition-colors" />
                                <span className="font-medium text-primary">Klik untuk upload foto kejadian</span>
                                <span className="text-xs text-slate-400 mt-1">*Wajib menyertakan bukti</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <button disabled={loading} className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 flex justify-center items-center gap-2 transition-all hover:-translate-y-1">
                {loading ? 'Mengirim...' : <><Send size={20}/> Kirim Laporan</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}