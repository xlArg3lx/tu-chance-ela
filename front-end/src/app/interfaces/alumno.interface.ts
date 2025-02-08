export interface Alumno {
  id?: number;
  nombre: string;
  fecha_nacimiento: string; // Notar el cambio de fechaNacimiento a fecha_nacimiento
  nombre_padre: string; // Cambio de nombrePadre a nombre_padre
  nombre_madre: string; // Cambio de nombreMadre a nombre_madre
  grado: number; // Cambio de string a number
  seccion: string;
  fecha_ingreso: string; // Cambio de fechaIngreso a fecha_ingreso
  created_at: string;
  updated_at: string;
}
