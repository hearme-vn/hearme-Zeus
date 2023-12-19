import {Component, Injector, Input, ViewChild} from '@angular/core';
import { URIS } from '@app/_services';
import { BaseReport } from '@app/_bases/basereport.component';
import { GaugeChartOptions } from '@app/_models';

@Component({
  selector: 'survey-nps-report',
  templateUrl: 'survey.nps.component.html'
})
export class SurveyNPSReport extends BaseReport {

  statistics_url = this.app_service.Based_URLs.front + URIS.front.statistics;

  gaugeChartOptions =  <GaugeChartOptions>{
    min: 0,
    max: 200,
    append: "%",
    markers: { 
      "0": { color: "#555", type: "line", size: 8, label: "-100" }, 
      "50": { color: "#555", type: "line", size: 8, label: "-50" }, 
      "100": { color: "#555", type: "line", size: 8, label: "0" }, 
      "150": { color: "#555", type: "line", size: 8, label: "50" }, 
      "200": { color: "#555", type: "line", size: 8, label: "100" } 
    },
    thresholds: {
      "0": { color: "red", bgOpacity: .5 },
      "50": { color: "orange", bgOpacity: .5 },
      "100": { color: "yellow", bgOpacity: .5 },
      "150": { color: "green", bgOpacity: .5 }
    },
    size: 300,
    bias: 100
  };

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
      let level = this.translate.instant("REPORT.LEVEL");
      res.labels.push(level + ": " + item.rating);
      res.data.push(item.count);
    }
    return res;
  }

}