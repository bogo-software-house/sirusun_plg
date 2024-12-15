<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Suggestion;
use App\Http\Resources\SuggestionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SuggestionController extends Controller
{
    public function index()
    {
        $suggestions = Suggestion::latest()->paginate(10);

        return SuggestionResource::collection($suggestions);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
            'email' => 'nullable|email',
            'nama' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $suggestion = Suggestion::create([
            'custom_id' => Suggestion::generateCustomId(),
            'description' => $request->input('description'),
            'email' => $request->input('email'),
            'nama' => $request->input('nama'),
        ]);

        return new SuggestionResource($suggestion);
    }

    public function show($custom_id)
    {
        $suggestion = Suggestion::where('custom_id', $custom_id)->firstOrFail();
        return new SuggestionResource($suggestion);
    }

    public function update(Request $request, $custom_id)
    {
        $suggestion = Suggestion::where('custom_id', $custom_id)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'status' => 'in:baru,diproses,ditindaklanjuti,selesai,ditolak',
            'response' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $suggestion->update([
            'status' => $request->input('status', $suggestion->status),
            'response' => $request->input('response'),
            'response_at' => now()
        ]);

        return new SuggestionResource($suggestion);
    }

    public function destroy($custom_id)
    {
        $suggestion = Suggestion::where('custom_id', $custom_id)->firstOrFail();
        $suggestion->delete();

        return response()->json(['message' => 'Suggestion deleted successfully']);
    }

    public function summary()
    {
        return response()->json([
            'total_suggestions' => Suggestion::count(),
            'status_counts' => Suggestion::groupBy('status')
                ->selectRaw('status, COUNT(*) as count')
                ->get(),
            'category_counts' => Suggestion::groupBy('category')
                ->selectRaw('category, COUNT(*) as count')
                ->get()
        ]);
    }
}