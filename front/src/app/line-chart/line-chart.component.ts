import { RelatoriosService } from './../relatorios/relatorios.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Produtos',
        fill: true,
      },
    ],
  };
  public lineChartType: ChartType = 'line';

  constructor(private relatoriosService: RelatoriosService) {}

  ngOnInit(): void {
    this.fetchProdutosData();
  }

  fetchProdutosData(): void {
    this.relatoriosService.getProdutos().subscribe((produtos: any[]) => {
      const data = this.processarDados(produtos);
      this.lineChartData = {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            label: 'Produtos',
            fill: true,
          },
        ],
      };
    });
  }

  processarDados(produtos: any[]): { labels: string[]; values: number[] } {
    const labels: string[] = [];
    const values: number[] = [];

    produtos.forEach((produto) => {
      labels.push(produto.nome);
      values.push(produto.preco);
    });

    return { labels, values };
  }
}
