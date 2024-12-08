<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TransactionStatusNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $status;
    public $resident;
    public $keterangan;

    /**
     * Create a new message instance.
     */
    public function __construct($status, $resident, $keterangan = null)
    {
        $this->status = $status;
        $this->resident = $resident;
        $this->keterangan = $keterangan;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Status Transaksi Anda',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.transaction_status_notification',
            with: [
                'status' => $this->status,
                'residentName' => $this->resident->username,
                'keterangan' => $this->keterangan
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments(): array
    {
        return [];
    }
}
