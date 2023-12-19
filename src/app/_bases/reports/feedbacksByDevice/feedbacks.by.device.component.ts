import {Component, Injector, Input, ViewChild} from '@angular/core';
import { URIS } from '@app/_services';
import { ChartData } from '@app/_models';
import { BaseReport } from '@app/_bases/basereport.component';
import { PieChartComponent } from '@app/_bases/charts';
import { Device } from '@app/_models';

@Component({
  selector: 'feedbackcount-bydevice-report',
  template: `
      <app-pie-chart #feedbacks_bydevice 
        [style] = "styleData"
        [data]="chartData"
        [labels]="chartLabels">
      </app-pie-chart>
  `
})
export class FeedbacksByDevice extends BaseReport {
  chartData: Number[] = [];
  chartLabels: String[] = [];

  statistics_url = this.app_service.Based_URLs.front + URIS.front.fbcount_count_by_devices;

  constructor (public injector: Injector) {
    super(injector);
  }

  /**
   * Get all group in system
  */
  loadObjectList() {
    let filterParams = { status: 100 };
    return this.loadObjectsbyFilter(Device, filterParams);
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
        // console.log("Device list", objects)
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
          let object = object_map[object_report.device_id];
          if (object)
            this.chartLabels.push(object.name)
          else
            this.chartLabels.push(object_report.device_id);
        }  
    
      }.bind(this)
    )
  }

}

