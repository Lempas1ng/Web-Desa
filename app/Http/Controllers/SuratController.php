<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Surat; // <--- Jangan lupa panggil Model Surat

class SuratController extends Controller
{
    // Fungsi untuk MENERIMA kiriman data dari Frontend
    public function store(Request $request)
    {
        // 1. Validasi dulu (Cek kelengkapan)
        $request->validate([
            'nama_pemohon' => 'required',
            'nik' => 'required|numeric',
            'no_hp' => 'required',
            'jenis_surat' => 'required',
        ]);

        // 2. Simpan ke Database
        $surat = Surat::create([
            'nama_pemohon' => $request->nama_pemohon,
            'nik' => $request->nik,
            'no_hp' => $request->no_hp,
            'jenis_surat' => $request->jenis_surat,
            'keterangan' => $request->keterangan,
            'status' => 'Menunggu' // Default
        ]);

        // 3. Kirim balasan ke Frontend (Konfirmasi)
        return response()->json([
            'message' => 'Surat berhasil diajukan!',
            'data' => $surat
        ], 201);
    }
}