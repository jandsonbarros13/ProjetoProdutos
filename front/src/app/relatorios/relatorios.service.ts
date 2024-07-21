import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelatoriosService {
  private apiUrl = 'http://localhost:3000'; // Ajuste para sua URL de API

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/produtos`);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/usuarios`);
  }

  gerarRelatorioPDF(tipo: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/relatorios/${tipo}`, {
      responseType: 'blob',
    });
  }
}
