<!DOCTYPE html>
<html>
<head>
    <title>Status Transaksi Anda</title>
</head>
<body>
    <h1>Pemberitahuan Status Transaksi</h1>
    <p>Yth. {{ $residentName }},</p>
    
    @if($status === 'DITERIMA')
    <p>Status Transaksi Anda: {{ $status }}</p>
    <p>dengan keterangan: </p>
    <p>{{ $keterangan }}</p>
    @elseif($status === 'DITOLAK')
    <p>Status Transaksi Anda: {{ $status }}</p>
    <p>dengan keterangan: </p>
    <p>{{ $keterangan }}</p>
    @endif

    <p>Terima kasih telah menggunakan layanan kami.</p>
</body>
</html>