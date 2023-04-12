<?php

namespace App\Http\Controllers\Api;


use App\Models\LeaveActivitiesModel;
use App\Models\LeaveRequestsModel;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class LeaveHistoryController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.token');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user;
        if(!isset($user->id)) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $data = LeaveRequestsModel::where('user_outlet_id', $user->id)
            ->with('leaveType', 'leaveActivities', 'leaveDates')
            ->paginate()
            ->onEachSide(2);
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
