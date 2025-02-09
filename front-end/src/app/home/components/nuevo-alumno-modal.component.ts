import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Alumno } from 'src/app/interfaces/alumno.interface';
import { AlumnosService } from 'src/app/services/alumno.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-nuevo-alumno-modal',
  template: `
    <ion-content class="modal-container">
      <div class="modal-header">
        <h2>Nuevo Alumno</h2>
        <ion-icon name="close-outline" (click)="cancelar()"></ion-icon>
      </div>

      <form
        [formGroup]="alumnoForm"
        (ngSubmit)="guardarAlumno()"
        class="form-content"
      >
        <div class="form-grid">
          <div class="input-wrapper">
            <label>Nombre Completo</label>
            <div class="input-container">
              <input
                type="text"
                formControlName="nombre"
                placeholder="Ingrese nombre"
                class="light-input"
              />
              <small
                *ngIf="
                  alumnoForm.get('nombre')?.invalid &&
                  (alumnoForm.get('nombre')?.dirty ||
                    alumnoForm.get('nombre')?.touched)
                "
                class="error-text"
              >
                Nombre requerido
              </small>
            </div>
          </div>

          <div class="input-wrapper">
            <label>Fecha Nacimiento</label>
            <div class="input-container">
              <input
                type="date"
                class="light-input"
                formControlName="fecha_nacimiento"
              />
              <small
                *ngIf="
                  alumnoForm.get('fecha_nacimiento')?.invalid &&
                  (alumnoForm.get('fecha_nacimiento')?.dirty ||
                    alumnoForm.get('fecha_nacimiento')?.touched)
                "
                class="error-text"
              >
                Fecha requerida
              </small>
            </div>
          </div>

          <div class="input-wrapper">
            <label>Nombre del Padre</label>
            <div class="input-container">
              <input
                type="text"
                formControlName="nombre_padre"
                placeholder="Nombre del padre"
                class="light-input"
              />
              <small
                *ngIf="
                  alumnoForm.get('nombre_padre')?.invalid &&
                  (alumnoForm.get('nombre_padre')?.dirty ||
                    alumnoForm.get('nombre_padre')?.touched)
                "
                class="error-text"
              >
                Nombre requerido
              </small>
            </div>
          </div>

          <div class="input-wrapper">
            <label>Nombre de la Madre</label>
            <div class="input-container">
              <input
                type="text"
                formControlName="nombre_madre"
                placeholder="Nombre de la madre"
                class="light-input"
              />
              <small
                *ngIf="
                  alumnoForm.get('nombre_madre')?.invalid &&
                  (alumnoForm.get('nombre_madre')?.dirty ||
                    alumnoForm.get('nombre_madre')?.touched)
                "
                class="error-text"
              >
                Nombre requerido
              </small>
            </div>
          </div>

          <div class="input-wrapper">
            <label>Grado</label>
            <div class="input-container">
              <select formControlName="grado" class="light-input">
                <option [value]="1">1ro</option>
                <option [value]="2">2do</option>
                <option [value]="3">3ro</option>
                <option [value]="4">4to</option>
                <option [value]="5">5to</option>
                <option [value]="6">6to</option>
              </select>
              <small
                *ngIf="
                  alumnoForm.get('grado')?.invalid &&
                  (alumnoForm.get('grado')?.dirty ||
                    alumnoForm.get('grado')?.touched)
                "
                class="error-text"
              >
                Grado requerido
              </small>
            </div>
          </div>

          <div class="input-wrapper">
            <label>Sección</label>
            <div class="input-container">
              <input
                type="text"
                formControlName="seccion"
                placeholder="Sección"
                class="light-input"
              />
              <small
                *ngIf="
                  alumnoForm.get('seccion')?.invalid &&
                  (alumnoForm.get('seccion')?.dirty ||
                    alumnoForm.get('seccion')?.touched)
                "
                class="error-text"
              >
                Sección requerida
              </small>
            </div>
          </div>

          <div class="input-wrapper">
            <label>Fecha Ingreso</label>
            <div class="input-container">
              <input
                type="date"
                formControlName="fecha_ingreso"
                class="light-input"
              />
              <small
                *ngIf="
                  alumnoForm.get('fecha_ingreso')?.invalid &&
                  (alumnoForm.get('fecha_ingreso')?.dirty ||
                    alumnoForm.get('fecha_ingreso')?.touched)
                "
                class="error-text"
              >
                Fecha requerida
              </small>
            </div>
          </div>
        </div>

        <button type="submit" [disabled]="alumnoForm.invalid">
          Guardar Alumno
        </button>
      </form>
    </ion-content>
  `,
  styles: [
    `
      .modal-container {
        --background: white;
        border-radius: 12px;
        overflow: hidden;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        background-color: #f4f4f4;
        border-bottom: 1px solid #e0e0e0;
      }

      .modal-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .modal-header ion-icon {
        color: #666;
        cursor: pointer;
        font-size: 24px;
      }

      .form-content {
        padding: 20px;
      }

      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .input-wrapper label {
        font-size: 14px;
        color: #555;
        font-weight: 500;
      }

      .input-container {
        display: flex;
        flex-direction: column;
      }

      .light-input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 15px;
        background-color: white;
        color: #333;
        transition: border-color 0.3s ease;
      }

      .light-input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }

      input,
      select {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 15px;
        transition: border-color 0.3s ease;
      }

      input:focus,
      select:focus {
        outline: none;
        border-color: #007bff;
      }

      .error-text {
        color: #dc3545;
        font-size: 12px;
        margin-top: 4px;
      }

      button {
        width: 100%;
        padding: 12px;
        margin-top: 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        transition: background-color 0.3s ease;
      }

      button:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
      }

      @media (max-width: 600px) {
        .form-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
})
export class NuevoAlumnoModalComponent implements OnInit {
  alumnoForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalController: ModalController,
    private readonly alumnosService: AlumnosService,
    private readonly loadingCtrl: LoadingController,
    private readonly toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      fecha_nacimiento: ['', Validators.required],
      nombre_padre: ['', Validators.required],
      nombre_madre: ['', Validators.required],
      grado: [1, [Validators.required, Validators.min(1), Validators.max(6)]],
      seccion: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
    });
  }

  cancelar() {
    this.modalController.dismiss();
  }

  async guardarAlumno() {
    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
      return;
    }

    const nuevoAlumno: Alumno = {
      ...this.alumnoForm.value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const loading = await this.loadingCtrl.create({
      message: 'Por favor espere...',
    });
    await loading.present();

    this.alumnosService.crearAlumno(nuevoAlumno).subscribe({
      next: async (alumnoCreado) => {
        await loading.dismiss();
        this.modalController.dismiss(alumnoCreado);
      },
      error: async (error) => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: error.error.message || 'Error al guardar alumno',
          duration: 3000,
          color: 'danger',
          position: 'bottom',
        });
        await toast.present();
      },
    });
  }
}
