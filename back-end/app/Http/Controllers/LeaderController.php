<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Leaders;

class LeaderController extends Controller
{   

    //getting all the data from table
   public function index()
   {
     $leadersData = Leaders::all();
     return response()->json($leadersData);
   }


   //add new Leader
   public function store(Request $request){
    
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|unique:leaders,email',
        'phoneNumber' => 'required|string|max:12',
    ]);
    $leader = Leaders::create($validated);
    return response()->json($leader,201);
   }
   
   //update leader
   public function update(Request $request, $id)
   {
    $leader = Leaders::findOrFail($id);
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|unique:leaders,email,' . $id,
        'phoneNumber' => 'required|string|max:12',
    ]);
    $leader->update($validated);
    return response()->json($leader, 200);
   }

   //delete leader
   public function destroy($id)
   {
    $leader = Leaders::findOrFail($id);
    $leader->delete();
    return response()->json(null, 204);
   }
}
