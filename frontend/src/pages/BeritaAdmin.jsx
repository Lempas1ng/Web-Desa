import { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function BeritaAdmin() {
  const [beritaList, setBeritaList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // State Form
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    gambar: ''
  });

  // Ambil data berita
  const fetchBerita = async () => {
    try {
      const res = await api.get('/berita');
      setBeritaList(res.data);
    } catch (error) {
      console.error("Gagal load berita", error);
    }
  };

  useEffect(() => { fetchBerita(); }, []);

  // Handle Input Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form (Tambah / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/berita/${currentId}`, formData);
        alert("Berita diperbarui!");
      } else {
        await api.post('/berita', formData);
        alert("Berita ditambahkan!");
      }
      setFormData({ judul: '', konten: '', gambar: '' });
      setIsEditing(false);
      fetchBerita();
    } catch (error) {
      console.error("Gagal simpan", error);
      alert("Terjadi kesalahan.");
    }
  };

  // Handle Edit
  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({
      judul: item.judul,
      konten: item.konten,
      gambar: item.gambar || ''
    });
    window.scrollTo(0,0);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if(!confirm("Yakin hapus berita ini?")) return;
    try {
      await api.delete(`/berita/${id}`);
      fetchBerita();
    } catch (error) {
      console.error("Gagal hapus", error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-800">📰 Kelola Berita</h1>
            <Link to="/admin-dashboard" className="text-blue-600 hover:underline">← Kembali ke Dashboard</Link>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-slate-800">
            {isEditing ? '✏️ Edit Berita' : '📝 Tambah Berita Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Judul Berita</label>
              <input 
                type="text" name="judul" required
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                value={formData.judul} onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Link Gambar (URL)</label>
              <input 
                type="text" name="gambar" placeholder="https://..."
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                value={formData.gambar} onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Isi Berita</label>
              <textarea 
                name="konten" rows="4" required
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                value={formData.konten} onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                {isEditing ? 'Simpan Perubahan' : 'Terbitkan Berita'}
              </button>
              {isEditing && (
                <button type="button" onClick={() => { setIsEditing(false); setFormData({judul:'', konten:'', gambar:''}); }} className="bg-slate-300 text-slate-700 px-4 py-2 rounded">
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* --- LIST SECTION --- */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-slate-800">Daftar Berita</h2>
          <div className="space-y-4">
            {beritaList.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{item.judul}</h3>
                  <p className="text-slate-500 text-sm">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="text-yellow-600 hover:text-yellow-700 font-medium">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 font-medium">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}