import { useState, useEffect } from 'react';
import api from '../api'; 
import { Send, FileText, CheckCircle, ArrowLeft, Info, User, Users, MapPin, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LayananSurat() {
  const [formData, setFormData] = useState({
    nama_pemohon: '', nik: '', tempat_lahir: '', tanggal_lahir: '',
    jenis_kelamin: 'Laki-laki', pekerjaan: '', agama: 'Islam', alamat: '', no_hp: '',
    jenis_surat: 'Surat Keterangan Tidak Mampu (SKTM)', 
    keterangan: '', 
    
    nama_pasangan: '', nik_pasangan: '', tempat_lahir_pasangan: '', tanggal_lahir_pasangan: '',
    jenis_kelamin_pasangan: 'Perempuan', pekerjaan_pasangan: '', agama_pasangan: 'Islam', alamat_pasangan: ''
  });

  const [deathData, setDeathData] = useState({
    bin: '', hari: 'Senin', tanggal: '', sebab: '', makam: ''
  });

  const [pindahData, setPindahData] = useState({
    nik_kk: '', nama_kk: '', alamat_pindah: '', alasan: '', jumlah: ''
  });

  const [pengikut, setPengikut] = useState([
    { nama: '', ttl: '', shdk: '' } 
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const tambahBaris = () => {
    setPengikut([...pengikut, { nama: '', ttl: '', shdk: '' }]);
  };

  const hapusBaris = (index) => {
    const values = [...pengikut];
    values.splice(index, 1);
    setPengikut(values);
  };

  const handlePengikutChange = (index, field, value) => {
    const values = [...pengikut];
    values[index][field] = value;
    setPengikut(values);
  };

  useEffect(() => {
    if (formData.jenis_surat === "Surat Keterangan Kematian") {
      const gabungan = `${deathData.bin}|||${deathData.hari}|||${deathData.tanggal}|||${deathData.sebab}|||${deathData.makam}`;
      setFormData(prev => ({ ...prev, keterangan: gabungan }));
    
    } else if (formData.jenis_surat === "Surat Keterangan Pindah") {
      const dataTabel = JSON.stringify(pengikut);
      const gabungan = `${pindahData.nik_kk}|||${pindahData.nama_kk}|||${pindahData.alamat_pindah}|||${pindahData.alasan}|||${pindahData.jumlah}|||${dataTabel}`;
      setFormData(prev => ({ ...prev, keterangan: gabungan }));
    }
  }, [deathData, pindahData, pengikut, formData.jenis_surat]);

  const getFormLayout = (jenis) => {
    switch (jenis) {
      case "Surat Keterangan Telah Menikah":
        return {
          title1: "Biodata Suami", icon1: <User className="text-secondary" />,
          showPasangan: true, title2: "Biodata Istri", isKematian: false, isPindah: false,
          labelKet: "Tanggal & Lokasi Pernikahan", placeholderKet: "Contoh: 20 Januari 2025 di Desa Sukajaya", hintKet: "Isi sesuai tanggal dan tempat akad nikah."
        };
      case "Surat Keterangan Kematian":
        return {
          title1: "Biodata Yang Meninggal (Alm)", icon1: <User className="text-slate-500" />,
          showPasangan: false, isKematian: true, isPindah: false,
          labelKet: "Detail Meninggal Dunia", hintKet: "Lengkapi data kematian di atas."
        };
      case "Surat Keterangan Pindah":
        return {
          title1: "Biodata Pemohon Pindah", icon1: <MapPin className="text-secondary" />,
          showPasangan: false, isKematian: false, isPindah: true, 
          labelKet: "Detail Kepindahan", hintKet: "Lengkapi data kepindahan di atas."
        };
      case "Surat Keterangan Usaha (SKU)":
        return {
          title1: "Biodata Pemilik Usaha", icon1: <User className="text-secondary" />,
          showPasangan: false, isKematian: false, isPindah: false,
          labelKet: "Jenis Usaha", placeholderKet: "Contoh: Warung Sembako / Bengkel Motor", hintKet: "Sebutkan nama usaha yang dijalankan."
        };
      default:
        return {
          title1: "Biodata Pemohon", icon1: <User className="text-secondary" />,
          showPasangan: false, isKematian: false, isPindah: false,
          labelKet: "Keperluan Surat", placeholderKet: "Contoh: Persyaratan Beasiswa", hintKet: "Jelaskan untuk apa surat ini dibuat."
        };
    }
  };

  const layout = getFormLayout(formData.jenis_surat);
  
  const daftarSurat = [
    "Surat Keterangan Tidak Mampu (SKTM)", "Surat Keterangan Domisili", "Surat Keterangan Usaha (SKU)",
    "Surat Keterangan Belum Menikah", "Surat Keterangan Telah Menikah", "Surat Keterangan Kematian", 
    "Surat Keterangan Pindah", "Surat Pengantar PBB", "Surat Pengantar Capil"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/surat', formData);
      setSuccess(true);
      setLoading(false);
      
      const adminPhone = "6281234567890"; 
      setTimeout(() => {
        const text = `Halo Admin, saya ${formData.nama_pemohon} mengajukan *${formData.jenis_surat}*. Mohon diproses.`;
        window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`, '_blank');
      }, 1500);
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim data. Pastikan server nyala.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!layout.showPasangan) setFormData(prev => ({...prev, nama_pasangan: '', nik_pasangan: ''})); 
    if (!layout.isKematian) setDeathData({bin: '', hari: 'Senin', tanggal: '', sebab: '', makam: ''});
    if (!layout.isPindah) {
        setPindahData({nik_kk: '', nama_kk: '', alamat_pindah: '', alasan: '', jumlah: ''});
        setPengikut([{ nama: '', ttl: '', shdk: '' }]); 
    }
  }, [formData.jenis_surat]);

  if (success) {
    return (
      <div className="min-h-screen pt-32 px-4 flex justify-center items-start bg-surface">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center border border-neutral">
          <CheckCircle size={40} className="text-secondary mx-auto mb-4"/>
          <h2 className="text-2xl font-bold text-primary mb-2">Berhasil Terkirim!</h2>
          <p className="text-slate-600 mb-6">Data sudah masuk sistem. Silakan hubungi admin.</p>
          <button onClick={() => setSuccess(false)} className="text-accent font-bold hover:underline">Buat Surat Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-surface">
      <div className="max-w-3xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-secondary hover:text-accent mb-6 transition-colors font-medium">
          <ArrowLeft size={20} className="mr-2" /> Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral p-6 md:p-8 relative">
           {/* Hiasan atas */}
           <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-2xl"></div>

          <h1 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <div className="p-2 bg-neutral/30 rounded-lg text-primary"><FileText size={24} /></div>
            Form Layanan Surat Online
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. PILIH JENIS SURAT */}
            <div className="bg-surface p-5 rounded-xl border border-neutral">
                <label className="block text-sm font-bold text-primary mb-2">Pilih Jenis Surat</label>
                <select className="w-full px-4 py-3 rounded-lg border-2 border-neutral focus:border-secondary outline-none bg-white font-semibold text-slate-700 transition-colors"
                    value={formData.jenis_surat} onChange={(e) => setFormData({...formData, jenis_surat: e.target.value, keterangan: ''})}>
                    {daftarSurat.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {/* 2. BIODATA UTAMA */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary border-b border-neutral pb-2 flex items-center gap-2">
                    {layout.icon1} {layout.title1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="label-text">NIK</label><input type="number" required className="input-field" value={formData.nik} onChange={(e) => setFormData({...formData, nik: e.target.value})} /></div>
                    <div><label className="label-text">Nama Lengkap</label><input type="text" required className="input-field" value={formData.nama_pemohon} onChange={(e) => setFormData({...formData, nama_pemohon: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="label-text">Tempat Lahir</label><input type="text" required className="input-field" value={formData.tempat_lahir} onChange={(e) => setFormData({...formData, tempat_lahir: e.target.value})} /></div>
                    <div><label className="label-text">Tanggal Lahir</label><input type="date" required className="input-field" value={formData.tanggal_lahir} onChange={(e) => setFormData({...formData, tanggal_lahir: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="label-text">Jenis Kelamin</label>
                        <select className="input-field bg-white" value={formData.jenis_kelamin} onChange={(e) => setFormData({...formData, jenis_kelamin: e.target.value})}>
                            <option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div><label className="label-text">Agama</label>
                        <select className="input-field bg-white" value={formData.agama} onChange={(e) => setFormData({...formData, agama: e.target.value})}>
                            <option value="Islam">Islam</option><option value="Kristen">Kristen</option><option value="Katolik">Katolik</option><option value="Hindu">Hindu</option><option value="Buddha">Buddha</option>
                        </select>
                    </div>
                </div>
                <div><label className="label-text">Pekerjaan</label><input type="text" required className="input-field" value={formData.pekerjaan} onChange={(e) => setFormData({...formData, pekerjaan: e.target.value})} /></div>
                <div><label className="label-text">Alamat Lengkap</label><textarea required className="input-field" rows="2" value={formData.alamat} onChange={(e) => setFormData({...formData, alamat: e.target.value})}></textarea></div>
            </div>

            {/* 3. FORM PASANGAN (OPSIONAL) */}
            {layout.showPasangan && (
            <div className="space-y-4 bg-neutral/20 p-6 rounded-xl border border-neutral animate-fade-in">
                <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 flex items-center gap-2"><Users className="text-secondary" /> {layout.title2}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="label-text">NIK Pasangan</label><input type="number" required className="input-field border-neutral" value={formData.nik_pasangan} onChange={(e) => setFormData({...formData, nik_pasangan: e.target.value})} /></div>
                    <div><label className="label-text">Nama Pasangan</label><input type="text" required className="input-field border-neutral" value={formData.nama_pasangan} onChange={(e) => setFormData({...formData, nama_pasangan: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="label-text">Tempat Lahir</label><input type="text" required className="input-field border-neutral" value={formData.tempat_lahir_pasangan} onChange={(e) => setFormData({...formData, tempat_lahir_pasangan: e.target.value})} /></div>
                    <div><label className="label-text">Tanggal Lahir</label><input type="date" required className="input-field border-neutral" value={formData.tanggal_lahir_pasangan} onChange={(e) => setFormData({...formData, tanggal_lahir_pasangan: e.target.value})} /></div>
                </div>
            </div>
            )}

            {/* 4. DETAIL SURAT */}
            <div className="bg-surface p-5 rounded-xl border border-neutral animate-fade-in">
                <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2"><Info size={20} className="text-accent"/> Detail Surat</h3>

                {/* --- INPUT KHUSUS KEMATIAN --- */}
                {layout.isKematian ? (
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div><label className="label-text">Bin / Binti</label><input type="text" required className="input-field" placeholder="Contoh: Bpk. Supriyadi" value={deathData.bin} onChange={(e) => setDeathData({...deathData, bin: e.target.value})} /></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="label-text">Hari</label><select className="input-field bg-white" value={deathData.hari} onChange={(e) => setDeathData({...deathData, hari: e.target.value})}><option value="Senin">Senin</option><option value="Selasa">Selasa</option><option value="Rabu">Rabu</option><option value="Kamis">Kamis</option><option value="Jumat">Jumat</option><option value="Sabtu">Sabtu</option><option value="Minggu">Minggu</option></select></div>
                            <div><label className="label-text">Tanggal</label><input type="date" required className="input-field" value={deathData.tanggal} onChange={(e) => setDeathData({...deathData, tanggal: e.target.value})} /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="label-text">Penyebab</label><input type="text" required className="input-field" value={deathData.sebab} onChange={(e) => setDeathData({...deathData, sebab: e.target.value})} /></div>
                            <div><label className="label-text">Makam</label><input type="text" required className="input-field" value={deathData.makam} onChange={(e) => setDeathData({...deathData, makam: e.target.value})} /></div>
                        </div>
                    </div>
                
                /* --- INPUT KHUSUS PINDAH --- */
                ) : layout.isPindah ? (
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div><label className="label-text">No. Kartu Keluarga (KK)</label><input type="number" required className="input-field" value={pindahData.nik_kk} onChange={(e) => setPindahData({...pindahData, nik_kk: e.target.value})} /></div>
                             <div><label className="label-text">Nama Kepala Keluarga</label><input type="text" required className="input-field" value={pindahData.nama_kk} onChange={(e) => setPindahData({...pindahData, nama_kk: e.target.value})} /></div>
                        </div>
                        <div><label className="label-text">Alamat Tujuan Pindah</label><textarea required className="input-field" rows="2" placeholder="Jl. Mawar No 5, Bandar Lampung" value={pindahData.alamat_pindah} onChange={(e) => setPindahData({...pindahData, alamat_pindah: e.target.value})}></textarea></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div><label className="label-text">Alasan Pindah</label><input type="text" required className="input-field" placeholder="Contoh: Ikut Suami / Pekerjaan" value={pindahData.alasan} onChange={(e) => setPindahData({...pindahData, alasan: e.target.value})} /></div>
                             <div><label className="label-text">Jumlah Keluarga Pindah</label><input type="text" required className="input-field" placeholder="Contoh: 1 Orang" value={pindahData.jumlah} onChange={(e) => setPindahData({...pindahData, jumlah: e.target.value})} /></div>
                        </div>

                        {/* --- TABEL DINAMIS PENGIKUT --- */}
                        <div className="mt-4 border-t-2 border-neutral pt-4">
                            <label className="label-text font-bold mb-2">Daftar Anggota Keluarga yang Pindah:</label>
                            {pengikut.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-2 items-end bg-surface p-2 rounded-lg border border-neutral">
                                    <div className="md:col-span-3">
                                        <input type="text" placeholder="Nama Lengkap" className="input-field text-sm" value={item.nama} onChange={(e) => handlePengikutChange(index, 'nama', e.target.value)} required />
                                    </div>
                                    <div className="md:col-span-2">
                                        <input type="text" placeholder="Tempat, Tgl Lahir" className="input-field text-sm" value={item.ttl} onChange={(e) => handlePengikutChange(index, 'ttl', e.target.value)} required />
                                    </div>
                                    <div className="md:col-span-1">
                                        <select className="input-field text-sm bg-white" value={item.shdk} onChange={(e) => handlePengikutChange(index, 'shdk', e.target.value)} required>
                                            <option value="">Status...</option><option value="ISTRI">ISTRI</option><option value="ANAK">ANAK</option><option value="FAMILI">FAMILI</option><option value="LAINNYA">LAINNYA</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-1 flex justify-center">
                                        {pengikut.length > 1 && (
                                            <button type="button" onClick={() => hapusBaris(index)} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"><Trash2 size={16} /></button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={tambahBaris} className="mt-2 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary hover:underline transition-colors"><Plus size={16} /> Tambah Anggota Keluarga</button>
                        </div>
                    </div>

                ) : (
                    /* --- SURAT LAINNYA --- */
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-primary mb-1">{layout.labelKet} <span className="text-red-500">*</span></label>
                        <textarea required className="w-full px-4 py-3 rounded-lg border-2 border-neutral focus:border-accent outline-none transition-colors" rows="3"
                            placeholder={layout.placeholderKet} value={formData.keterangan} onChange={(e) => setFormData({...formData, keterangan: e.target.value})}></textarea>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-bold text-primary mb-1">Nomor WhatsApp (Aktif)</label>
                    <input type="number" required className="input-field border-neutral focus:ring-secondary" placeholder="Contoh: 08123456789"
                        value={formData.no_hp} onChange={(e) => setFormData({...formData, no_hp: e.target.value})} />
                </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 text-lg hover:-translate-y-1">
              {loading ? 'Sedang Mengirim...' : <><Send size={20} /> Kirim Permohonan</>}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .label-text { display: block; font-size: 0.875rem; font-weight: 600; color: #40513B; margin-bottom: 0.25rem; }
        .input-field { width: 100%; padding: 0.75rem 1rem; border-radius: 0.5rem; border: 1px solid #E5D9B6; outline: none; transition: all; background-color: #FAF9F6; color: #40513B; font-weight: 500; }
        .input-field:focus { border-color: #628141; box-shadow: 0 0 0 3px rgba(98, 129, 65, 0.1); background-color: #fff; }
      `}</style>
    </div>
  );
}