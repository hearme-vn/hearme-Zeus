import {Component, Injector, Input, ViewChild} from '@angular/core';
import { URIS } from '@app/_services';
import { BaseReport } from '@app/_bases/basereport.component';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'feedbackcount-bytime-report',
  template: `
    <app-line-chart 
      [style] = "styleData"
      [data]="chartData"
      [labels]="chartLabels">
    </app-line-chart>
  `
})
export class FeedbacksByTime extends BaseReport {
  chartData: ChartDataSets[] = [];
  chartLabels = [];   // Array of label in X axis

  statistics_url = this.app_service.Based_URLs.front + URIS.front.total_fbcount_bytimes;

  constructor (public injector: Injector) {
    super(injector);
  }

  /**
   * Process data to insert into chart
  */  
  dataProcesssing(reportData) {
    // console.log("Report data: ", reportData);
    this.chartLabels = this.makeLabels(this.filter_data.fixed_time);

    const totalData: ChartDataSets = {
      label: this.translate.instant('DASHBOARD.MAIN_CHART_TOTAL_FB') ,
      data: []
    };
    const positiveData: ChartDataSets = {
      label: this.translate.instant('DASHBOARD.MAIN_CHART_POSITIVE_FB'),
      data: []
    };
    const negativeData: ChartDataSets = {
      label: this.translate.instant('DASHBOARD.MAIN_CHART_NEGATIVE_FB'),
      data: []
    };
    const mapTotalData = [];
    const mapPositiveData = [];
    const mapNegativeData = [];
    for (let i = 0; i < reportData.length; i++) {
      mapTotalData[reportData[i].time] = reportData[i].total;
      mapPositiveData[reportData[i].time] = reportData[i].total - reportData[i].negative;
      mapNegativeData[reportData[i].time] = reportData[i].negative;
    }
    for (let i = 0; i < this.chartLabels.length; i++) {
      if (mapTotalData[this.chartLabels[i]] !== undefined) {
        totalData.data.push(mapTotalData[this.chartLabels[i]]);
      } else {
        totalData.data.push(0);
      }
      if (mapPositiveData[this.chartLabels[i]] !== undefined) {
        positiveData.data.push(mapPositiveData[this.chartLabels[i]]);
      } else {
        positiveData.data.push(0);
      }
      if (mapNegativeData[this.chartLabels[i]] !== undefined) {
        negativeData.data.push(mapNegativeData[this.chartLabels[i]]);
      } else {
        negativeData.data.push(0);
      }
    }
    this.chartData = [];
    this.chartData.push(totalData);
    this.chartData.push(positiveData);
    this.chartData.push(negativeData);
  }

}

