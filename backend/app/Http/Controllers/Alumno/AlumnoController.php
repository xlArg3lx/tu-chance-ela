<?php

namespace App\Http\Controllers\Alumno;

use App\Http\Controllers\Controller;
use App\Services\Alumnos\AlumnoService;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    protected $alumnoService;

    public function __construct(AlumnoService $alumnoService)
    {
        $this->alumnoService = $alumnoService;
    }

    public function index()
    {
        return $this->alumnoService->getAllAlumnos();
    }

    public function crear(Request $request)
    {
        return $this->alumnoService->crearAlumno($request);
    }

    public function consultarPorGrado($grado)
    {
        return $this->alumnoService->obtenerAlumnosPorGrado($grado);
    }
}