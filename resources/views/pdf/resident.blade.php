<!DOCTYPE html>
<html>
<head>
    <title>Data Penduduk - {{ $resident->username }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .content {
            margin-top: 20px;
        }
        .detail {
            margin-bottom: 10px;
        }
        .detail strong {
            display: inline-block;
            width: 200px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Kartu Identitas Penduduk</h1>
    </div>

    <div class="content">
        <div class="detail">
            <strong>NIK:</strong> {{ $resident->nik }}
        </div>
        <div class="detail">
            <strong>Nama:</strong> {{ $resident->username }}
        </div>
        <div class="detail">
            <strong>Tempat Lahir:</strong> {{ $resident->tempat_lahir }}
        </div>
        <div class="detail">
            <strong>Tanggal Lahir:</strong> {{ \Carbon\Carbon::parse($resident->tanggal_lahir)->format('d F Y') }}
        </div>
        <div class="detail">
            <strong>Jenis Kelamin:</strong> {{ $resident->genders->gender ?? 'Tidak Diketahui' }}
        </div>
        <div class="detail">
            <strong>Status Nikah:</strong> {{ $resident->statusNikah->status_nikah ?? 'Tidak Diketahui' }}
        </div>
        <div class="detail">
            <strong>Agama:</strong> {{ $resident->religions->religions ?? 'Tidak Diketahui' }}
        </div>
        <div class="detail">
            <strong>Pendidikan:</strong> {{ $resident->education->education ?? 'Tidak Diketahui' }}
        </div>
        <div class="detail">
            <strong>Alamat Rumah:</strong> {{ $resident->alamat_rumah }}
        </div>
        <div class="detail">
            <strong>Nomor Telepon:</strong> {{ $resident->no_telp }}
        </div>
        <div class="detail">
            <strong>Penghasilan:</strong> Rp. {{ number_format($resident->penghasilan, 0, ',', '.') }}
        </div>
        <div class="detail">
            <strong>Kewarganegaraan:</strong> {{ $resident->warga_negara }}
        </div>
        <div class="detail">
            <strong>Pekerjaan:</strong> {{ $resident->pekerjaan }}
        </div>
        <div class="detail">
            <strong>Alamat Tempat Kerja:</strong> {{ $resident->alamat_tempat_kerja }}
        </div>
    </div>

    <div class="footer" style="margin-top: 50px; text-align: center;">
        <p>Dokumen Resmi Kependudukan</p>
        <p>Dicetak pada: {{ now()->format('d F Y H:i:s') }}</p>
    </div>
</body>
</html>