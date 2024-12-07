<!DOCTYPE html>
<html>
<head>
    <title>Status Transaksi Anda</title>
</head>
<body>
    <h1>Pemberitahuan Status Transaksi</h1>
    <p>Yth. {{ $residentName }},</p>
    
    @if($status === 'ISF002')
    <p>Transaksi Anda telah diproses. Silahkan datang dan tunggu selama 7 hari untuk proses selanjutnya.</p>
    @elseif($status === 'ISF003')
    <p>Status Transaksi Anda: {{ $keterangan }}</p>
    @endif

    <p>Terima kasih telah menggunakan layanan kami.</p>
</body>
</html>