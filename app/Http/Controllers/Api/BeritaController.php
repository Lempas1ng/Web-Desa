<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berita;

class BeritaController extends Controller
{
    // Tambah Berita
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required',
            'gambar' => 'nullable|string',
        ]);

        $berita = Berita::create([
            'judul' => $request->judul,
            'konten' => $request->konten,
            'gambar' => $request->gambar ?? 'https://via.placeholder.com/400x300',
            'tanggal' => now(),
            'penulis' => $request->user()->name ?? 'Admin',
        ]);

        return response()->json($berita, 201);
    }

    // Update Berita
    public function update(Request $request, $id)
    {
        $berita = Berita::find($id);
        if (!$berita) return response()->json(['message' => 'Not Found'], 404);

        $berita->update($request->all());

        return response()->json($berita);
    }

    // Hapus Berita
    public function destroy($id)
    {
        $berita = Berita::find($id);
        if (!$berita) return response()->json(['message' => 'Not Found'], 404);

        $berita->delete();
        return response()->json(['message' => 'Berita dihapus']);
    }
}