import { RelatoriosService } from './../relatorios/relatorios.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css'],
})
export class ColumnChartComponent implements OnInit {
  public columnChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public columnChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Produtos',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  public columnChartType: ChartType = 'bar';

  constructor(private relatoriosService: RelatoriosService) {}

  ngOnInit(): void {
    this.fetchProdutosData();
  }

  fetchProdutosData(): void {
    this.relatoriosService.getProdutos().subscribe((produtos: any[]) => {
      const data = this.processarDados(produtos);
      this.columnChartData = {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            label: 'Produtos',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
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
