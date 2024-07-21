import { UsuariosService } from './../usuarios/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './../menu/menu.component';
import { ColumnChartComponent } from './../column-chart/column-chart.component';
import { LineChartComponent } from './../line-chart/line-chart.component';
import { PieChartComponent } from './../pie-chart/pie-chart.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PieChartComponent,
    LineChartComponent,
    ColumnChartComponent,
    FooterComponent,
    MenuComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuariosService.listarUsuarios().subscribe(
      (data: any[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Erro ao listar usuários:', error);
      }
    );
  }
}
