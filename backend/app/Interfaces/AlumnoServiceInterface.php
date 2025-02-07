<?php

namespace App\Interfaces;

interface AlumnoServiceInterface
{
    public function crearAlumno(array $data);
    public function obtenerAlumnosPorGrado(int $grado);
}