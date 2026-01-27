<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berita;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    public function index()
    {
        // Tampilkan berita terbaru (urutan descending)
        return response()->json(Berita::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi'   => 'required', 
            'gambar'=> 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // Max 5MB
        ]);

        $path = null;
        if ($request->hasFile('gambar')) {
            // Simpan ke storage/app/public/berita
            $path = $request->file('gambar')->store('berita', 'public');
        }

        $berita = Berita::create([
            'judul'   => $request->judul,
            'isi'     => $request->isi, 
            'gambar'  => $path,
            'penulis' => $request->user()->name ?? 'Admin',
        ]);

        return response()->json($berita, 201);
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::find($id);
        if (!$berita) return response()->json(['message' => 'Not Found'], 404);

        $request->validate([
            'judul' => 'required|string|max:255',
            'isi'   => 'required',
            'gambar'=> 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        $data = [
            'judul' => $request->judul,
            'isi'   => $request->isi,
        ];

        // Cek jika ada upload gambar baru
        if ($request->hasFile('gambar')) {
            // Hapus gambar lama agar hemat storage
            if ($berita->gambar && Storage::disk('public')->exists($berita->gambar)) {
                Storage::disk('public')->delete($berita->gambar);
            }
            // Upload baru
            $data['gambar'] = $request->file('gambar')->store('berita', 'public');
        }

        $berita->update($data);

        return response()->json($berita);
    }

    public function destroy($id)
    {
        $berita = Berita::find($id);
        if (!$berita) return response()->json(['message' => 'Not Found'], 404);

        // Hapus file fisik gambar
        if ($berita->gambar && Storage::disk('public')->exists($berita->gambar)) {
            Storage::disk('public')->delete($berita->gambar);
        }

        $berita->delete();
        return response()->json(['message' => 'Berita dihapus']);
    }
}