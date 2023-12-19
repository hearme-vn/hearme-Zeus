import {Component, Injector, Input, ViewChild} from '@angular/core';
import { URIS } from '@app/_services';
import { BaseReport } from '@app/_bases/basereport.component';
import { GaugeChartOptions } from '@app/_models';

@Component({
  selector: 'survey-csat-report',
  templateUrl: 'survey.csat.component.html'
})
export class SurveyCSATReport extends BaseReport {

  statistics_url = this.app_service.Based_URLs.front + URIS.front.statistics;

  gaugeChartOptions = new GaugeChartOptions({
    markers: { 
      "0": { color: "#555", type: "line", size: 8, label: "0" }, 
      "20": { color: "#555", type: "line", size: 8, label: "20" }, 
      "40": { color: "#555", type: "line", size: 8, label: "40" }, 
      "60": { color: "#555", type: "line", size: 8, label: "60" }, 
      "80": { color: "#555", type: "line", size: 8, label: "80" }, 
      "100": { color: "#555", type: "line", size: 8, label: "100" } 
    },
    thresholds: {
      "0": { color: "red", bgOpacity: .2 },
      "40": { color: "orange", bgOpacity: .7 },
      "60": { color: "yellow", bgOpacity: .2 },
      "80": { color: "green", bgOpacity: .7 }
    }
  });

  constructor (public injector: Injector) {
    super(injector);
    
    this.initHMChartOptions();
  }


  /**
   * Convert API output data on ratings to chart data
   * @input rating_data: Array[{count: 63, proportion: 8.47, rating: 1}]
   * @outpt {labels: ['Satisfied', 'Very Satisfied'], data: [3, 6] }
  */
  getFeedbackCountRating(rating_data) {
    let res = { 
      labels: [], 
      data: []
    }
    for (let item of rating_data) {
      let label = this.translate.instant("CSAT." + item.rating);
      res.labels.push(label);
      res.data.push(item.count);
    }
    return res;
  }

}