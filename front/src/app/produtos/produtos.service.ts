import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criarProduto(produto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/produtos/create`, produto);
  }

  listarProdutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/produtos`);
  }
  exluirProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/produtos/${id}`);
  }
}
