import { useState } from 'react';
import api from '../api'; 
import { Send, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LayananSurat() {
  const [formData, setFormData] = useState({
    nama_pemohon: '',
    nik: '',
    no_hp: '',
    jenis_surat: 'Surat Keterangan Tidak Mampu (SKTM)',
    keterangan: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Daftar Surat (Sudah Diupdate)
  const daftarSurat = [
    "Surat Keterangan Tidak Mampu (SKTM)",
    "Surat Keterangan Domisili",
    "Surat Keterangan Usaha (SKU)",
    "Surat Keterangan Belum Menikah",
    "Surat Keterangan Kematian",
    "Surat Keterangan Pindah",    // <-- Baru
    "Surat Pengantar PBB",        // <-- Baru
    "Surat Pengantar Capil",      // <-- Baru
    "Lainnya"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/surat', formData);
      setSuccess(true);
      setLoading(false);

      // --- AUTO WHATSAPP ---
      const adminPhone = "6281234567890"; // Ganti No WA Admin Desa
      const text = `Halo Admin, saya ${formData.nama_pemohon} (NIK: ${formData.nik}) sudah mengajukan *${formData.jenis_surat}* via web. Mohon diproses.`;
      
      setTimeout(() => {
        window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`, '_blank');
      }, 1500);

    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengirim data. Pastikan Backend nyala!");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 px-4 flex justify-center items-start bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Berhasil Terkirim!</h2>
          <p className="text-slate-600 mb-6">Anda akan dialihkan ke WhatsApp Admin untuk konfirmasi.</p>
          <button onClick={() => setSuccess(false)} className="text-primary font-bold hover:underline">
            Buat Surat Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="text-primary" /> Form Pengajuan Surat
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">NIK (Sesuai KTP)</label>
              <input type="number" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder="3507xxxxxxxxxxxx"
                value={formData.nik} onChange={(e) => setFormData({...formData, nik: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
              <input type="text" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
                value={formData.nama_pemohon} onChange={(e) => setFormData({...formData, nama_pemohon: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Surat</label>
              <select className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none bg-white"
                value={formData.jenis_surat} onChange={(e) => setFormData({...formData, jenis_surat: e.target.value})}>
                {daftarSurat.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp</label>
              <input type="number" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder="08xxxxxxxxxx"
                value={formData.no_hp} onChange={(e) => setFormData({...formData, no_hp: e.target.value})} />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all flex justify-center items-center gap-2">
              {loading ? 'Mengirim...' : <><Send size={18} /> Kirim Data</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}