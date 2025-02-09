<?php

namespace Database\Seeders;

use App\Models\Alumno;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class AlumnoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create('es_ES'); // Usando el locale español

        // Crear 20 alumnos de prueba
        for ($i = 0; $i < 10; $i++) {
            Alumno::create([
                'nombre' => $faker->firstName,
                'fecha_nacimiento' => $faker->dateTimeBetween('-18 years', '-6 years')->format('Y-m-d'),
                'nombre_padre' => $faker->name('male'),
                'nombre_madre' => $faker->name('female'),
                'grado' => $faker->numberBetween(1, 6),
                'seccion' => $faker->randomElement(['A', 'B', 'C']),
                'fecha_ingreso' => $faker->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
