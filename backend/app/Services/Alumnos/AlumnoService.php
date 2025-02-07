<?php

namespace App\Services\Alumnos;

use App\Models\Alumno;
use App\Interfaces\AlumnoServiceInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AlumnoService implements AlumnoServiceInterface
{
    public function crearAlumno($request)
    {
        try {
            $validatedData = $this->validateAlumnoInput($request->all());

            $alumno = Alumno::create($validatedData);

            if ($alumno) {
                $this->extractAlumnoData($request);
                return response()->json($alumno, 200);
            }
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 400);
        } catch (\Exception $e) {
            Log::error('Error al crear alumno: ' . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor.'], 500);
        }
    }


    public function obtenerAlumnosPorGrado($grado)
    {
        try {
            $alumnos = Alumno::where('grado', $grado)->get();

            return response()->json($alumnos, 200);
        } catch (\Exception $e) {
            Log::error('Error al consultar alumnos por grado: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error interno del servidor.'
            ], 500);
        }
    }

    private function validateAlumnoInput(array $data)
    {
        return Validator::make($data, [
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'nombre_padre' => 'required|string|max:255',
            'nombre_madre' => 'required|string|max:255',
            'grado' => 'required|integer|between:1,12',
            'seccion' => 'required|string|max:1',
            'fecha_ingreso' => 'required|date'
        ])->validate();
    }

    private function extractAlumnoData($request)
    {
        return [
            'nombre' => $request->input('nombre'),
            'fecha_nacimiento' => $request->input('fecha_nacimiento'),
            // Add other relevant alumno data
        ];
    }
}
