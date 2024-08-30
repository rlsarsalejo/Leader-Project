<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix('leaders')->group(function () {
    Route::get('/', [LeaderController::class, 'index']);
    Route::post('/', [LeaderController::class, 'store']);
    Route::put('/{leader}', [LeaderController::class, 'update']);
    Route::delete('/{leader}', [LeaderController::class, 'destroy']);
});
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
