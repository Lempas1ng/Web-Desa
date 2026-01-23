<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class SuratController extends Controller
{
    public function index()
    {
        return response()->json(Surat::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // Data Pemohon (Wajib)
            'nik' => 'required|string',
            'nama_pemohon' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string',
            'pekerjaan' => 'required|string',
            'agama' => 'required|string',
            'alamat' => 'required|string',
            'no_hp' => 'required|string',
            
            // Data Pasangan (Opsional / Boleh Kosong)
            'nik_pasangan' => 'nullable|string',
            'nama_pasangan' => 'nullable|string',
            'tempat_lahir_pasangan' => 'nullable|string',
            'tanggal_lahir_pasangan' => 'nullable|date',
            'jenis_kelamin_pasangan' => 'nullable|string',
            'pekerjaan_pasangan' => 'nullable|string',
            'agama_pasangan' => 'nullable|string',
            'alamat_pasangan' => 'nullable|string',

            // Data Surat
            'jenis_surat' => 'required|string',
            'keterangan' => 'nullable|string',
        ]);

        $validated['status'] = 'Menunggu';
        $surat = Surat::create($validated);

        return response()->json(['message' => 'Berhasil', 'data' => $surat], 201);
    }

    public function update(Request $request, $id)
    {
        $surat = Surat::find($id);
        if (!$surat) return response()->json(['message' => '404'], 404);

        $surat->update(['status' => 'Selesai']);
        return response()->json(['message' => 'Status Updated', 'data' => $surat]);
    }

    public function cetakPdf($id)
    {
        $surat = Surat::find($id);
        if (!$surat) return response()->json(['message' => '404'], 404);

        $pdf = Pdf::loadView('pdf.surat_template', ['surat' => $surat]);
        return $pdf->stream();
    }
}