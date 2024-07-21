import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // Se está utilizando standalone components
  imports: [CommonModule, FormsModule], // Importando FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        if (response.acesso) {
          alert('Login bem-sucedido');
          this.router.navigate(['/home']);
        } else {
          alert('Usuário ou senha incorretos');
        }
      },
      error: (error) => {
        alert('Erro ao autenticar usuário');
      },
    });
  }
}
