<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Berita; // <--- Jangan lupa panggil Model Berita
use App\Http\Controllers\SuratController; // <--- Taruh di paling atas file

// Jalur Tes (Cek apakah API hidup)
Route::get('/tes', function () {
    return response()->json(['pesan' => 'API Berhasil Connect!']);
});

// Jalur Berita (Yang dicari temanmu)
Route::get('/berita', function () {
    $data = Berita::latest()->get();
    return response()->json($data);
});


// ... kode berita yang tadi ...

// JALUR KIRIM SURAT (Method POST)
Route::post('/surat', [SuratController::class, 'store']);