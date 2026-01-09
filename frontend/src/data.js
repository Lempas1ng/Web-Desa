// src/data.js
// Nanti bagian ini bisa diganti dengan fetch API dari Laravel

export const villageInfo = {
  name: "Desa Sukajaya Lempasing",
  district: "Teluk Pandan", // Lempasing biasanya masuk Teluk Pandan/Pesawaran
  regency: "Pesawaran",
  province: "Lampung",
  description: "Selamat datang di website resmi Desa Sukajaya Lempasing. Desa pesisir yang asri dengan potensi wisata bahari dan kreativitas UMKM warganya.",
  heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" // Placeholder pantai
};

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