<!DOCTYPE html>
<html>
<head>
    <title>Cetak Surat</title>
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; }
        .kop { text-align: center; border-bottom: 3px double black; margin-bottom: 20px; }
        .judul { text-align: center; text-decoration: underline; font-weight: bold; text-transform: uppercase; margin-top: 30px; }
        .nomor { text-align: center; margin-top: 5px; margin-bottom: 30px; }
        .isi { text-align: justify; line-height: 1.5; }
        .tabel { margin-left: 20px; }
        .tabel td { padding: 3px; vertical-align: top; }
        .ttd { float: right; width: 250px; text-align: center; margin-top: 50px; }
    </style>
</head>
<body>
    <div class="kop">
        <h3>PEMERINTAH KABUPATEN LAMPUNG SELATAN</h3>
        <h3>KECAMATAN JATI AGUNG</h3>
        <h2>DESA SABAH BALAU</h2>
        <p><i>Alamat: Jl. Raya Sabah Balau No. 1, Jati Agung</i></p>
    </div>

    <div class="judul">{{ strtoupper($surat->jenis_surat) }}</div>
    <div class="nomor">Nomor: 470 / {{ $surat->id }} / XII / {{ date('Y') }}</div>

    <div class="isi">
        <p>Yang bertanda tangan di bawah ini Kepala Desa Sabah Balau menerangkan bahwa:</p>
        <table class="tabel">
            <tr><td width="150">Nama</td><td>: <b>{{ $surat->nama_pemohon }}</b></td></tr>
            <tr><td>NIK</td><td>: {{ $surat->nik_pemohon }}</td></tr>
            <tr><td>Jenis Kelamin</td><td>: {{ $surat->jenis_kelamin }}</td></tr>
            <tr><td>Pekerjaan</td><td>: {{ $surat->pekerjaan }}</td></tr>
            <tr><td>Alamat</td><td>: {{ $surat->alamat }}</td></tr>
        </table>
        <p>Adalah benar warga desa kami. Surat ini dibuat untuk keperluan: <br><b>"{{ $surat->keterangan }}"</b></p>
        <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
    </div>

    <div class="ttd">
        <p>Sabah Balau, {{ date('d F Y') }}</p>
        <p>Kepala Desa</p>
        <br><br><br>
        <p><b>( NAMA KADES )</b></p>
    </div>
</body>
</html>