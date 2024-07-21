import { RelatoriosService } from './../relatorios/relatorios.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  constructor(private relatoriosService: RelatoriosService) {}

  ngOnInit(): void {
    this.fetchProdutosData();
  }

  fetchProdutosData(): void {
    this.relatoriosService.getProdutos().subscribe((produtos: any[]) => {
      const data = this.processarDados(produtos);
      this.pieChartData = {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
          },
        ],
      };
    });
  }

  processarDados(produtos: any[]): { [key: string]: number } {
    const categorias: { [key: string]: number } = {};

    produtos.forEach((produto) => {
      const categoria = produto.nome; // Ou qualquer outra propriedade que você queira usar como rótulo
      if (categorias[categoria]) {
        categorias[categoria]++;
      } else {
        categorias[categoria] = 1;
      }
    });

    return categorias;
  }
}
