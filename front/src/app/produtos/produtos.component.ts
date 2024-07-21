import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './../footer/footer.component';
import { MenuComponent } from './../menu/menu.component';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from './produtos.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MenuComponent, FooterComponent, FormsModule, NgIf, NgFor],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  produto = { codigo: '', nome: '', preco: 0 };
  produtos: any[] = [];

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  cadastrarProduto() {
    this.produtosService.criarProduto(this.produto).subscribe(
      (response) => {
        console.log('Produto criado com sucesso', response);
        this.produto = { codigo: '', nome: '', preco: 0 }; // Limpa os inputs
        this.listarProdutos(); // Atualiza a lista de produtos
      },
      (error) => {
        console.log('Erro ao cadastrar produto', error);
      }
    );
  }

  listarProdutos() {
    this.produtosService.listarProdutos().subscribe(
      (response) => {
        this.produtos = response;
      },
      (error) => {
        console.log('Erro ao listar produtos', error);
      }
    );
  }

  excluirProduto(id: number) {
    this.produtosService.exluirProduto(id).subscribe(
      (response) => {
        console.log('Produto excluído com sucesso', response);
        this.produtos = this.produtos.filter((produto) => produto.id !== id);
      },
      (error) => {
        console.log('Erro ao excluir produto', error);
      }
    );
  }
}
