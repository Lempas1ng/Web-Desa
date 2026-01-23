import { useState } from 'react';
import api from '../api'; 
import { Send, FileText, CheckCircle, ArrowLeft, Info, Heart } from 'lucide-react'; 
import { Link } from 'react-router-dom';

export default function LayananSurat() {
  const [formData, setFormData] = useState({
    // Data Pemohon
    nama_pemohon: '', nik: '', tempat_lahir: '', tanggal_lahir: '',
    jenis_kelamin: 'Laki-laki', pekerjaan: '', agama: 'Islam', alamat: '', no_hp: '',
    
    // Data Surat
    jenis_surat: 'Surat Keterangan Tidak Mampu (SKTM)', keterangan: '',
    
    // Data Pasangan (Default Kosong)
    nama_pasangan: '', nik_pasangan: '', tempat_lahir_pasangan: '', tanggal_lahir_pasangan: '',
    jenis_kelamin_pasangan: 'Perempuan', pekerjaan_pasangan: '', agama_pasangan: 'Islam', alamat_pasangan: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // LOGIKA DINAMIS
  const butuhPasangan = formData.jenis_surat === "Surat Keterangan Telah Menikah";

  const getFormConfig = (jenis) => {
    switch (jenis) {
      case "Surat Keterangan Telah Menikah":
        return { label: "Tanggal & Lokasi Pernikahan", placeholder: "Contoh: 18 Desember 2025 di Desa Sukajaya", hint: "Isi Tanggal dan Lokasi Nikah." };
      case "Surat Keterangan Usaha (SKU)":
        return { label: "Jenis Usaha", placeholder: "Contoh: Warung Sembako / Bengkel", hint: "Nama usaha yang dijalankan." };
      case "Surat Keterangan Pindah":
        return { label: "Alamat Tujuan Pindah", placeholder: "Contoh: Jl. Mawar, Bandar Lampung", hint: "Alamat lengkap tujuan pindah." };
      case "Surat Keterangan Kematian":
        return { label: "Detail Meninggal", placeholder: "Hari:..., Jam:..., Penyebab:...", hint: "Detail waktu kematian." };
      case "Izin Keramaian":
        return { label: "Detail Acara", placeholder: "Acara Pernikahan, Hari Minggu, Hiburan Orgen", hint: "Detail acara keramaian." };
      default:
        return { label: "Keperluan Surat", placeholder: "Contoh: Persyaratan Beasiswa", hint: "Jelaskan kegunaan surat ini." };
    }
  };

  const currentConfig = getFormConfig(formData.jenis_surat);

  const daftarSurat = [
    "Surat Keterangan Tidak Mampu (SKTM)", "Surat Keterangan Domisili", "Surat Keterangan Usaha (SKU)",
    "Surat Keterangan Belum Menikah", "Surat Keterangan Telah Menikah", 
    "Surat Keterangan Kematian", "Surat Keterangan Pindah", "Surat Pengantar PBB", "Surat Pengantar Capil", "Izin Keramaian"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/surat', formData);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      alert("Gagal mengirim data. Cek koneksi backend!");
      setLoading(false);
    }
  };

  if (success) {
    return (
        <div className="min-h-screen pt-32 px-4 flex justify-center items-start bg-slate-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
            <CheckCircle size={40} className="text-green-500 mx-auto mb-4"/>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Berhasil Terkirim!</h2>
            <button onClick={() => setSuccess(false)} className="text-blue-600 font-bold hover:underline">Buat Lagi</button>
          </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <Link to="/" className="text-slate-500 hover:text-blue-600 mb-6 inline-flex items-center"><ArrowLeft size={20} className="mr-2" /> Kembali</Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Form Layanan Surat</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. PILIH SURAT */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <label className="block text-sm font-bold text-slate-800 mb-2">Pilih Jenis Surat</label>
                <select className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 outline-none bg-white font-bold text-slate-700"
                    value={formData.jenis_surat} onChange={(e) => setFormData({...formData, jenis_surat: e.target.value, keterangan: ''})}>
                    {daftarSurat.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {/* 2. BIODATA PEMOHON */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Biodata Pemohon</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="number" placeholder="NIK" required className="input-field w-full px-4 py-2 border rounded-lg" value={formData.nik} onChange={e => setFormData({...formData, nik: e.target.value})} />
                    <input type="text" placeholder="Nama Lengkap" required className="input-field w-full px-4 py-2 border rounded-lg" value={formData.nama_pemohon} onChange={e => setFormData({...formData, nama_pemohon: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Tempat Lahir" required className="input-field w-full px-4 py-2 border rounded-lg" value={formData.tempat_lahir} onChange={e => setFormData({...formData, tempat_lahir: e.target.value})} />
                    <input type="date" required className="input-field w-full px-4 py-2 border rounded-lg" value={formData.tanggal_lahir} onChange={e => setFormData({...formData, tanggal_lahir: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select className="w-full px-4 py-2 border rounded-lg bg-white" value={formData.jenis_kelamin} onChange={e => setFormData({...formData, jenis_kelamin: e.target.value})}>
                        <option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option>
                    </select>
                    <select className="w-full px-4 py-2 border rounded-lg bg-white" value={formData.agama} onChange={e => setFormData({...formData, agama: e.target.value})}>
                        <option value="Islam">Islam</option><option value="Kristen">Kristen</option><option value="Katolik">Katolik</option><option value="Hindu">Hindu</option><option value="Buddha">Buddha</option>
                    </select>
                </div>
                <input type="text" placeholder="Pekerjaan" required className="input-field w-full px-4 py-2 border rounded-lg" value={formData.pekerjaan} onChange={e => setFormData({...formData, pekerjaan: e.target.value})} />
                <textarea placeholder="Alamat Lengkap" required className="input-field w-full px-4 py-2 border rounded-lg" value={formData.alamat} onChange={e => setFormData({...formData, alamat: e.target.value})}></textarea>
            </div>

            {/* 3. BIODATA PASANGAN (PINK) - HANYA MUNCUL JIKA BUTUH */}
            {butuhPasangan && (
            <div className="space-y-4 bg-pink-50 p-4 rounded-xl border border-pink-200 mt-6">
                <h3 className="text-lg font-semibold text-pink-700 border-b border-pink-200 pb-2 flex items-center gap-2">
                    <Heart size={20} className="fill-pink-500 text-pink-500" /> Biodata Pasangan (Istri/Suami)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="number" placeholder="NIK Pasangan" required className="w-full px-4 py-2 border border-pink-200 rounded-lg" value={formData.nik_pasangan} onChange={e => setFormData({...formData, nik_pasangan: e.target.value})} />
                    <input type="text" placeholder="Nama Pasangan" required className="w-full px-4 py-2 border border-pink-200 rounded-lg" value={formData.nama_pasangan} onChange={e => setFormData({...formData, nama_pasangan: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input type="text" placeholder="Tempat Lahir" required className="w-full px-4 py-2 border border-pink-200 rounded-lg" value={formData.tempat_lahir_pasangan} onChange={e => setFormData({...formData, tempat_lahir_pasangan: e.target.value})} />
                     <input type="date" required className="w-full px-4 py-2 border border-pink-200 rounded-lg" value={formData.tanggal_lahir_pasangan} onChange={e => setFormData({...formData, tanggal_lahir_pasangan: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white" value={formData.jenis_kelamin_pasangan} onChange={e => setFormData({...formData, jenis_kelamin_pasangan: e.target.value})}>
                        <option value="Perempuan">Perempuan</option><option value="Laki-laki">Laki-laki</option>
                    </select>
                    <select className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-white" value={formData.agama_pasangan} onChange={e => setFormData({...formData, agama_pasangan: e.target.value})}>
                        <option value="Islam">Islam</option><option value="Kristen">Kristen</option>
                    </select>
                </div>
                <input type="text" placeholder="Pekerjaan Pasangan" required className="w-full px-4 py-2 border border-pink-200 rounded-lg" value={formData.pekerjaan_pasangan} onChange={e => setFormData({...formData, pekerjaan_pasangan: e.target.value})} />
                <textarea placeholder="Alamat Pasangan" required className="w-full px-4 py-2 border border-pink-200 rounded-lg" value={formData.alamat_pasangan} onChange={e => setFormData({...formData, alamat_pasangan: e.target.value})}></textarea>
            </div>
            )}

            {/* 4. DETAIL SURAT (DINAMIS) */}
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <label className="block text-sm font-bold text-slate-800 mb-1">{currentConfig.label}</label>
                <textarea required className="w-full px-4 py-2 rounded-lg border-2 border-yellow-200 outline-none" rows="2"
                    placeholder={currentConfig.placeholder} value={formData.keterangan} onChange={e => setFormData({...formData, keterangan: e.target.value})}></textarea>
                <p className="text-xs text-slate-500 mt-1">💡 Petunjuk: {currentConfig.hint}</p>

                <label className="block text-sm font-bold text-slate-800 mt-4 mb-1">No HP / WhatsApp</label>
                <input type="number" required className="w-full px-4 py-2 rounded-lg border-2 border-yellow-200 outline-none" value={formData.no_hp} onChange={e => setFormData({...formData, no_hp: e.target.value})} />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg">
              {loading ? 'Mengirim...' : 'Kirim Permohonan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}