import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, usuario);
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/cadastro`);
  }

  excluirUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cadastro/${id}`);
  }
}
