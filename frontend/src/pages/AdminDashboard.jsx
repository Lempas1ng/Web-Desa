import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'; // Menggunakan konfigurasi axios yang sudah ada token-nya

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // State untuk menyimpan data statistik
  const [stats, setStats] = useState({
    total_surat: 0,
    total_berita: 0,
    total_user: 0,
    surat_terbaru: []
  });
  
  // State untuk user yang sedang login
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil Data saat halaman dibuka
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil info user
        const userRes = await api.get('/user');
        setUser(userRes.data);

        // 2. Ambil statistik dashboard
        const statRes = await api.get('/dashboard-stats');
        setStats(statRes.data);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        // Jika token expired atau error auth, lempar ke login
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Fungsi Logout
  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token'); // Hapus token dari browser
      navigate('/login'); // Kembali ke halaman login
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="text-slate-600 font-semibold animate-pulse">Memuat Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      
      {/* --- SIDEBAR KIRI (Desktop) --- */}
      <aside className="w-64 bg-slate-900 text-white flex-col hidden md:flex">
        <div className="p-6 text-xl font-bold border-b border-slate-700 flex items-center gap-2">
           <span>⚡ Admin Desa</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link to="/admin-dashboard" className="flex items-center gap-3 px-4 py-3 bg-indigo-600 rounded-lg text-white shadow-md transition">
             <span>📊</span> Dashboard
          </Link>
          <Link to="/surat-admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
             <span>📩</span> Kelola Surat
          </Link>
          <Link to="/berita-admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
             <span>📰</span> Kelola Berita
          </Link>
          
          <div className="pt-8 mt-4 border-t border-slate-700">
             <Link to="/" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-white transition">
               <span>🏠</span> Ke Website Utama
             </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-slate-800 rounded transition"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* --- KONTEN UTAMA (KANAN) --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header Atas */}
        <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800">
            Overview
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:block">
              Halo, <strong>{user?.name || 'Admin'}</strong>
            </span>
            {/* Tombol Logout Mobile */}
            <button onClick={handleLogout} className="md:hidden text-xs text-red-600 border border-red-200 px-3 py-1 rounded">
              Logout
            </button>
          </div>
        </header>

        {/* Area Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* STATISTIC CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Surat Masuk" 
              count={stats.total_surat} 
              icon="📩" 
              color="bg-blue-500" 
            />
            <StatCard 
              title="Berita Desa" 
              count={stats.total_berita} 
              icon="📰" 
              color="bg-emerald-500" 
            />
            <StatCard 
              title="User Admin" 
              count={stats.total_user} 
              icon="👤" 
              color="bg-indigo-500" 
            />
          </div>

          {/* RECENT ACTIVITY TABLE */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-semibold text-slate-700">Pengajuan Surat Terbaru</h2>
              <Link to="/surat-admin" className="text-sm text-indigo-600 hover:underline">Lihat Semua &rarr;</Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-white text-slate-500 uppercase tracking-wider font-medium text-xs border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Pemohon</th>
                    <th className="px-6 py-4">Jenis Surat</th>
                    <th className="px-6 py-4">Tanggal</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {stats.surat_terbaru && stats.surat_terbaru.length > 0 ? (
                    stats.surat_terbaru.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 font-medium text-slate-900">{item.nama_pemohon}</td>
                        <td className="px-6 py-4">{item.jenis_surat}</td>
                        <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                            item.status === 'selesai' 
                              ? 'bg-green-100 text-green-700' 
                              : item.status === 'ditolak' 
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-slate-400 italic">
                        Belum ada data surat masuk.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// Komponen Kecil untuk Kartu Statistik
function StatCard({ title, count, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 transition hover:shadow-md">
      <div className={`w-14 h-14 ${color} bg-opacity-10 text-white rounded-lg flex items-center justify-center text-2xl shadow-sm ${color.replace('bg-', 'text-').replace('500', '600')}`}>
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{count}</h3>
      </div>
    </div>
  );
}