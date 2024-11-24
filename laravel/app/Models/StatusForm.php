<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StatusForm extends Model
{
      use HasFactory;
    
    protected $fillable =[
    'custom_id',    
    'status_form',
    ];

    public function transaction_status_forms(): HasMany
    {
        return $this->hasMany(TransactionStatusForm::class, 'statusForm_custom_id', 'custom_id');
    }
}
