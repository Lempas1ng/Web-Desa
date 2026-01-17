<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Berita;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController; // <--- Import Controller Baru

// --- PUBLIC ROUTES (Bisa diakses siapa saja) ---

// Login
Route::post('/login', [AuthController::class, 'login']);

// Berita & Info Publik
Route::get('/berita', function () {
    return response()->json(Berita::latest()->get());
});

Route::get('/berita/{id}', function ($id) {
    $data = Berita::find($id);
    return $data ? response()->json($data) : response()->json(['message' => '404'], 404);
});

// Form Surat (Warga kirim)
Route::post('/surat', [SuratController::class, 'store']);


// --- PROTECTED ROUTES (Hanya Admin yang sudah Login) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // Ambil data user yang sedang login
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Dashboard Stats (Route Baru)
    Route::get('/dashboard-stats', [DashboardController::class, 'index']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin Surat (Lihat & Update)
    Route::get('/surat', [SuratController::class, 'index']);
    Route::put('/surat/{id}', [SuratController::class, 'update']);
    
    // Nanti di sini Anda bisa tambah route CRUD Berita/UMKM
});