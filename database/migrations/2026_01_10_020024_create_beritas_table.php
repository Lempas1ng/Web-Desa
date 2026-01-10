<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('beritas', function (Blueprint $table) {
            $table->id(); // ID Unik (Wajib)
            
            // --- INI KOLOM TAMBAHANNYA ---
            $table->string('judul');      // Buat Judul Berita
            $table->string('penulis');    // Buat Nama Penulis
            $table->text('isi');          // Buat Isi Berita (Pakai text biar muat banyak)
            $table->string('gambar')->nullable(); // (Opsional) Buat simpan nama file foto nanti
            
            $table->timestamps(); // Buat nyatat kapan dibuat/diedit
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beritas');
    }
};