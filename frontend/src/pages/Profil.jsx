import { villageInfo } from '../data';

export default function Profil() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Profil Desa</h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Sejarah & Geografis</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
             Desa Sukajaya Lempasing terletak di wilayah pesisir Kabupaten Pesawaran. 
             (Di sini Anda bisa menambahkan teks sejarah panjang desa atau visi misi).
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-4 text-primary">Visi</h3>
              <p className="text-gray-600">Mewujudkan Desa Sukajaya Lempasing yang maju, mandiri, dan sejahtera berbasis potensi lokal.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-4 text-primary">Misi</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Mengembangkan potensi pariwisata bahari.</li>
                <li>Meningkatkan pemberdayaan UMKM masyarakat.</li>
                <li>Meningkatkan pelayanan publik yang transparan.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}