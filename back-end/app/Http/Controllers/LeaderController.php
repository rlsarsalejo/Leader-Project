<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Leaders;
use Illuminate\Http\Response;
use App\Http\Requests\StoreLeaderRequest;
use App\Http\Requests\UpdateLeaderRequest;

class LeaderController extends Controller
{   

    //getting all the data from table
   public function index()
   {
    $leadersData = Leaders::all(); // This should return a collection of leaders
    return response()->json($leadersData);
   }


   //add new Leader
   public function store(StoreLeaderRequest $request){
    
    $leader = Leaders::create($request->validated());
    return response()->json([
        'success' => true,
        'message' => 'Leader created successfully',
        'data' => $leader
    ], Response::HTTP_CREATED);
   }
   
   //update leader
   public function update(UpdateLeaderRequest $request, Leaders $leader)
   {
        $leader->update($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Leader updated successfully',
            'data' => $leader
        ], Response::HTTP_OK);
   }

   //delete leader
   public function destroy(Leaders $leader)
   {
    $leader->delete();
    return response()->json([
        'success' => true,
        'message' => 'Leader deleted successfully'
    ], Response::HTTP_NO_CONTENT);
   }
}
