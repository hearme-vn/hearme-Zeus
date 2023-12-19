import {Component, Injector, Input, ViewChild} from '@angular/core';
import { URIS } from '@app/_services';
import { BaseReport } from '@app/_bases/basereport.component';
import { GaugeChartOptions } from '@app/_models';

@Component({
  selector: 'survey-ces-report',
  templateUrl: 'survey.ces.component.html'
})
export class SurveyCESReport extends BaseReport {

  statistics_url = this.app_service.Based_URLs.front + URIS.front.statistics;

  gaugeChartOptions = <GaugeChartOptions>{
    min: 0,
    max: 6,
    append: "",
    markers: { 
      "0": { color: "#555", type: "line", size: 8, label: "1" }, 
      "1": { color: "#555", type: "line", size: 8, label: "2" }, 
      "2": { color: "#555", type: "line", size: 8, label: "3" }, 
      "3": { color: "#555", type: "line", size: 8, label: "4" }, 
      "4": { color: "#555", type: "line", size: 8, label: "5" }, 
      "5": { color: "#555", type: "line", size: 8, label: "6" }, 
      "6": { color: "#555", type: "line", size: 8, label: "7" }
    },
    thresholds: {
      "0": { color: "red", bgOpacity: .5 },
      "1": { color: "violet", bgOpacity: .5 },
      "2": { color: "orange", bgOpacity: .5 },
      "3": { color: "yellow", bgOpacity: .5 },
      "4": { color: "blue", bgOpacity: .5 },
      "5": { color: "green", bgOpacity: .5 }
    },
    size: 300,
    bias: -1
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
      let label = this.translate.instant("CES." + item.rating);
      res.labels.push(label);
      res.data.push(item.count);
    }
    return res;
  }

}