<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Berita; // <--- Pastikan baris ini ada

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        // Berita 1
        Berita::create([
            'judul' => 'Kerja Bakti Bersih Desa',
            'penulis' => 'Pak Kadus',
            'isi' => 'Minggu depan seluruh warga diharapkan membawa alat kebersihan masing-masing.',
            'gambar' => null,
        ]);

        // Berita 2
        Berita::create([
            'judul' => 'Jadwal Posyandu Balita',
            'penulis' => 'Bu Bidan',
            'isi' => 'Posyandu bulan ini dimajukan hari Selasa jam 08.00 pagi di Balai Desa.',
            'gambar' => null,
        ]);

        // Berita 3
        Berita::create([
            'judul' => 'Penen Raya Jagung',
            'penulis' => 'Admin Desa',
            'isi' => 'Alhamdulillah panen raya tahun ini meningkat 20% dari tahun lalu.',
            'gambar' => null,
        ]);
    }
}