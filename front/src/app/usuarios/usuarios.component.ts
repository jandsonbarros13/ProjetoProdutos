import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { FooterComponent } from './../footer/footer.component';
import { MenuComponent } from './../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenuComponent, FooterComponent, FormsModule, NgIf, NgFor],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuario = { nome: '', email: '', senha: '', acesso: '' };
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  criarUsuario() {
    this.usuariosService.criarUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuário criado com sucesso', response);
        this.usuario = { nome: '', email: '', senha: '', acesso: '' };
        this.listarUsuarios();
      },
      (error) => {
        console.log('Erro ao cadastrar usuário', error);
      }
    );
  }

  listarUsuarios() {
    this.usuariosService.listarUsuarios().subscribe(
      (response: any) => {
        this.usuarios = response;
      },
      (error) => {
        console.log('Erro ao listar usuários', error);
      }
    );
  }

  excluirUsuario(id: number) {
    this.usuariosService.excluirUsuario(id).subscribe(
      (response) => {
        console.log('Usuário excluído com sucesso', response);
        this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
      },
      (error) => {
        console.log('Erro ao excluir usuário', error);
      }
    );
  }
}
