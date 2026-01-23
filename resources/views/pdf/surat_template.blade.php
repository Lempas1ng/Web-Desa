<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Cetak Surat Desa</title>
    <style>
        @page { size: A4; margin: 2cm 2.5cm; }
        body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; }
        
        .kop-surat { width: 100%; border-bottom: 3px double #000; margin-bottom: 20px; padding-bottom: 10px; }
        .kop-tabel { width: 100%; }
        .kop-tabel td { vertical-align: middle; }
        .logo-img { width: 90px; height: auto; }
        .kop-text { text-align: center; }
        .kop-text h4 { margin: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; }
        .kop-text h3 { margin: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; }
        .kop-text h2 { margin: 0; font-size: 16pt; font-weight: bold; text-transform: uppercase; }
        .kop-text p { margin: 0; font-size: 10pt; font-style: italic; margin-top: 5px;}

        .judul-container { text-align: center; margin-bottom: 20px; margin-top: 20px;}
        .judul-surat { text-decoration: underline; font-weight: bold; text-transform: uppercase; font-size: 12pt; }
        
        .paragraf { text-align: justify; text-indent: 40px; margin-bottom: 10px; }
        .tabel-data { width: 100%; margin-left: 20px; margin-bottom: 10px; }
        .tabel-data td { padding: 2px; vertical-align: top; }
        .label { width: 160px; }
        .titik-dua { width: 10px; }

        .ttd-container { float: right; width: 280px; text-align: center; margin-top: 30px; }
        .ttd-nama { font-weight: bold; text-decoration: underline; margin-top: 70px; text-transform: uppercase; }
    </style>
</head>
<body>

    <div class="kop-surat">
        <table class="kop-tabel">
            <tr>
                <td width="15%" align="center">
                    <img src="{{ public_path('img/logo.png') }}" class="logo-img" alt="Logo">
                </td>
                <td align="center">
                    <div class="kop-text">
                        <h4>PEMERINTAH KABUPATEN PESAWARAN</h4>
                        <h3>KECAMATAN TELUK PANDAN</h3>
                        <h2>DESA SUKAJAYA LEMPASING</h2>
                        <p>Sekretariat: Jl. Raya Teluk Ratai Km 8 Desa Sukajaya Lempasing Kec. Teluk Pandan, Pesawaran</p>
                    </div>
                </td>
                <td width="15%"></td> 
            </tr>
        </table>
    </div>

    <div class="judul-container">
        <div class="judul-surat">{{ strtoupper($surat->jenis_surat) }}</div>
        <div class="nomor-surat">Nomor: 470 / {{ str_pad($surat->id, 3, '0', STR_PAD_LEFT) }} / VII.10.08 / {{ date('m') }} / {{ date('Y') }}</div>
    </div>

    <div class="isi-surat">
        <p class="paragraf">
            Yang bertanda tangan di bawah ini Kepala Desa Sukajaya Lempasing Kecamatan Teluk Pandan Kabupaten Pesawaran, dengan ini menerangkan bahwa:
        </p>

        <table class="tabel-data">
            <tr><td class="label">Nama</td><td class="titik-dua">:</td><td><b>{{ strtoupper($surat->nama_pemohon) }}</b></td></tr>
            <tr><td class="label">NIK</td><td class="titik-dua">:</td><td>{{ $surat->nik }}</td></tr>
            <tr><td class="label">Tempat/Tgl Lahir</td><td class="titik-dua">:</td>
                <td>{{ $surat->tempat_lahir }}, {{ \Carbon\Carbon::parse($surat->tanggal_lahir)->locale('id')->translatedFormat('d F Y') }}</td>
            </tr>
            <tr><td class="label">Jenis Kelamin</td><td class="titik-dua">:</td><td>{{ $surat->jenis_kelamin }}</td></tr>
            <tr><td class="label">Agama</td><td class="titik-dua">:</td><td>{{ $surat->agama }}</td></tr>
            <tr><td class="label">Pekerjaan</td><td class="titik-dua">:</td><td>{{ $surat->pekerjaan }}</td></tr>
            <tr><td class="label">Alamat</td><td class="titik-dua">:</td><td>{{ $surat->alamat }}</td></tr>
        </table>

        @if($surat->jenis_surat == 'Surat Keterangan Telah Menikah')
            <p class="paragraf">Nama diatas adalah Suami/Istri dari:</p>
            
            <table class="tabel-data">
                <tr><td class="label">Nama</td><td class="titik-dua">:</td><td><b>{{ strtoupper($surat->nama_pasangan) }}</b></td></tr>
                <tr><td class="label">NIK</td><td class="titik-dua">:</td><td>{{ $surat->nik_pasangan }}</td></tr>
                <tr><td class="label">Tempat/Tgl Lahir</td><td class="titik-dua">:</td>
                    <td>{{ $surat->tempat_lahir_pasangan }}, {{ \Carbon\Carbon::parse($surat->tanggal_lahir_pasangan)->locale('id')->translatedFormat('d F Y') }}</td>
                </tr>
                <tr><td class="label">Jenis Kelamin</td><td class="titik-dua">:</td><td>{{ $surat->jenis_kelamin_pasangan }}</td></tr>
                <tr><td class="label">Agama</td><td class="titik-dua">:</td><td>{{ $surat->agama_pasangan }}</td></tr>
                <tr><td class="label">Pekerjaan</td><td class="titik-dua">:</td><td>{{ $surat->pekerjaan_pasangan }}</td></tr>
                <tr><td class="label">Alamat</td><td class="titik-dua">:</td><td>{{ $surat->alamat_pasangan }}</td></tr>
            </table>

            <p class="paragraf">Sepengetahuan kami nama tersebut diatas telah menikah pada <b>{{ $surat->keterangan }}</b>.</p>

        @elseif($surat->jenis_surat == 'Surat Keterangan Tidak Mampu (SKTM)')
            <p class="paragraf">Sepengetahuan kami orang tersebut <b>benar-benar orang tidak mampu dan tergolong berekonomi lemah (miskin)</b>. Surat ini digunakan untuk:</p>
            <div style="text-align: center; font-weight: bold; margin: 10px 0;">- {{ strtoupper($surat->keterangan) }} -</div>

        @elseif($surat->jenis_surat == 'Surat Keterangan Usaha (SKU)')
            <p class="paragraf">Sepengetahuan kami orang tersebut di atas mempunyai usaha:</p>
            <div style="text-align: center; font-weight: bold; margin: 10px 0; text-decoration: underline;">- {{ strtoupper($surat->keterangan) }} -</div>

        @elseif($surat->jenis_surat == 'Surat Keterangan Domisili')
            <p class="paragraf">Benar yang bersangkutan berdomisili/bertempat tinggal pada alamat diatas. Surat ini digunakan untuk:</p>
            <div style="text-align: center; font-weight: bold; margin: 10px 0;">- {{ strtoupper($surat->keterangan) }} -</div>
        
        @else
            <p class="paragraf">Surat keterangan ini diberikan untuk keperluan:</p>
            <div style="text-align: center; font-weight: bold; margin: 10px 0;">" {{ strtoupper($surat->keterangan) }} "</div>
        @endif

        <p class="paragraf" style="margin-top: 20px;">
            Demikianlah surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
        </p>
    </div>

    <div class="ttd-container">
        <p>Sukajaya Lempasing, {{ date('d F Y') }}</p>
        <p>Kepala Desa Sukajaya Lempasing</p>
        <br><br><br> 
        <div class="ttd-nama">EDY SUSANTO</div>
    </div>
</body>
</html>