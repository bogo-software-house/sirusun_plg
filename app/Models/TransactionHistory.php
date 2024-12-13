<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionHistory extends Model
{
    protected $fillable = [
        'custom_id',
        'model_type',
        'model_id',
        'action',
        'old_data',
        'new_data',
        'user_id'
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array'
    ];

    public static function createHistory($modelType, $modelId, $action, $oldData = null, $newData = null)
    {
        return self::create([
            'custom_id' => self::generateCustomId(),
            'model_type' => $modelType,
            'model_id' => $modelId,
            'action' => $action,
            'old_data' => $oldData,
            'new_data' => $newData,
            'user_id' => auth()->id() ?? null
        ]);
    }

    public static function generateCustomId()
    {
        $prefix = 'HIST';
        $latestRecord = self::orderBy('id', 'desc')->first();
        $number = $latestRecord ? intval(substr($latestRecord->custom_id, 4)) + 1 : 1;
        return $prefix . str_pad($number, 6, '0', STR_PAD_LEFT);
    }
}