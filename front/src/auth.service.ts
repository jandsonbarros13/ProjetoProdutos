import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private userAccess: string | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((response: any) => {
        if (response.acesso) {
          this.setUserAccess(response.acesso);
        }
      })
    );
  }

  setUserAccess(acesso: string) {
    this.userAccess = acesso;
    localStorage.setItem('userAccess', acesso);
  }

  getUserAccess(): string | null {
    if (!this.userAccess) {
      this.userAccess = localStorage.getItem('userAccess');
    }
    return this.userAccess;
  }

  logout() {
    this.userAccess = null;
    localStorage.removeItem('userAccess');
    localStorage.removeItem('authToken');
  }
}
