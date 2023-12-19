/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 03 Nov 2022
 * @purpose define models for charts and reports
 */

import { BaseModel, CommonModel } from "./base.model";
import { DeviceModel } from "./device.model";
import { SurveyModel } from "./survey.model";

class ChartData extends CommonModel {
  label: string;
  data: any[];

}

/**
 * Options for gauge chart
*/
class GaugeChartOptions extends CommonModel {
  min: number = 0;
  max: number = 100;
  append: string = "%";      // a string appended to the Gauge's reading
  markers: any;
  thresholds: any;
  size: number = 300;
  bias: number = 0;
}

/**
 * Options for gauge chart
*/
class NumberChartOptions extends CommonModel {
  line_color: String;     // Left line color
  title_font_size: number;
  number_font_size: number;
  with_border: Boolean = false;
}

/**
 *  Hearme Options over chart
*/
class HMChartOptions extends CommonModel {

  static chart_types: {
    line: "line",
    pie: "pie",
    bar: "bar"
  }

  title_display: Boolean = false
  title_text: String;

  button_export: Boolean = false;
  button_switch_table: Boolean = false;
  border: Boolean = true;
}

class TimeFilter extends CommonModel {
  time_unit: Number;   // Default by days
  bias: Number;        // Default 30 days
}

/**
 * Define parameter for filter report result
*/
class ReportFilter extends CommonModel {
  static SEARCH_OPTIONS = {
    'Week':   {time_unit: 0, bias: 7},
    'Month':  {time_unit: 0, bias: 30},
    'Year':   {time_unit: 1, bias: 12},
  };

  fixed_time: string = "Month";     // Get following values: "Week", "Month" (default), "Year"
  time = {
    time_unit: 0,                   // Default by days
    bias: 30                        // Default 30 days
  };

  mainSurvey: SurveyModel;          // Main survey
  childSurvey: SurveyModel;
  sur_id: String = null;            // Survey id for making report
  sur_path: String = null
  type: Number;
  device: DeviceModel;
  group_id: String = null;          // group id
  device_id: String = null;         // Device id
  status: number = null;            // Survey status
}

/**
 * This class is used for filter form in correlation  page
 */
class CorrelationForm extends CommonModel  {
  // Required fields for index satisfaction survey
  index_survey: SurveyModel;
	index_sur_id: string;       // Customer Statisfaction survey id which belongs to one of these types: 0 (CSAT), 1 (NPS), 2 (CES), 10 (FLX)
  index_sur_path: string;     // Survey path for sur_id
	index_sur_type: number;     // Survey type for sur_id

  // Required field for factor survey
  factor_survey: SurveyModel;
	factor_survey_id: string;       // Customer Statisfaction survey id which belongs to one of these types: 0 (CSAT), 1 (NPS), 2 (CES), 10 (FLX)
  factor_survey_path: string;     // Factor survey path
	factor_survey_type: number;     // Factor survey type
}

/**
 * This class is used for API to calculate correlation data
 */
class CorrelationFilter extends CommonModel {
  // Required fields for index satisfaction survey
	sur_id: string;       // Customer Statisfaction survey id which belongs to one of these types: 0 (CSAT), 1 (NPS), 2 (CES), 10 (FLX)
  sur_path_1: string;   // Survey path for sur_id
	type_1: number;       // Survey type for sur_id

  // Required field for factor survey
	factor_id: string;    // survey id which belongs to one of these types:, 4 (Multi-factor Selection), 5 (Exclusive-factor Selection), 6 (Rating table)
	sur_path_2: string;    // Survey path for factor_id
	type_2: number;               // Factor survey type

  // Optional fields
	default_factor_score: number = 0; // Default score for factor at non-existing dates.
  coefficient: string = 'pearson';  // “pearson”, “spearman”,	“kendall”
  cus_id: string = null;
  device_id: string = null;
  //	Range of time - optional
  time_unit: number = 0;    // 0: by day; 1: by month
  bias: number = 30;        // from number of days (or months) before
  start_time: string = null;  // in format “YYYY-MM-dd”
  end_time: string = null;    // in format “YYYY-MM-dd”
  
}

export { ChartData, ReportFilter, TimeFilter, CorrelationForm, CorrelationFilter, HMChartOptions, GaugeChartOptions, NumberChartOptions };
