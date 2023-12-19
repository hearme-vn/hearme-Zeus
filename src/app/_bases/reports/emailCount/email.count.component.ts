import {Component, Injector, Input, ViewChild} from '@angular/core';
import { URIS } from '@app/_services';
import { BaseReport } from '@app/_bases/basereport.component';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'emails-bytime-report',
  template: `
    <hm-barchart
      [style] = "styleData"
      [data]="chartData"
      [labels]="chartLabels">
    </hm-barchart>
  `
})
export class EmailsByTime extends BaseReport {
  chartData: ChartDataSets[] = [];
  chartLabels = [];   // Array of label in X axis

  statistics_url = this.app_service.Based_URLs.main + URIS.main.email_counting_by_time_series;

  constructor (public injector: Injector) {
    super(injector);
  }

  /**
   * Process data to insert into chart
  */  
  dataProcesssing(reportData) {
    // console.log("Report data: ", reportData);
    this.chartLabels = this.makeLabels(this.filter_data.fixed_time);

    const emailData: ChartDataSets = {
      label: this.translate.instant('DASHBOARD.EMAIL_CHART_FB'),
      data: []
    };
    const mapEmailData = [];
    for (let i = 0; i < reportData.length; i++) {
      mapEmailData[reportData[i].time] = reportData[i].count;
    }
    for (let i = 0; i < this.chartLabels.length; i++) {
      if (mapEmailData[this.chartLabels[i]] !== undefined) {
        emailData.data.push(mapEmailData[this.chartLabels[i]]);
      } else {
        emailData.data.push(0);
      }
    }
    this.chartData = [];
    this.chartData.push(emailData);
  }

}

