import {Component, Injector, Input, ViewChild} from '@angular/core';
import { URIS, Utils } from '@app/_services';
import { BaseReport } from '@app/_bases/basereport.component';
import { GaugeChartOptions } from '@app/_models';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'survey-single_select-report',
  templateUrl: 'survey.single_selection.component.html'
})
export class SurveySingleSelectionReport extends BaseReport {

  statistics_url = this.app_service.Based_URLs.front + URIS.front.count_factor_feedback;
  factor_statistics_url = this.app_service.Based_URLs.front + URIS.front.statistics;
  factor_data = [];

  constructor (public injector: Injector) {
    super(injector);
    
    this.initHMChartOptions();
  }

  /**
   * Process data to insert into chart
  */
   dataProcesssing(reportData) {
    // console.log("Report data: ", reportData);
    if (!reportData)      return;

    this.rating_data = this.getFeedbackCount_ForFactors(reportData);

    // Init data for countung factor selection by time report
    this.count_by_time = { 
      labels: [], 
      datasets: []
    }
  }

  /**
   * Convert API output data to dictionary of factor id and selection count 
   * @input { factor_counts: Array[{count: 63, sur_id: "45fa99a10b299ae3c771e8e1f500585b"},...], feedbackcount: 744}
   * @outpt { 'factor_1_id': count_1 , 'factor_2_id': count_2 }
  */
  convertFactorCount_2_dictionary(reportData) {
    let res = {};
    if (reportData && reportData.factor_counts && reportData.factor_counts) {
      for (let item of reportData.factor_counts) {
        res[item.sur_id] = item.count;
      }
    }
    return res;
  }


  /**
   * Convert API output data on ratings to chart data, and factor list
   * @input { factor_counts: Array[{count: 63, sur_id: "45fa99a10b299ae3c771e8e1f500585b"},...], feedbackcount: 744}
   * @outpt { labels: ['factor_1_name', 'factor_2_name'], data: [32, 63] }
  */
  getFeedbackCount_ForFactors(reportData) {
    let factor_rating = this.convertFactorCount_2_dictionary(reportData);
    // console.log("Factor rating: ", factor_rating );

    this.factor_data = this.report_survey.subs;
    // console.log("Factor rating: ", factor_rating );

    let labels = [];
    let data = [];

    for (let item of this.factor_data) {
      let count = factor_rating[item.id];
      let label = Utils.string_trim(item.question, BaseReport.LABEL_LENGTH_MAX, true);
      labels.push(label);
      data.push(count);
      item["count"] = count;
    }
    return {
      labels: labels,
      data: data
    };
  }

  /**
   * Make report on factor selection by time
  */
  factor_Click(event, factor, factor_index) {
    // console.log("Element checked: ", event.srcElement.checked);
    // console.log("Request for factor:", factor);
    // console.log("Factor index: ", factor_index);

    if (!event || !event.srcElement)    return;

    if (event.srcElement.checked) {
      // Add index to factor then load statistics
      factor["factor_index"] = factor_index;
      this.loadFactor_statistic(factor);

    } else {
      // Remove factor statistics

    }

  }

  factorDataProcesssing(report_data, factor) {
    let count_bytimes = report_data.count_bytimes;
    
    const oneSet: ChartDataSets = {
      data: [],
      label: Utils.string_trim(factor.question, BaseReport.LABEL_LENGTH_MAX, true)
    };    
    if (count_bytimes && count_bytimes.length) {
      for (let item of count_bytimes) {
        this.count_by_time.labels.push(item.time);
        oneSet.data.push(item.count);
      }
    }
    this.count_by_time.datasets.push(oneSet);
  }

}