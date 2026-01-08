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
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Ekowisata Mangrove",
    description: "Kawasan konservasi bakau yang menawarkan pemandangan hijau nan sejuk serta edukasi lingkungan.",
    image: "https://images.unsplash.com/photo-1621849405022-7772719bd941?q=80&w=1974&auto=format&fit=crop"
  }
];

export const umkmData = [
  {
    id: 1,
    name: "Keripik Pisang Khas",
    owner: "Ibu Siti",
    description: "Oleh-oleh wajib berupa keripik pisang dengan berbagai varian rasa.",
    image: "https://images.unsplash.com/photo-1604543166870-07e174780521?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Kerajinan Tangan",
    owner: "Kelompok Pemuda",
    description: "Produk kerajinan unik yang terbuat dari bahan daur ulang dan hasil laut.",
    image: "https://images.unsplash.com/photo-1513682976269-65a882d56a73?q=80&w=2070&auto=format&fit=crop"
  }
];