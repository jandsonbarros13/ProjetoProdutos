import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
