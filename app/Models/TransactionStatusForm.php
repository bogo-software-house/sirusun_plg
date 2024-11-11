<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\StatusForm;
use App\Models\ResidentPdf;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionStatusForm extends Model
{
    
    protected $fillable = ['form_custom_id','statusForm_custom_id'];

    public function statusForm(): BelongsTo
    {
        return $this->belongsTo(StatusForm::class, 'statusForm_custom_id', 'custom_id');
    }
    public function residentPdf(): BelongsTo
    {
        return $this->belongsTo(ResidentPdf::class, 'form_custom_id', 'custom_id');
    }
}
