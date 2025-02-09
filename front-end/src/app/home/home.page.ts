import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Alumno } from '../interfaces/alumno.interface';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlumnosService } from '../services/alumno.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  alumnos: Alumno[] = [];
  loading: boolean = true;
  gradoSeleccionado: number = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly alumnosService: AlumnosService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.loading = true;
    this.alumnosService.getAlumnos().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data);
        this.alumnos = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar alumnos:', error);
        this.loading = false;
      },
    });
  }

  filtrarPorGrado() {
    this.loading = true;

    if (this.gradoSeleccionado === 0) {
      this.cargarAlumnos();
      return;
    }

    this.alumnosService.getAlumnosPorGrado(this.gradoSeleccionado).subscribe({
      next: (data) => {
        console.log('Alumnos filtrados:', data);
        this.alumnos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al filtrar alumnos:', error);
        this.loading = false;
      },
    });
  }

  async logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
