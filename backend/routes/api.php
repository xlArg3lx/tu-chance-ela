<?php

use App\Http\Controllers\Alumno\AlumnoController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

// Grupo de rutas API
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['jwt.verify'])->group(function () {
    Route::post('crear-alumno', [AlumnoController::class, 'crear']);
    Route::get('consultar-alumno/{idGrado}', [AlumnoController::class, 'consultarPorGrado']);
});
