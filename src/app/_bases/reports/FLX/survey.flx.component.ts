import {Component, Injector, Input, ViewChild} from '@angular/core';
import { URIS } from '@app/_services';
import { BaseReport } from '@app/_bases/basereport.component';
import { Collection, GaugeChartOptions } from '@app/_models';

@Component({
  selector: 'survey-flx-report',
  templateUrl: 'survey.flx.component.html'
})
export class SurveyFLXReport extends BaseReport {

  statistics_url = this.app_service.Based_URLs.front + URIS.front.statistics;

  gaugeChartOptions = <GaugeChartOptions>{
    min: 0,
    max: 6,
    append: "",
    markers: { 
      "0": { color: "#555", type: "line", size: 8, label: "1" }, 
    },
    thresholds: {
      // "0": { color: "red", bgOpacity: .5 },
    },
    size: 300,
    bias: -1
  };

  constructor (public injector: Injector) {
    super(injector);
    
    this.initHMChartOptions();
  }

  /**
   * Make chart options
  */
  postProcessing(report_data) {

    // Set options for Gauge chart
    let report_survey = this.filter_data.childSurvey || this.filter_data.mainSurvey;
    let scales = report_survey.scales;
    this.gaugeChartOptions.max = scales -1;
    for (let i=0; i<scales; i++) {
      this.gaugeChartOptions.markers[i.toString()] = { color: "#555", type: "line", size: 8, label: (i+1).toString() };
    }

    // console.log("Options: ", this.lineChartOptions);
  }

  /**
   * Convert API output data on ratings to chart data
   * @input rating_data: Array[{count: 63, proportion: 8.47, rating: 1}]
   * @outpt {labels: ['Satisfied', 'Very Satisfied'], data: [3, 6] }
  */
  getFeedbackCountRating(rating_data) {
    // Get collection information to get name for each rating level
    let report_survey = this.filter_data.childSurvey || this.filter_data.mainSurvey;
    let col_id = report_survey.col_id;

    const url =  this.app_service.Based_URLs.main + Collection.uri_posts;
    let data = { id: col_id, status: 0};
    this.app_service.getAPI_Observable(url, data).subscribe(
      function(posts) {
        // console.log("Collection posts: ", posts);
        let res = { 
          labels: [], 
          data: []
        }
        for (let item of rating_data) {
          // console.log("Rating: ", item.rating + 1);
          let label = item.rating;
          if (posts && (item.rating <= posts.length))
            label = posts[<number>item.rating - 1].content;
          res.labels.push(label);
          res.data.push(item.count);
        }
        this.rating_data = res;
      }.bind(this)
    );
    return;
  }
}