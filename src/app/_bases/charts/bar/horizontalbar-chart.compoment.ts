import { Component } from '@angular/core';
import { BaseChartComponent } from '@app/_bases';
import { TranslateService } from '@ngx-translate/core';
import { ChartOptions } from 'chart.js';

/**
 * @license hearme 
 * @copyright 2017-2022 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 16 Dec 2020
 * @purpose This component is for Horizontal bar chart types
 */

@Component({
  selector: 'hm-horizontalbarchart',
  styleUrls: ['hm-horizontalbarchart.component.css'],
  templateUrl: 'horizontalbar-chart.compoment.html'
})
export class HorizontalBarChartComponent extends BaseChartComponent {

  constructor (public translate: TranslateService) {
    super();

    this.options = this.default_chartOptions;
  }

  // public options: ChartOptions = {
  //   // indexAxis: 'y',
  //   // scaleShowVerticalLines: false,
  //   responsive: true,
  //   scales: {
  //     xAxes: [{
  //       gridLines: {
  //         drawOnChartArea: false,
  //       },
  //       ticks: {
  //         callback: function(value: any, index) {
  //           return index % 2 === 0 ? value : '';
  //         }
  //       }
  //     }],
  //     yAxes: [{
  //       ticks: {
  //         beginAtZero: true,
  //       }
  //     }]
  //   },
  //   legend: {
  //     display: true,
  //     align: 'end',
  //     labels: {
  //       boxWidth: 20
  //     }
  //   },
  //   plugins: {
  //     labels: {
  //       render: 'value',
  //       precision: 0
  //     }
  //   }    
  // };
 
}
