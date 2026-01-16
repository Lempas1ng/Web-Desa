<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB; // <--- Tambahan biar bisa cek database
use App\Models\Berita; 

// ----------------------------------------------------------------
// 1. ROUTE BAWAAN (JANGAN DIHAPUS)
// ----------------------------------------------------------------

// Route untuk halaman depan
Route::get('/', function () {
    $semuaBerita = Berita::latest()->get();
    return view('welcome', ['berita' => $semuaBerita]);
});

// Route untuk form tambah berita
Route::get('/berita/tambah', [App\Http\Controllers\BeritaController::class, 'create']);
Route::post('/berita/simpan', [App\Http\Controllers\BeritaController::class, 'store']);


// ----------------------------------------------------------------
// 2. ROUTE DIAGNOSA (UNTUK CEK ERROR SSL)
// ----------------------------------------------------------------
Route::get('/cek-db', function () {
    try {
        // Kita cek manual ke lokasi C:\kkn\desa-kkn-2025\cacert.pem
        $path = 'C:\\kkn\\desa-kkn-2025\\cacert.pem';
        $ada = file_exists($path) ? "ADA ✅" : "TIDAK DITEMUKAN ❌";
        
        echo "<h1>Diagnosa Koneksi Database</h1>";
        echo "<b>Lokasi Sertifikat yang Dicari:</b> $path <br>";
        echo "<b>Status File:</b> $ada <br><br>";

        // Coba Connect
        DB::connection()->getPdo();
        return "Status Koneksi: <b style='color:green'>BERHASIL TERHUBUNG! 🎉</b>";
    } catch (\Exception $e) {
        return "Status Koneksi: <b style='color:red'>GAGAL ☠️</b><br><br><b>Pesan Error:</b> " . $e->getMessage();
    }
});