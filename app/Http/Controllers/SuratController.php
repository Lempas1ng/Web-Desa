<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf; // <--- Pastikan baris ini ada!

class SuratController extends Controller
{
    // 1. Ambil List Surat
    public function index()
    {
        return response()->json(Surat::latest()->get());
    }

    // 2. Simpan Surat (Warga)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pemohon' => 'required|string',
            'nik' => 'required|string',
            'no_hp' => 'required|string',
            'jenis_surat' => 'required|string',
            'keterangan' => 'nullable|string',
        ]);

        // Default status
        $validated['status'] = 'Menunggu'; 

        $surat = Surat::create($validated);

        return response()->json(['message' => 'Berhasil', 'data' => $surat], 201);
    }

    // 3. Update Status
    public function update(Request $request, $id)
    {
        $surat = Surat::find($id);
        if (!$surat) return response()->json(['message' => '404'], 404);

        $surat->update(['status' => 'Selesai']);
        return response()->json(['message' => 'Status Updated', 'data' => $surat]);
    }

    // 4. Cetak PDF
    public function cetakPdf($id)
    {
        $surat = Surat::find($id);
        if (!$surat) return response()->json(['message' => '404'], 404);

        $pdf = Pdf::loadView('pdf.surat_template', ['surat' => $surat]);
        return $pdf->stream();
    }
}