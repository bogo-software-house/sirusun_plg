<?php
namespace App\Jobs;

use App\Models\Resident;
use App\Models\ResidentPdf;
use App\Models\TransactionStatusForm;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteTransactionStatusFormData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $formCustomId;

    public function __construct($formCustomId)
    {
        $this->formCustomId = $formCustomId;
    }
    public $timeout = 120; // waktu dalam detik
    
    public function handle()
    {
        // Temukan transaksi berdasarkan form_custom_id
        $transaction = TransactionStatusForm::where('form_custom_id', $this->formCustomId)->first();

        if ($transaction) {
            // Temukan ResidentPdf terkait
            $residentPdf = $transaction->residentPdf;

            if ($residentPdf) {
                // Hapus data Resident
                Resident::where('nik', $residentPdf->nik)->delete();
                // Hapus data ResidentPdf
                $residentPdf->delete();
            }

            // Hapus data TransactionStatusForm
            $transaction->delete();
        }
    }
}
