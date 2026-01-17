<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// Pastikan Model ini ada di aplikasi Anda
use App\Models\Surat; 
use App\Models\Berita;
use App\Models\User; 

class DashboardController extends Controller
{
    public function index()
    {
        // Menghitung jumlah data untuk statistik
        $totalSurat = Surat::count();
        $totalBerita = Berita::count();
        $totalUser = User::count();
        
        // Mengambil 5 surat terbaru untuk ditampilkan di tabel
        $suratTerbaru = Surat::latest()->take(5)->get();

        return response()->json([
            'total_surat' => $totalSurat,
            'total_berita' => $totalBerita,
            'total_user'   => $totalUser,
            'surat_terbaru' => $suratTerbaru
        ]);
    }
}