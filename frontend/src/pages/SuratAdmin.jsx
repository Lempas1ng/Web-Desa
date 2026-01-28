import { useState, useEffect } from 'react';
import api from '../api'; 
import { FileText, Printer, CheckCircle, Clock, Search, XCircle, Filter, ChevronDown, User } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import Swal from 'sweetalert2';

export default function SuratAdmin() {
  const [suratList, setSuratList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua'); // Semua, Menunggu, Selesai, Ditolak

  // Base URL untuk print (sesuaikan dengan backend Anda)
  const API_BASE_URL = 'http://127.0.0.1:8000/api'; 

  // Ambil Data Surat
  const fetchSurat = async () => {
    try {
      setLoading(true);
      const response = await api.get('/surat'); 
      setSuratList(response.data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
      Swal.fire('Error', 'Gagal mengambil data surat.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurat();
  }, []);

  // Update Status (Terima / Tolak) dengan SweetAlert2
  const updateStatus = async (id, newStatus) => {
    const isApprove = newStatus === 'Selesai';
    
    const result = await Swal.fire({
      title: isApprove ? 'Setujui Permohonan?' : 'Tolak Permohonan?',
      text: isApprove 
        ? "Surat akan ditandai sebagai Selesai dan siap diambil." 
        : "Permohonan warga akan ditolak. Pastikan alasan jelas.",
      icon: isApprove ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonColor: isApprove ? '#2563eb' : '#dc2626', // Blue / Red
      cancelButtonColor: '#94a3b8',
      confirmButtonText: isApprove ? 'Ya, Setujui' : 'Ya, Tolak',
      cancelButtonText: 'Batal'
    });

    if (!result.isConfirmed) return;

    try {
      await api.put(`/surat/${id}`, { status: newStatus });
      
      // Notifikasi Sukses
      Swal.fire({
        title: 'Berhasil!',
        text: `Status surat berhasil diperbarui menjadi ${newStatus}.`,
        icon: 'success',
        confirmButtonColor: '#2563eb',
        timer: 1500,
        showConfirmButton: false
      });

      fetchSurat(); // Refresh data
    } catch (error) {
      console.error(error);
      Swal.fire('Gagal', 'Terjadi kesalahan saat memperbarui status.', 'error');
    }
  };

  // Logika Filter Data
  const filteredList = suratList.filter((item) => {
    const matchStatus = filterStatus === 'Semua' ? true : item.status === filterStatus;
    const lowerSearch = searchTerm.toLowerCase();
    const matchSearch = 
      item.nama_pemohon?.toLowerCase().includes(lowerSearch) || 
      (item.nik || item.nik_pemohon)?.includes(lowerSearch) ||
      item.jenis_surat?.toLowerCase().includes(lowerSearch);

    return matchStatus && matchSearch;
  });

  // Komponen Badge Status (Reusable)
  const StatusBadge = ({ status }) => {
    if (status === 'Selesai') {
      return <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200"><CheckCircle size={14}/> Selesai</span>;
    } else if (status === 'Ditolak') {
      return <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold border border-red-200"><XCircle size={14}/> Ditolak</span>;
    }
    return <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-bold border border-yellow-200"><Clock size={14}/> Menunggu</span>;
  };

  return (
    <AdminLayout title="Verifikasi Surat">
      
      {/* --- HEADER CONTROLS (Search & Filter) --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Daftar Permohonan
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{filteredList.length}</span>
          </h2>
          <p className="text-slate-500 text-sm">Kelola pengajuan surat warga</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Cari Nama / NIK..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-40">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <Filter size={16} />
            </div>
            <select 
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none appearance-none text-sm font-bold text-slate-700 cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Selesai">Selesai</option>
              <option value="Ditolak">Ditolak</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16}/>
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center animate-pulse">
            <div className="w-10 h-10 bg-slate-200 rounded-full mb-3"></div>
            <p>Mengambil data surat...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredList.length === 0 && (
          <div className="p-12 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <FileText size={32} />
            </div>
            <h3 className="text-slate-800 font-bold mb-1">Tidak ditemukan</h3>
            <p className="text-slate-500 text-sm">Belum ada pengajuan surat yang sesuai filter.</p>
          </div>
        )}

        {/* --- DESKTOP VIEW (Table) --- */}
        {!loading && filteredList.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4 border-b border-slate-100">Tanggal</th>
                  <th className="p-4 border-b border-slate-100">Pemohon</th>
                  <th className="p-4 border-b border-slate-100">Jenis Surat</th>
                  <th className="p-4 border-b border-slate-100">Status</th>
                  <th className="p-4 border-b border-slate-100 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredList.map((surat) => (
                  <tr key={surat.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {new Date(surat.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      <div className="text-xs text-slate-400 mt-1">{new Date(surat.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute:'2-digit' })}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-700 flex items-center gap-2">
                         {surat.nama_pemohon}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5 bg-slate-100 inline-block px-1 rounded">
                        {surat.nik || surat.nik_pemohon}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-slate-700 font-medium">
                        {surat.jenis_surat}
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={surat.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-2">
                        <a 
                          href={`${API_BASE_URL}/surat/${surat.id}/cetak`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip"
                          title="Cetak PDF"
                        >
                          <Printer size={18} />
                        </a>

                        {surat.status === 'Menunggu' && (
                          <>
                            <button 
                              onClick={() => updateStatus(surat.id, 'Selesai')}
                              className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Setujui (Acc)"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button 
                              onClick={() => updateStatus(surat.id, 'Ditolak')}
                              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Tolak"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- MOBILE VIEW (Cards) --- */}
        {!loading && filteredList.length > 0 && (
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {filteredList.map((surat) => (
              <div key={surat.id} className="p-5 flex flex-col gap-3">
                
                {/* Header Card: Status & Tanggal */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-1">
                      {new Date(surat.created_at).toLocaleDateString('id-ID')}
                    </span>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{surat.jenis_surat}</h3>
                  </div>
                  <StatusBadge status={surat.status} />
                </div>

                {/* Body Card: Data Pemohon */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full text-slate-400 shadow-sm">
                    <User size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-700 truncate">{surat.nama_pemohon}</p>
                    <p className="text-xs text-slate-500 font-mono">NIK: {surat.nik || surat.nik_pemohon}</p>
                  </div>
                </div>

                {/* Footer Card: Actions */}
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <a 
                    href={`${API_BASE_URL}/surat/${surat.id}/cetak`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition"
                  >
                    <Printer size={16} /> Print
                  </a>

                  {surat.status === 'Menunggu' ? (
                    <>
                      <button 
                        onClick={() => updateStatus(surat.id, 'Selesai')}
                        className="flex items-center justify-center gap-2 py-2 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition shadow-sm shadow-green-200"
                      >
                        <CheckCircle size={16} /> Acc
                      </button>
                      <button 
                        onClick={() => updateStatus(surat.id, 'Ditolak')}
                        className="flex items-center justify-center gap-2 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition"
                      >
                        <XCircle size={16} /> Tolak
                      </button>
                    </>
                  ) : (
                    <div className="col-span-2 flex items-center justify-center text-xs text-slate-400 bg-slate-50 rounded-lg border border-slate-100">
                      Tidak ada aksi
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </AdminLayout>
  );
}