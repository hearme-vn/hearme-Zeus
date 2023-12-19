import {Component, Injector, Input, ViewChild} from '@angular/core';
import { URIS } from '@app/_services';
import { BaseReport } from '@app/_bases/basereport.component';
import { Survey } from '@app/_models';

@Component({
  selector: 'feedbackcount-bysurvey-report',
  template: `
      <app-pie-chart #feedbacks_bysurvey 
        [style] = "styleData"
        [data]="chartData"
        [labels]="chartLabels">
      </app-pie-chart>
  `
})
export class FeedbacksBySurvey extends BaseReport {
  
  chartData = [];
  chartLabels = [];

  statistics_url = this.app_service.Based_URLs.front + URIS.front.fbcount_count_by_surveys;

  constructor (public injector: Injector) {
    super(injector);
  }

  /**
   * Get all group in system
  */
  loadObjectList() {
    let filterParams = { status: 100 };
    return this.loadObjectsbyFilter(Survey, filterParams);
  }

  /**
   * Process data to insert into chart
  */  
  dataProcesssing(reportData) {
    // console.log("Report data: ", reportData);
    this.chartData = [];
    this.chartLabels = [];

    if (!reportData || !reportData.length)      return;
    this.loadObjectList().subscribe(
      function(objects) {
        // console.log("Survey list", objects)
        //Mapping group with id
        let object_map = {}
        if (objects && objects.length) {
          for (let object of objects) {
            object_map[object.id] = object;
          }
        }

        // make report dataset
        for (let object_report of reportData) {
          // console.log("Group report data: ", group_report);
          // Group count
          this.chartData.push(object_report.count);

          // Group name
          let object = object_map[object_report.sur_id];
          if (object)
            this.chartLabels.push(object.name)
          else
            this.chartLabels.push(object_report.sur_id);
        }  
    
      }.bind(this)
    )
  }

}

