<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TransactionHistory;
use App\Http\Resources\TransactionHistoryResource;
use Illuminate\Http\Request;

class TransactionHistoryController extends Controller
{
    /**
     * Display a listing of transaction histories.
     */
    public function index()
    {
        // Retrieve all transaction histories with pagination
        $histories = TransactionHistory::latest()->paginate(15);

        return TransactionHistoryResource::collection($histories);
    }

    /**
     * Display filtered transaction histories.
     */
    public function filter(Request $request)
    {
        // Implement flexible filtering
        $query = TransactionHistory::query();

        // Filter by model type (optional)
        if ($request->has('model_type')) {
            $query->where('model_type', $request->input('model_type'));
        }

        // Filter by action (optional)
        if ($request->has('action')) {
            $query->where('action', $request->input('action'));
        }

        // Filter by date range (optional)
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('created_at', [
                $request->input('start_date'), 
                $request->input('end_date')
            ]);
        }

        // Sorting
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortBy, $sortDirection);

        // Pagination
        $perPage = $request->input('per_page', 15);
        $histories = $query->paginate($perPage);

        return TransactionHistoryResource::collection($histories);
    }

    /**
     * Display a specific transaction history entry.
     */
    public function show($id)
    {
        $history = TransactionHistory::where('custom_id', $id)->firstOrFail();
        return new TransactionHistoryResource($history);
    }

    /**
     * Get history for a specific model and ID.
     */
    public function getModelHistory(Request $request)
    {
        $request->validate([
            'model_type' => 'required|string',
            'model_id' => 'required|string'
        ]);

        $histories = TransactionHistory::where('model_type', $request->input('model_type'))
            ->where('model_id', $request->input('model_id'))
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return TransactionHistoryResource::collection($histories);
    }

    /**
     * Get summary of transaction histories.
     */
    public function summary()
    {
        $totalHistories = TransactionHistory::count();
        $actionCounts = TransactionHistory::groupBy('action')
            ->select('action', \DB::raw('COUNT(*) as count'))
            ->get();

        $modelTypeCounts = TransactionHistory::groupBy('model_type')
            ->select('model_type', \DB::raw('COUNT(*) as count'))
            ->get();

        return response()->json([
            'total_histories' => $totalHistories,
            'action_counts' => $actionCounts,
            'model_type_counts' => $modelTypeCounts
        ]);
    }

    /**
     * Delete old transaction histories.
     */
    public function cleanup(Request $request)
    {
        $request->validate([
            'days_older_than' => 'required|integer|min:1'
        ]);

        $daysOlderThan = $request->input('days_older_than');
        $deletedCount = TransactionHistory::where('created_at', '<', now()->subDays($daysOlderThan))->delete();

        return response()->json([
            'message' => 'Cleanup completed',
            'deleted_records' => $deletedCount
        ]);
    }
}