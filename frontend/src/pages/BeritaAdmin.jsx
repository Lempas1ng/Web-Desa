import { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function BeritaAdmin() {
  const [beritaList, setBeritaList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // State Form terpisah
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [fileGambar, setFileGambar] = useState(null);

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

  // Submit Form (Tambah / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Gunakan FormData untuk support file upload
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('isi', isi);
    if (fileGambar) {
      formData.append('gambar', fileGambar);
    }

    const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    };

    try {
      if (isEditing) {
        // Trik Laravel: method PUT via POST dengan _method
        formData.append('_method', 'PUT'); 
        await api.post(`/berita/${currentId}`, formData, config);
        alert("Berita diperbarui!");
      } else {
        await api.post('/berita', formData, config);
        alert("Berita ditambahkan!");
      }
      resetForm();
      fetchBerita();
    } catch (error) {
      console.error("Gagal simpan", error);
      alert("Gagal menyimpan berita. Periksa koneksi atau ukuran gambar.");
    }
  };

  const resetForm = () => {
      setJudul('');
      setIsi('');
      setFileGambar(null);
      setIsEditing(false);
      setCurrentId(null);
      // Reset input file visual di browser
      const fileInput = document.getElementById('fileInput');
      if(fileInput) fileInput.value = ""; 
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setJudul(item.judul);
    setIsi(item.isi);
    setFileGambar(null); // Gambar kosongkan (tidak wajib upload ulang)
    window.scrollTo(0,0);
  };

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
            <Link to="/admin-dashboard" className="text-blue-600 hover:underline">← Dashboard</Link>
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
                type="text" required
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                value={judul} onChange={(e) => setJudul(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Upload Gambar (Opsional)</label>
              <input 
                id="fileInput"
                type="file" 
                accept="image/*"
                className="w-full border p-2 rounded"
                onChange={(e) => setFileGambar(e.target.files[0])}
              />
              <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG, GIF. Max: 5MB.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Isi Berita</label>
              <textarea 
                rows="6" required
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                value={isi} onChange={(e) => setIsi(e.target.value)}
              ></textarea>
            </div>

            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                {isEditing ? 'Simpan Perubahan' : 'Terbitkan Berita'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400">
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
              <div key={item.id} className="flex gap-4 border-b pb-4 items-start last:border-0">
                {/* Thumbnail */}
                <div className="w-24 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <img 
                        src={item.gambar_url} 
                        alt="thumb" 
                        className="w-full h-full object-cover"
                        onError={(e) => {e.target.src="https://via.placeholder.com/150?text=No+Img"}}
                    />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-800">{item.judul}</h3>
                  <p className="text-slate-500 text-xs mt-1">
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </p>
                  <p className="text-slate-600 text-sm line-clamp-1 mt-1">{item.isi}</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 font-medium text-sm">Hapus</button>
                </div>
              </div>
            ))}
            {beritaList.length === 0 && (
                <p className="text-center text-gray-500">Belum ada berita.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}