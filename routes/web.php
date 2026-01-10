<?php

use Illuminate\Support\Facades\Route;
use App\Models\Berita; // <--- PENTING: Baris ini wajib ada

// Route untuk halaman depan
Route::get('/', function () {
    $semuaBerita = Berita::latest()->get();
    return view('welcome', ['berita' => $semuaBerita]);
});

// Route untuk form tambah berita (yang tadi dibuat)
Route::get('/berita/tambah', [App\Http\Controllers\BeritaController::class, 'create']);
Route::post('/berita/simpan', [App\Http\Controllers\BeritaController::class, 'store']);