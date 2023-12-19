import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BaseChartModel } from '@app/_models/chart.model';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration, ChartDataSets } from 'chart.js';
import { ChartModelFactory } from './chart.model.factory';

/**
 * @license hearme 
 * @copyright 2017-2022 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 16 Dec 2020
 * @purpose This component is general hearme chart for all chart types
 * This chart adds some html elements to base chart: import/export, download, switch between chart and data table....
*/

//  [data]="data"
@Component({
  selector: 'hm-chart',
  styleUrls: ['hm-chart.component.css'],
  template: `
    <div class="chart-wrapper" [style]="containerStyle" *ngIf="chartModel && datasets && datasets.length">
      <canvas baseChart class="innerClass"
        [datasets]="chartModel.getDatasets()"
        [labels]="chartModel.chartLabels"
        [options]="chartModel.options"
        [chartType]="chartModel.chartType"
        [plugins]="chartModel.chartPlugins"
        (chartHover)="chartHovered($event)"
        (chartClick)="chartClicked($event)">
      </canvas>
    </div>
  `
})
export class HMChartComponent implements OnInit, OnChanges {
  innerClass = "hm_chart"
  chartModel: BaseChartModel = null;

  @Input('style')   containerStyle = '';
  @Input('data')    datasets: ChartDataSets[] = [];             // Contain data for each data set, name, and color
  @Input('labels')  chartLabels: Array<any> = [];               // Label for x axis
  @Input()   options: ChartConfiguration['options'];    // Chart options
  @Input('type')   chartType: string;                   // Chart type
  @Input('plugins')   chartPlugins;

  constructor (public translate: TranslateService) {
  }

  /**
   * Processing when hover chart
  */
  chartHovered(event) {}

  /**
   * Processing when click chart
  */
  chartClicked(event) {}

  /**
   * Init chart data here
   */
  ngOnInit(): void {
    // this.updateChart();
  }  

  /**
   * On changes in source component from inputs
  */
  ngOnChanges(): void {
    this.chartModel = ChartModelFactory.createChartModel(this.chartType, this.containerStyle, this.datasets, this.chartLabels, this.options, this.chartPlugins);
    this.chartModel.processChartData();
  }

}
