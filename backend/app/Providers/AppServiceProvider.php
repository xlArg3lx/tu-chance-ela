<?php

namespace App\Providers;

use App\Interfaces\AlumnoServiceInterface;
use App\Interfaces\AuthServiceInterface;
use App\Services\Alumnos\AlumnoService;
use App\Services\Auth\AuthService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AlumnoServiceInterface::class, AlumnoService::class);
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}