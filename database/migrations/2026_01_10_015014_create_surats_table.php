public function up(): void
{
    Schema::create('surats', function (Blueprint $table) {
        $table->id();
        $table->string('nama_pemohon');    // Nama Warga
        $table->string('nik');             // NIK Warga
        $table->string('no_hp');           // No WA (Penting buat hubungi balik)
        $table->string('jenis_surat');     // Contoh: SKTM, Domisili, dll
        $table->text('keterangan')->nullable(); // Keperluan tambahan
        $table->string('status')->default('Menunggu'); // Status awal selalu 'Menunggu'
        $table->timestamps();
    });
}