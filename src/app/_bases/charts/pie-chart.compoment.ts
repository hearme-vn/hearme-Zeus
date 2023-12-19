import {Component, Input, ViewChild} from '@angular/core';
import {BaseChartComponent} from '@app/_bases';
import {TranslateService} from '@ngx-translate/core';
import { ChartConfiguration } from 'chart.js';
import * as pluginLabels from 'chartjs-plugin-labels';

/**
 * @license hearme 
 * @copyright 2017-2022 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 20 Dec 2022
 * @purpose Pie chat component
 * @input data: is array of Numbers for items
 * @input labels: is array of string for items
 */
@Component({
  selector: 'app-pie-chart',
  templateUrl: 'chart.template.html'
})
export class PieChartComponent extends BaseChartComponent {

  @Input('data')    data = [];
  @Input('labels')  chartLabels: string[];

  
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 20
      }
    },
    plugins: {
      labels: [
        {
          render: 'label',
          position: 'outside',
          fontColor: this.CHART_COLORS
        },
        {
          render: 'percentage',
          fontColor: 'white',
        }
      ]      
    }
  };
    
  public chartPlugins = [pluginLabels];
  
  public chartType = 'pie';
  public datasets = [
    {
      backgroundColor: this.CHART_COLORS,
      hoverOffset: 10     
    }
  ]

  constructor (public translate: TranslateService) {
    super();
  }

}
