import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {
    this.isAuthenticatedSubject.next(!!localStorage.getItem('token'));
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: LoginResponse) => {
          console.log('Respuesta completa:', response);
          if (response.data?.authorization?.token) {
            const token = response.data.authorization.token;
            console.log('Token guardado:', token);
            localStorage.setItem('token', token);
            this.isAuthenticatedSubject.next(true);
          } else {
            console.log('No se encontró el token en la respuesta');
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
