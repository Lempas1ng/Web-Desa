// src/data.js

export const villageInfo = {
  name: "Desa Sukajaya Lempasing",
  district: "Teluk Pandan",
  regency: "Pesawaran",
  province: "Lampung",
  description: "Selamat datang di website resmi Desa Sukajaya Lempasing. Desa pesisir yang asri dengan potensi wisata bahari yang memukau dan kreativitas UMKM warganya yang mendunia.",
  heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
};

export const statsData = [
  { id: 1, value: "2.500+", label: "Penduduk" },
  { id: 2, value: "450", label: "Kepala Keluarga" },
  { id: 3, value: "10+", label: "Destinasi Wisata" },
  { id: 4, value: "25+", label: "UMKM Aktif" },
];

export const featuresData = [
  {
    title: "Pelayanan Terpadu",
    desc: "Akses pelayanan administrasi desa yang cepat, transparan, dan ramah bagi seluruh warga.",
    icon: "FileText"
  },
  {
    title: "Potensi Bahari",
    desc: "Garis pantai yang indah menjadi pusat ekonomi dan pariwisata unggulan desa.",
    icon: "Anchor"
  },
  {
    title: "Ekonomi Kreatif",
    desc: "Pusat oleh-oleh dan kerajinan tangan hasil karya warga lokal yang berkualitas.",
    icon: "ShoppingBag"
  }
];

export const wisataData = [
  {
    id: 1,
    title: "Pantai Wisata",
    description: "Nikmati keindahan pantai dengan pasir putih dan ombak yang tenang, cocok untuk liburan keluarga.",
    longDescription: "Pantai ini merupakan primadona desa kami. Dengan garis pantai yang landai dan ombak yang tenang, sangat aman untuk anak-anak bermain air. Tersedia juga penyewaan ban dan pondokan untuk keluarga bersantai sambil menikmati kelapa muda. Pemandangan matahari terbenam di sini juga sangat memukau.",
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop",
    location: "Dusun 1, Sukajaya Lempasing",
    price: "Rp 10.000 / orang"
  },
  {
    id: 2,
    title: "Ekowisata Mangrove",
    description: "Kawasan konservasi bakau yang menawarkan pemandangan hijau nan sejuk serta edukasi lingkungan.",
    longDescription: "Kawasan konservasi ini tidak hanya menawarkan pemandangan indah, tetapi juga edukasi mengenai pentingnya bakau untuk mencegah abrasi. Pengunjung dapat menyusuri jembatan kayu yang membelah hutan bakau yang rimbun dan melihat berbagai biota laut.",
    image: "https://images.unsplash.com/photo-1621849405022-7772719bd941?q=80&w=1974&auto=format&fit=crop",
    location: "Dusun 3, Sukajaya Lempasing",
    price: "Gratis (Donasi sukarela)"
  }
];

export const umkmData = [
  {
    id: 1,
    name: "Keripik Pisang Khas",
    owner: "Ibu Siti",
    description: "Oleh-oleh wajib berupa keripik pisang dengan berbagai varian rasa.",
    longDescription: "Keripik pisang Ibu Siti dibuat dari pisang kepok pilihan yang dipanen langsung dari kebun warga. Tersedia rasa coklat, keju, balado, dan original. Proses penggorengan dilakukan setiap hari sehingga produk selalu fresh.",
    image: "https://images.unsplash.com/photo-1604543166870-07e174780521?q=80&w=2070&auto=format&fit=crop",
    contact: "0812-3456-7890",
    priceRange: "Rp 15.000 - Rp 25.000"
  },
  {
    id: 2,
    name: "Kerajinan Tangan",
    owner: "Kelompok Pemuda",
    description: "Produk kerajinan unik yang terbuat dari bahan daur ulang dan hasil laut.",
    longDescription: "Kelompok pemuda desa mengolah limbah kerang dan plastik menjadi hiasan dinding, gantungan kunci, dan souvenir cantik. Membeli produk ini berarti Anda turut menjaga kebersihan lingkungan desa sekaligus memberdayakan pemuda kreatif.",
    image: "https://images.unsplash.com/photo-1513682976269-65a882d56a73?q=80&w=2070&auto=format&fit=crop",
    contact: "0898-7654-3210",
    priceRange: "Mulai dari Rp 5.000"
  }
];

// --- DATA BARU UNTUK BERITA ---
export const beritaData = [
  {
    id: 1,
    title: "Penyuluhan Kesehatan Lansia di Balai Desa",
    date: "10 Jan 2025",
    author: "Admin Desa",
    category: "Kesehatan",
    snippet: "Kegiatan rutin posyandu lansia kembali digelar dengan antusiasme tinggi dari warga...",
    content: "Kegiatan rutin posyandu lansia kembali digelar dengan antusiasme tinggi dari warga. Acara ini dihadiri oleh petugas puskesmas kecamatan yang memberikan pemeriksaan gratis berupa cek tensi, gula darah, dan kolesterol. Kepala Desa berharap kegiatan ini dapat terus meningkatkan kualitas hidup para lansia di Desa Sukajaya Lempasing.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Gotong Royong Bersihkan Pantai",
    date: "08 Jan 2025",
    author: "Karang Taruna",
    category: "Lingkungan",
    snippet: "Warga bersama mahasiswa KKN bahu-membahu membersihkan area pesisir pantai...",
    content: "Warga bersama mahasiswa KKN bahu-membahu membersihkan area pesisir pantai untuk menyambut wisatawan. Kegiatan ini difokuskan pada pengangkatan sampah plastik yang terbawa ombak. Selain membersihkan, juga dilakukan pemasangan plang himbauan 'Jagalah Kebersihan' di beberapa titik strategis.",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Pelatihan Digital Marketing UMKM",
    date: "05 Jan 2025",
    author: "Tim KKN",
    category: "Ekonomi",
    snippet: "Mahasiswa KKN mengadakan workshop pembuatan konten media sosial untuk pemasaran...",
    content: "Mahasiswa KKN mengadakan workshop pembuatan konten media sosial untuk pemasaran produk UMKM lokal. Para pelaku usaha diajarkan cara mengambil foto produk yang menarik hanya dengan menggunakan HP, serta cara membuat caption yang menjual di Instagram dan WhatsApp.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
  }
];