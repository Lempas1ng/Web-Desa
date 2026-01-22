import { useState } from 'react';
import api from '../api'; 
import { Send, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LayananSurat() {
  const [formData, setFormData] = useState({
    nama_pemohon: '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: 'Laki-laki',
    pekerjaan: '',
    agama: 'Islam',
    alamat: '',
    no_hp: '',
    jenis_surat: 'Surat Keterangan Tidak Mampu (SKTM)',
    keterangan: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const daftarSurat = [
    "Surat Keterangan Tidak Mampu (SKTM)",
    "Surat Keterangan Domisili",
    "Surat Keterangan Usaha (SKU)",
    "Surat Keterangan Belum Menikah",
    "Surat Keterangan Kematian",
    "Surat Keterangan Pindah",
    "Surat Pengantar PBB",
    "Surat Pengantar Capil",
    "Lainnya"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/surat', formData);
      setSuccess(true);
      setLoading(false);
      
      // Auto WA (Ganti No HP Admin disini)
      const adminPhone = "6281234567890"; 
      setTimeout(() => {
        const text = `Halo Admin, saya ${formData.nama_pemohon} sudah mengajukan surat via web. Mohon dicek.`;
        window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`, '_blank');
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengirim. Pastikan Backend nyala!");
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
          <button onClick={() => setSuccess(false)} className="text-blue-600 font-bold hover:underline">Buat Surat Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="text-blue-600" /> Form Lengkap Pengajuan Surat
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* DATA PRIBADI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">NIK</label>
                    <input type="number" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.nik} onChange={(e) => setFormData({...formData, nik: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                    <input type="text" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.nama_pemohon} onChange={(e) => setFormData({...formData, nama_pemohon: e.target.value})} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tempat Lahir</label>
                    <input type="text" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.tempat_lahir} onChange={(e) => setFormData({...formData, tempat_lahir: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Lahir</label>
                    <input type="date" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.tanggal_lahir} onChange={(e) => setFormData({...formData, tanggal_lahir: e.target.value})} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Kelamin</label>
                    <select className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        value={formData.jenis_kelamin} onChange={(e) => setFormData({...formData, jenis_kelamin: e.target.value})}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Agama</label>
                    <select className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        value={formData.agama} onChange={(e) => setFormData({...formData, agama: e.target.value})}>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pekerjaan</label>
                <input type="text" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Contoh: Petani / Mahasiswa"
                    value={formData.pekerjaan} onChange={(e) => setFormData({...formData, pekerjaan: e.target.value})} />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap</label>
                <textarea required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                    rows="2"
                    value={formData.alamat} onChange={(e) => setFormData({...formData, alamat: e.target.value})}></textarea>
            </div>

            {/* DATA SURAT */}
            <div className="pt-4 border-t border-slate-200">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Surat</label>
                    <select className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        value={formData.jenis_surat} onChange={(e) => setFormData({...formData, jenis_surat: e.target.value})}>
                        {daftarSurat.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Keperluan Surat (Keterangan)</label>
                    <input type="text" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Contoh: Persyaratan Beasiswa"
                        value={formData.keterangan} onChange={(e) => setFormData({...formData, keterangan: e.target.value})} />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp</label>
                    <input type="number" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.no_hp} onChange={(e) => setFormData({...formData, no_hp: e.target.value})} />
                </div>
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