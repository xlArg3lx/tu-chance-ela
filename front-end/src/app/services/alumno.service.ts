import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Alumno } from '../interfaces/alumno.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<any>(`${this.apiUrl}/alumnos`).pipe(
      map((response) => {
        // Asumiendo que la respuesta tiene una estructura similar a la del login
        // con data y result
        console.log('Respuesta original:', response);
        return response.data || [];
      })
    );
  }

  getAlumnosPorGrado(grado: number): Observable<Alumno[]> {
    return this.http.get<any>(`${this.apiUrl}/consultar-alumno/${grado}`).pipe(
      map((response) => {
        // Aplica la misma lógica aquí
        if (Array.isArray(response)) {
          return response;
        }
        return response.data || [];
      })
    );
  }
}
