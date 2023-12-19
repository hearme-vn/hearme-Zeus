import {Component, Injector, Input, ViewChild} from '@angular/core';
import {APPCONSTS, AuthenticationService, URIS} from '@app/_services';
import {ChartData} from '@app/_models';
import { BaseReport } from '@app/_bases/basereport.component';
import { PieChartComponent } from '@app/_bases/charts';
import { Group } from '@app/_models/group.model';

@Component({
  selector: 'feedbackcount-bygroup-report',
  template: `
      <app-pie-chart #feedbacks_bygroup 
        [style] = "styleData"
        [data]="chartData"
        [labels]="chartLabels">
      </app-pie-chart>
  `
})
export class FeedbacksByGroup extends BaseReport {
  
  @ViewChild('feedbacks_bygroup') feeChart: PieChartComponent;

  chartData = [];
  chartLabels = [];

  statistics_url = this.app_service.Based_URLs.front + URIS.front.fbcount_count_by_groups;

  constructor (public injector: Injector) {
    super(injector);
  }

  /**
   * Get all group in system
  */
  loadGroupList() {
    let filterParams = { status: 100 };
    return this.loadObjectsbyFilter(Group, filterParams);
  }

  /**
   * Process data to insert into chart
  */  
  dataProcesssing(reportData) {
    // console.log("Report data: ", reportData);
    if (!reportData || !reportData.length)      return;

    this.chartData = [];
    this.chartLabels = [];

    this.loadGroupList().subscribe(
      function(groups) {
        // console.log("Group list", groups)
        //Mapping group with id
        let group_map = {}
        if (groups && groups.length) {
          for (let group of groups) {
            group_map[group.id] = group;
          }
        }

        // make report dataset
        for (let group_report of reportData) {
          // console.log("Group report data: ", group_report);
          // Group count
          this.chartData.push(group_report.count);

          // Group name
          let group = group_map[group_report.grp_id];
          if (group)
            this.chartLabels.push(group.name)
          else
            this.chartLabels.push(group.grp_id);
        }  
    
      }.bind(this)
    )
  }

}

