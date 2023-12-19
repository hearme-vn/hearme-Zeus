import { Injector, OnChanges, OnInit, SimpleChanges, Input, ViewChild, Component } from '@angular/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { BaseObject, HMChartOptions, NumberChartOptions, ReportFilter, SurveyModel } from '@app/_models';
import { APPCONSTS, APPService, AuthenticationService, I18nService, URIS } from '@app/_services';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration, ChartDataSets, ChartTooltipLabelColor } from 'chart.js';

/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 17 Dec 2020
 * @purpose Get data from server, preprocess data and call to charts
 * 
 * @input filter parameter
 * @output data for chart
 */
@Component({
  template: ''
})
export class BaseReport implements OnInit, OnChanges {
  static DECIMAL_PLACES = 2;
  static LABEL_LENGTH_MAX = 20;

  static SEARCH_OPTIONS = {
    'Week':   {time_unit: 0, bias: 7},
    'Month':  {time_unit: 0, bias: 30},
    'Year':   {time_unit: 1, bias: 12},
  };

  // Filter time type
  @Input('style')   styleData = 'hm_report';
  @Input('filter')  filter_data = new ReportFilter()

  /**
   * URL for getting statistics data
  */
  statistics_url = "";
  factor_statistics_url = "";

  /**
   * Data for reports
  */
  report_survey: SurveyModel;
  report_data = null;
  count_by_time = null;
  score_by_time = null;
  rating_data = null;

  /**
   * Chart options
  */
   public lineChartOptions: ChartConfiguration['options']  = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return <ChartTooltipLabelColor>{ backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any, index) {
            return index % 2 === 0 ? value : '';
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },

    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false,
    },
    plugins: {
      legend: {
        display: false
      }
    }
  
  };


  /**
   * Hearme options for chart types
  */
  hmoptions_satisfaction_score: HMChartOptions;
  hmoptions_score_bytime: HMChartOptions;
  hmoptions_feedbackcount_bytime: HMChartOptions;
  hmoptions_rating_proportions: HMChartOptions;    

  numberChartOptions = new NumberChartOptions({
    line_color: "green",
    title_font_size: 16,      // In pixel
    number_font_size: 16,     // In pixel
    with_border: true  
  });

  public injector: Injector;
  public app_service: APPService;
  public authenticationService: AuthenticationService;
  public translate: TranslateService;

  constructor (injector: Injector) {
    this.injector = injector;

    // Store all dependency services
    this.app_service = injector.get(APPService);
    // this.authenticationService = injector.get(AuthenticationService);
    this.translate = injector.get(TranslateService);

  }

  initHMChartOptions() {
    this.hmoptions_satisfaction_score = new HMChartOptions({"title_text": this.translate.instant('REPORT.SATISFACTION_SCORE')});
    this.hmoptions_score_bytime = new HMChartOptions({"title_text": this.translate.instant('REPORT.SCORE_BY_TIME')});
    this.hmoptions_feedbackcount_bytime = new HMChartOptions({"title_text": this.translate.instant('REPORT.FBCOUNT_BY_TIME')});
    this.hmoptions_rating_proportions = new HMChartOptions({"title_text": this.translate.instant('REPORT.RATING_PROPORTIONS')});  
  }

  /**
   * handle changing event from 
  */
  ngOnChanges(changes: SimpleChanges): void {
    // change values in inputs
    // console.log("Changed in input values: ", this.filter_data);
    this.report_survey = this.filter_data.childSurvey || this.filter_data.mainSurvey;
    this.loadData();
  }

  
  ngOnInit(): void {
    // Init data
    // console.log("Init component data");
    // this.loadData();
  }

  /**
   * Make payload from filter data
  */
  makePayload() {
    let payload = {};

    // Time filter
    if (this.filter_data && this.filter_data.fixed_time) {
      payload = Object.assign(BaseReport.SEARCH_OPTIONS[this.filter_data.fixed_time]);
    } else {
      payload = {
        time_unit: Number(this.filter_data.time.time_unit),
        bias: Number(this.filter_data.time.bias)
      }
    }
    
    // survey filter
    if (this.filter_data.sur_id)    { 
      payload["sur_id"] = this.filter_data.sur_id;
      payload["type"] = this.filter_data.type;
    }

    // others
    if (this.filter_data.sur_path)    payload["sur_path"] = this.filter_data.sur_path;
    if (this.filter_data.group_id)    payload["group_id"] = this.filter_data.group_id;
    if (this.filter_data.device_id)    payload["device_id"] = this.filter_data.device_id;
    if (this.filter_data.status)    payload["status"] = this.filter_data.status;

    return payload;
  }

  /**
   * Make payload from filter data for factor
  */
   makeFactorPayload(factor: SurveyModel) {
    let payload = {};

    // Time filter
    if (this.filter_data && this.filter_data.fixed_time) {
      payload = Object.assign(BaseReport.SEARCH_OPTIONS[this.filter_data.fixed_time]);
    } else {
      payload = {
        time_unit: Number(this.filter_data.time.time_unit),
        bias: Number(this.filter_data.time.bias)
      }
    }
    
    // factor filter
    if (this.filter_data.sur_id)    { 
      payload["sur_id"] = factor.id;
      payload["type"] = factor.type;
    }

    // others
    if (this.report_survey.sur_path)    payload["sur_path"] = this.report_survey.sur_path;

    if (this.filter_data.group_id)    payload["group_id"] = this.filter_data.group_id;
    if (this.filter_data.device_id)    payload["device_id"] = this.filter_data.device_id;
    if (this.filter_data.status)    payload["status"] = this.filter_data.status;

    return payload;
  }

  /**
   * Post data processing, for example: make chart options
  */
  postProcessing(report_data) {}

  /**
   * Convert API output data on ratings to chart data
   * @input rating_data: Array[{count: 63, proportion: 8.47, rating: 1}]
   * @outpt {labels: ['Satisfied', 'Very Satisfied'], data: [3, 6] }
  */
  getFeedbackCountRating(rating_data) {}

  /**
   * Process data to insert into chart
  */
  dataProcesssing(reportData) {
    //console.log("Report data: ", reportData);
    if (!reportData)      return;

    // Make data for feedback count by time report - All report
    this.getFeedbackCountByTime(reportData.count_bytimes);

    // Make data for scores by times report - for index survey
    this.getScoreByTimeData(reportData.score_bytimes);

    // Prepare data for rating propotion in pie chart. Apply for index surveys
    this.rating_data = this.getFeedbackCountRating(reportData.ratings);
  }

  /**
   * Get data for report
   * @input options = { payload: any, ...} 
  */
  loadData(options=null) {
    if (!this.statistics_url)     return;

    let payload = null;
    if (!options || !options.payload)   
      payload = this.makePayload();
    else
      payload = options.payload;

    this.app_service.postAPI(this.statistics_url, payload, 
      function(res) {
        // console.log("Report data: ", res);
        this.report_data = res;        
        this.dataProcesssing(res);
        this.postProcessing(res);
      }.bind(this)
    );
  }

  /**
   * Process factor report data 
  */
  factorDataProcesssing(report_data, factor) {}

  /**
   * Post-process factor report data 
  */
  postFactorProcessing(report_data, factor) {}

  /**
   * Get data report for factor
   * @input options = { payload: any, ...} 
  */
  loadFactor_statistic(factor: SurveyModel, options=null) {
    if (!this.factor_statistics_url)     return;

    let payload = null;
    if (!options || !options.payload)   
      payload = this.makeFactorPayload(factor);
    else
      payload = options.payload;

    this.app_service.postAPI(this.factor_statistics_url, payload, 
      function(res) {
        console.log("Factor report data: ", res);
        this.factorDataProcesssing(res, factor);
        this.postFactorProcessing(res, factor);
      }.bind(this)
    );
  }  

  /**
   * Get all objects that meet condition in params
   * */ 
  loadObjectsbyFilter(ObjectClass: typeof BaseObject, filterParams) {
    let url = this.app_service.Based_URLs.main + ObjectClass.uri_list;

    return this.app_service.postAPI_Observable(url, filterParams);
  }

  /**
   * Get object information by id - using get method API
   * @Return Observable object
  */
  public getObjectDataById_GETMETHOD(id, object_class = BaseObject ) {
    const url =  this.app_service.Based_URLs.main + object_class.uri_info;
    let data = { "id": id};
    return this.app_service.getAPI_Observable(url, data);
  }
  
  /**
   * Make time labels  for all charts
   * @input is time_range, with value is following:
   * - 'Week':   {time_unit: 0, bias: 7},
   * - 'Month':  {time_unit: 0, bias: 30},
   * - 'Year':   {time_unit: 1, bias: 12},
   */
  makeLabels(time_range): any[] {
    const bias = BaseReport.SEARCH_OPTIONS[time_range].bias;
    const labels = [];
    
    if (time_range !== 'Year') {
      for (let i = bias; i > 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i + 1);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        labels.push(year + '-' + month + '-' + day);
      }
    } else {
      for (let i = bias; i > 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i + 1);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        labels.push(year + '-' + month);
      }
    }
    return labels;
  }

  /**
   * Convert API output data on feedback count by time to chart data
   * @input series_by_times: Array[{count: 3, time: '2022-07'}]
   * @outpt {labels: ['2022-07', '2022-08'], datasets: [3, 6] }
  */
  getFeedbackCountByTime(count_bytimes) {
    let res = { 
      labels: [], 
      datasets: []
    }
    const oneSet: ChartDataSets = {
      data: [],
      label: this.translate.instant("REPORT.FBCOUNT_BY_TIME")
    };    
    if (count_bytimes && count_bytimes.length) {
      for (let item of count_bytimes) {
        res.labels.push(item.time);
        oneSet.data.push(item.count);
      }
    }
    res.datasets.push(oneSet);

    this.count_by_time = res;
    return res;
  }

  /**
   * Make data of satisfaction score by times for line chart
  */
  getScoreByTimeData(score_bytimes) {
    let res = { 
      labels: [], 
      datasets: []
    }
    const oneSet: ChartDataSets = {
      data: [],
      label: this.translate.instant("REPORT.SCORE_BY_TIME")
    };    
    if (score_bytimes && score_bytimes.length) {
      for (let item of score_bytimes) {
        res.labels.push(item.time);
        oneSet.data.push(item.score);
      }
      res.datasets.push(oneSet);
    }
    this.score_by_time = res;
    return res;
  }
    
}
