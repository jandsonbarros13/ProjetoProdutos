import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';
import { RelatoriosService } from './relatorios.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent], // Adicione CommonModule
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
})
export class RelatoriosComponent implements OnInit {
  produtos: any[] = [];
  usuarios: any[] = [];

  constructor(private relatoriosService: RelatoriosService) {}

  ngOnInit(): void {
    this.fetchProdutos();
    this.fetchUsuarios();
  }

  fetchProdutos(): void {
    this.relatoriosService.getProdutos().subscribe((data: any) => {
      this.produtos = data;
    });
  }

  fetchUsuarios(): void {
    this.relatoriosService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
    });
  }

  gerarRelatorio(tipo: string): void {
    this.relatoriosService.gerarRelatorioPDF(tipo).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        tipo === 'produtos'
          ? 'Relatorio_Produtos.pdf'
          : 'Relatorio_Usuarios.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
