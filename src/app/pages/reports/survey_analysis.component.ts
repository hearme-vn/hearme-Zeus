import { Component, Injector, ViewChild } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from '@ngx-treeview';

import { BaseComponent } from '@app/_bases';
import { ReportFilter, SurveyModel } from '@app/_models';
import { URIS } from '@app/_services';

/**
 * @license hearme 
 * @copyright 2017-2022 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 02 Nov 2022
 * @purpose for creating surveys
 */
@Component({
  templateUrl: 'survey_analysis.component.html',
  styleUrls: ['survey_analysis.component.css']
})
export class SurveyAnalysisComponent extends BaseComponent {
  public device_list: [] = [];

  constructor (public injector: Injector) {
    super(injector);
  }

  SEARCH_TIME = [
    {key: 0, name: 'REPORT.CB_BY_DAY', lstValue: []},
    {key: 1, name: 'REPORT.CB_BY_MONTH', lstValue: []},
    {key: 2, name: 'REPORT.CB_CUSTOM', lstValue: []},
  ];

  /**
   * selected filters in form
  */
  form_filter: ReportFilter = new ReportFilter();
  report_filter: ReportFilter;

  /**
   * Change main survey
   * */ 
  mainSurveyChange(survey: SurveyModel) {
    this.form_filter.mainSurvey = survey;
    this.form_filter.childSurvey = null;

    this.form_filter.sur_id = survey.id;
    this.form_filter.type = survey.type;
    this.form_filter.sur_path = null;

    // // console.log("Changed main survey");
    // // Get survey tree from main survey
    let url = this.app_service.Based_URLs.main + URIS.main.survey_tree;
    let payload = {
      id: this.form_filter.mainSurvey.id
    }
    this.app_service.postAPI(url, payload, 
      function(survey) {
        this.child_surveys = [];

        // console.log("Survey tree: ", res);
        if (survey && survey.children && survey.children.length) {
          for (let child of survey.children) {
            this.child_surveys.push(new TreeviewItem(child));
          }
        }
      }.bind(this)
    );

    // get Groups
    this.getGrouplist(this.form_filter.mainSurvey.id);
    // get Devices
    // this.getDevicelist();
  }

  groupChange() {
    this.getDevicelist(this.form_filter.group_id);
  }

  deviceChange(device) {
    console.log("Selected device: ", this.form_filter.device);
    this.form_filter.device_id = device.id;
  }

  /**
   * Load all supportive data, such as some list displayed in form
   */
  loadSupportiveData() {
    // load search time
    for (let i = 1; i <= 90; i++) {
      var item = { value: i, name: 'REPORT.LB_DAY' };
      this.SEARCH_TIME[0].lstValue.push(item);
    }
    for (let i = 1; i <= 12; i++) {
      var item = { value: i, name: 'REPORT.LB_MONTH' };
      this.SEARCH_TIME[1].lstValue.push(item);
    }

  }

  /**
   * Change selected survey
  */
  onSurveyChange(survey: SurveyModel) {
    if (survey) {
      // console.log("Change selected survey", $event);
      this.form_filter.childSurvey = survey;
      this.form_filter.sur_id = survey.id;
      this.form_filter.type = survey.type;
      this.form_filter.sur_path = survey.sur_path;
    } else {
      this.form_filter.childSurvey = null;
      this.form_filter.sur_id = this.form_filter.mainSurvey.id;
      this.form_filter.type = this.form_filter.mainSurvey.type;
      this.form_filter.sur_path = "";
    }
  }

  /**
   * Method to call analysis component
   * - make filter condition
   * - assign to analysis component
   * */ 
  analysis() {
    // if (!this.form_filter.mainSurvey)    return;
    this.report_filter = <ReportFilter>{
      time: this.form_filter.time,
      mainSurvey: this.form_filter.mainSurvey,
      childSurvey: this.form_filter.childSurvey,
      sur_id: this.form_filter.sur_id,
      type: this.form_filter.type,
      group_id: this.form_filter.group_id,
      device_id: this.form_filter.device_id,
      status: this.form_filter.status,
      sur_path: this.form_filter.sur_path
    };

    let report_filter_CSAT =  <any>{
      "time": {
          "time_unit": 1,
          "bias": 30
      },
      "sur_id": "ee8f78480069bc6544a4873aec79dc19",
      "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e",
      "group_id": null,
      "device_id": null,
      "status": null,
      "mainSurvey": <any>{
          "id": "9f6747b3c6449cc8a6039684eb7d2a3e",
          "name": "Ngân hàng",
          "question": "",
          "description": null,
          "status": 1,
          "type": 8,
          "user_id": "7af817add3f8fe6232c16bd15d12faf7",
          "fb_count": 0,
          "score": 0,
          "created": <any>"2018-06-26T17:26:53+07:00",
          "parent": null,
          "sub_order": 0,
          "ext_question": null,
          "scales": 5,
          "org_id": null,
          "col_id": null,
          "tags": null,
          "theme_id": null,
          "notification": 0,
          "required": 1,
          "inverted_order": 0
      },
      "childSurvey": <any>{
          "id": "ee8f78480069bc6544a4873aec79dc19",
          "name": "SCAT _Public theme",
          "question": "Bạn vui lòng cho biết bạn có hài lòng với dịch vụ chúng tôi không?",
          "description": "Test date",
          "status": 1,
          "type": 0,
          "user_id": "7af817add3f8fe6232c16bd15d12faf7",
          "fb_count": 0,
          "score": 0,
          "created": <any>"2019-06-01T11:02:59+07:00",
          "parent": null,
          "sub_order": 0,
          "ext_question": null,
          "scales": 5,
          "org_id": null,
          "col_id": null,
          "tags": null,
          "theme_id": "4fb4ff03e954b1041d3d50ec0282a572",
          "notification": 1,
          "required": 1,
          "inverted_order": 0,
          "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e",
          "subs": [],
          "configures": []
      },
      "type": 0
    }


    // CES
      let report_filter_CES =  <any>{
        "time": {
            "time_unit": 1,
            "bias": 30
        },
        "sur_id": "ee8f78480069bc6544a4873aec79dc19",
        "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e",
        "group_id": null,
        "device_id": null,
        "status": null,
        "mainSurvey": <any>{
            "id": "9f6747b3c6449cc8a6039684eb7d2a3e",
            "name": "Ngân hàng",
            "question": "",
            "description": null,
            "status": 1,
            "type": 8,
            "user_id": "7af817add3f8fe6232c16bd15d12faf7",
            "fb_count": 0,
            "score": 0,
            "created": <any>"2018-06-26T17:26:53+07:00",
            "parent": null,
            "sub_order": 0,
            "ext_question": null,
            "scales": 5,
            "org_id": null,
            "col_id": null,
            "tags": null,
            "theme_id": null,
            "notification": 0,
            "required": 1,
            "inverted_order": 0
        },
        "childSurvey": <any>{
          "id": "d37b02a33299a6a4aedc10b66ee8f243",
          "name": "Đo Lường CES-Theme Basic",
          "question": "hearme có dễ sử dụng không? \\n Is hearme easy to use?",
          "description": null,
          "status": 1,
          "type": 2,
          "user_id": "7af817add3f8fe6232c16bd15d12faf7",
          "fb_count": 0,
          "score": 0,
          "created": "2018-03-01T17:40:56+07:00",
          "parent": null,
          "sub_order": 0,
          "ext_question": "Bạn gặp khó khăn ở công đoạn nào?",
          "scales": 7,
          "org_id": null,
          "col_id": null,
          "tags": null,
          "theme_id": "eb5428ce373ffdb08a674e837c374c84",
          "notification": 1,
          "required": 0,
          "inverted_order": 0,
          "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e",
          "subs": [],
          "configures": [],
          "text": "Đo Lường CES-Theme Basic",
          "value": "d37b02a33299a6a4aedc10b66ee8f243"
        },    
        "type": 2
    }

    let report_filter_NPS =  <any>{
      "time": {
          "time_unit": 1,
          "bias": 15
      },
      "sur_id": "ee8f78480069bc6544a4873aec79dc19",
      "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e",
      "group_id": null,
      "device_id": null,
      "status": null,
      "mainSurvey": <any>{
          "id": "9f6747b3c6449cc8a6039684eb7d2a3e",
          "name": "Ngân hàng",
          "question": "",
          "description": null,
          "status": 1,
          "type": 8,
          "user_id": "7af817add3f8fe6232c16bd15d12faf7",
          "fb_count": 0,
          "score": 0,
          "created": <any>"2018-06-26T17:26:53+07:00",
          "parent": null,
          "sub_order": 0,
          "ext_question": null,
          "scales": 5,
          "org_id": null,
          "col_id": null,
          "tags": null,
          "theme_id": null,
          "notification": 0,
          "required": 1,
          "inverted_order": 0
      },
      "childSurvey": <any>{
        "id": "1eca6f1bd72982af42072f2d22605366",
        "name": "NPS _ THEME basic",
        "question": "tiếng việt \\n Bạn có hài lòng không \\nXin cảm ơn?",
        "description": "Good",
        "status": 1,
        "type": 1,
        "user_id": "7af817add3f8fe6232c16bd15d12faf7",
        "fb_count": 0,
        "score": 0,
        "created": "2019-11-16T12:25:43+07:00",
        "parent": null,
        "sub_order": 0,
        "ext_question": null,
        "scales": 11,
        "org_id": null,
        "col_id": null,
        "tags": null,
        "theme_id": "eb5428ce373ffdb08a674e837c374c84",
        "notification": 1,
        "required": 1,
        "inverted_order": 0,
        "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e",
        "subs": [],
        "configures": [],
        "text": "NPS _ THEME basic",
        "value": "1eca6f1bd72982af42072f2d22605366"
      },
      "type": 1
    }

    let flx_child = {
      "id": "36be6b34af3eb12c041cd1c1aecce04e",
      "name": "FLX 5 mức - Theme Public",
      "question": "FLX 5 mức",
      "description": "FLX 5 mức",
      "status": 1,
      "type": 10,
      "user_id": "7af817add3f8fe6232c16bd15d12faf7",
      "fb_count": 0,
      "score": 0,
      "created": "2019-03-04T22:44:59+07:00",
      "parent": null,
      "sub_order": 0,
      "ext_question": null,
      "scales": 5,
      "org_id": null,
      "col_id": "fae1df82bb2c1929453e8d11f3abecc5",
      "tags": null,
      "theme_id": "c0ce6c92a9337c8558f8078c774be61e",
      "notification": 1,
      "required": 1,
      "inverted_order": 0,
      "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e",
      "subs": [],
      "configures": [],
      "text": "FLX 5 mức - Theme Public",
      "value": "36be6b34af3eb12c041cd1c1aecce04e"
    }

    let single_select = {
      "id": "9cf49d9ba32782a5bb8609db35f4fb94",
      "name": "Thủ tục hành chính - No images - Theme Basic",
      "question": "What can we do for you? \\n What are you doing?",
      "description": null,
      "status": 1,
      "type": 5,
      "user_id": "7af817add3f8fe6232c16bd15d12faf7",
      "fb_count": 0,
      "score": 0,
      "created": "2018-06-26T13:38:24+07:00",
      "parent": null,
      "sub_order": 0,
      "ext_question": null,
      "scales": 5,
      "org_id": null,
      "col_id": "b92f435597f689345aef5d5396ab87a9",
      "tags": null,
      "theme_id": "eb5428ce373ffdb08a674e837c374c84",
      "notification": 0,
      "required": 1,
      "inverted_order": 0,
      "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e",
      "subs": [
          {
              "id": "4ff4b01111afef77608788f1c30fc3d9",
              "name": "Thủ tục hành chính",
              "question": "Cấp giấy chứng nhận quyền sử dụng đất? \\n Properties license? \\ncầu thủ đôi bên đã đẩy nhanh tốc độ và quyết liệt.",
              "description": "Ngay sau tiếng còi khai cuộc của trọng tài người Indonesia Wecaksana, cầu thủ đôi bên đã đẩy nhanh tốc độ và quyết liệt.",
              "status": 1,
              "type": 3,
              "user_id": "7af817add3f8fe6232c16bd15d12faf7",
              "fb_count": 0,
              "score": 0,
              "created": "2018-06-26T13:39:19+07:00",
              "parent": "9cf49d9ba32782a5bb8609db35f4fb94",
              "sub_order": 1,
              "ext_question": null,
              "scales": 5,
              "org_id": null,
              "col_id": null,
              "tags": null,
              "theme_id": null,
              "notification": 0,
              "required": 1,
              "inverted_order": 0,
              "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e.9cf49d9ba32782a5bb8609db35f4fb94"
          },
          {
              "id": "a53cd3cc267050483f2bc7736af582a8",
              "name": "Thủ tục hành chính",
              "question": "Cấp giấy phép xây dựng nhà ở",
              "description": "Phương án này chỉ giống như pha loãng nước thải tại vị trí đó và đẩy ô nhiễm đi qua nơi khác.",
              "status": 1,
              "type": 3,
              "user_id": "7af817add3f8fe6232c16bd15d12faf7",
              "fb_count": 0,
              "score": 0,
              "created": "2018-06-26T13:39:36+07:00",
              "parent": "9cf49d9ba32782a5bb8609db35f4fb94",
              "sub_order": 2,
              "ext_question": null,
              "scales": 5,
              "org_id": null,
              "col_id": null,
              "tags": null,
              "theme_id": null,
              "notification": 0,
              "required": 1,
              "inverted_order": 0,
              "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e.9cf49d9ba32782a5bb8609db35f4fb94"
          },
          {
              "id": "2a95c8166a65fafcd5420f4e5f6c28c6",
              "name": "Thủ tục hành chính",
              "question": "Cấp mới, cấp đổi lại sổ hộ khẩu",
              "description": "Phương án này chỉ giống như pha loãng nước thải tại vị trí đó và đẩy ô nhiễm đi qua nơi khác.",
              "status": 1,
              "type": 3,
              "user_id": "7af817add3f8fe6232c16bd15d12faf7",
              "fb_count": 0,
              "score": 0,
              "created": "2018-06-26T13:39:54+07:00",
              "parent": "9cf49d9ba32782a5bb8609db35f4fb94",
              "sub_order": 3,
              "ext_question": null,
              "scales": 5,
              "org_id": null,
              "col_id": null,
              "tags": null,
              "theme_id": null,
              "notification": 0,
              "required": 1,
              "inverted_order": 0,
              "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e.9cf49d9ba32782a5bb8609db35f4fb94"
          },
          {
              "id": "3799fec85fec08a5c9c5c4c8dffc337b",
              "name": "Thủ tục hành chính",
              "question": "Đăng ký kết hôn",
              "description": "Phương án này chỉ giống như pha loãng nước thải tại vị trí đó và đẩy ô nhiễm đi qua nơi khác.",
              "status": 1,
              "type": 3,
              "user_id": "7af817add3f8fe6232c16bd15d12faf7",
              "fb_count": 0,
              "score": 0,
              "created": "2018-06-26T13:43:40+07:00",
              "parent": "9cf49d9ba32782a5bb8609db35f4fb94",
              "sub_order": 4,
              "ext_question": null,
              "scales": 5,
              "org_id": null,
              "col_id": null,
              "tags": null,
              "theme_id": null,
              "notification": 0,
              "required": 1,
              "inverted_order": 0,
              "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e.9cf49d9ba32782a5bb8609db35f4fb94"
          },
          {
              "id": "a55ac4504ef2ecabe632cafa942e15e1",
              "name": "Thủ tục hành chính",
              "question": "Công chứng",
              "description": "Phương án này chỉ giống như pha loãng nước thải tại vị trí đó và đẩy ô nhiễm đi qua nơi khác",
              "status": 1,
              "type": 3,
              "user_id": "7af817add3f8fe6232c16bd15d12faf7",
              "fb_count": 0,
              "score": 0,
              "created": "2018-06-26T13:43:52+07:00",
              "parent": "9cf49d9ba32782a5bb8609db35f4fb94",
              "sub_order": 5,
              "ext_question": null,
              "scales": 5,
              "org_id": null,
              "col_id": null,
              "tags": null,
              "theme_id": null,
              "notification": 0,
              "required": 1,
              "inverted_order": 0,
              "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e.9cf49d9ba32782a5bb8609db35f4fb94"
          },
          {
              "id": "bed4054f337760e265d1c03873d7aa35",
              "name": "Thủ tục hành chính - No images",
              "question": "Không chọn",
              "description": "Phương án này chỉ giống như pha loãng nước thải tại vị trí đó và đẩy ô nhiễm đi qua nơi khác",
              "status": 1,
              "type": 3,
              "user_id": "7af817add3f8fe6232c16bd15d12faf7",
              "fb_count": 0,
              "score": 0,
              "created": "2019-05-03T16:17:39+07:00",
              "parent": "9cf49d9ba32782a5bb8609db35f4fb94",
              "sub_order": 6,
              "ext_question": null,
              "scales": 5,
              "org_id": null,
              "col_id": null,
              "tags": null,
              "theme_id": null,
              "notification": 0,
              "required": 1,
              "inverted_order": 0,
              "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e.9cf49d9ba32782a5bb8609db35f4fb94"
          },
          {
              "id": "2170b456fc4aa656123829852557058a",
              "name": "Thủ tục hành chính - No images",
              "question": "New factor",
              "description": "factor description",
              "status": 1,
              "type": 3,
              "user_id": "7af817add3f8fe6232c16bd15d12faf7",
              "fb_count": 0,
              "score": 0,
              "created": "2019-09-21T19:01:10+07:00",
              "parent": "9cf49d9ba32782a5bb8609db35f4fb94",
              "sub_order": 7,
              "ext_question": null,
              "scales": 5,
              "org_id": null,
              "col_id": null,
              "tags": null,
              "theme_id": null,
              "notification": 0,
              "required": 1,
              "inverted_order": 0,
              "sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e.9cf49d9ba32782a5bb8609db35f4fb94"
          }
      ],
      "configures": [],
      "text": "Thủ tục hành chính - No images - Theme Basic",
      "value": "9cf49d9ba32782a5bb8609db35f4fb94"
    }

    report_filter_CSAT.childSurvey = single_select;
    report_filter_CSAT.sur_id = '9cf49d9ba32782a5bb8609db35f4fb94';
    report_filter_CSAT.type = 5;

    this.form_filter = report_filter_CSAT;
    console.log("Filter: ", this.form_filter);
  }  
}

