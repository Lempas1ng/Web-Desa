<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Berita; // <--- Jangan lupa panggil Model Berita
use App\Http\Controllers\Api\PublicController;

Route::get('/landing', [PublicController::class, 'getLandingData']);
Route::get('/wisata', [PublicController::class, 'getWisata']);
Route::get('/umkm', [PublicController::class, 'getUmkm']);
// Untuk berita, Anda bisa gunakan Controller Berita yang sudah ada atau buat dummy serupa

// Jalur Tes (Cek apakah API hidup)
Route::get('/tes', function () {
    return response()->json(['pesan' => 'API Berhasil Connect!']);
});

// Jalur Berita (Yang dicari temanmu)
Route::get('/berita', function () {
    $data = Berita::latest()->get();
    return response()->json($data);
});