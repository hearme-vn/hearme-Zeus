import { Component, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '@app/_bases';
import { CorrelationFilter, CorrelationForm, Survey, SurveyModel } from '@app/_models';
// import { TreeviewConfig, TreeviewItem } from '@ngx-treeview';
// import { Survey } from '@app/_models';

@Component({
  templateUrl: 'correlation_analysis.component.html',
  styleUrls: ['correlation_analysis.component.css']
})
export class RelationAnalysisComponent extends BaseComponent {
  constructor (public injector: Injector) {
    super(injector);
  }

  /**
   * filter structure for report
  */
  cor_filterData: CorrelationForm;

  // surveys: [];
  main_survey_filter = [0, 1, 2, 5, 8, 10, 11];
  index_survey_filter = [0, 1, 2, 10];
  factor_survey_filter = [4, 5, 6];

  selectedSurvey = null;
  survey_tree = null;     // Tree from API
  index_survey_tree = null;     // tree items for UI component
  factor_survey_tree = null;    // tree items for UI component

  // child_surveys = null;
  indexSurvey: SurveyModel = null;
  factorSurvey: SurveyModel = null;
  
  // config = TreeviewConfig.create({
  //   hasAllCheckBox: true,
  //   hasFilter: true,
  //   hasCollapseExpand: true,
  //   decoupleChildFromParent: false,
  //   maxHeight: 400
  // });
  config = {
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400,
    allow_root_survey: true
  };

  /** Load init data */
  loadMainPageObjects(): void {
  }

  /**
   * hanlde event on change main survey selection
  */
  mainSurveyChange($event) {
    // console.log("Main survey for analysis: ", $event);
    // console.log("selected survey model: ", this.selectedSurvey);
    this.selectedSurvey = $event;
    this.indexSurvey = null;
    this.factorSurvey = null;
  }

  /**
   * Change index survey in survey tree
  */
  onIndexSurveyChange($event) {
    this.indexSurvey = $event
    // console.log("Index Survey: ", this.indexSurvey);
    // console.log("Factor Survey: ", this.factorSurvey);
  }

  /**
   * Change factor survey in survey tree
  */
  onFactorSurveyChange($event) {
    this.factorSurvey = $event;
    // console.log("Index Survey: ", this.indexSurvey);
    // console.log("Factor Survey: ", this.factorSurvey);
  }

  analysis() {
    // if (!this.indexSurvey || !this.factorSurvey)    return;

    let filter = {
      index_survey: this.indexSurvey,
      index_sur_id: this.indexSurvey.id,
      index_sur_path: this.indexSurvey.sur_path,
      index_sur_type: this.indexSurvey.type,

      factor_survey: this.factorSurvey,
      factor_survey_id: this.factorSurvey.id,
      factor_survey_path: this.factorSurvey.sur_path,
      factor_survey_type: this.factorSurvey.type,
      default_factor_score: 0
    }
    let filter2 = {
      "index_sur_id": "ee8f78480069bc6544a4873aec79dc19",
      "index_sur_path": "9f6747b3c6449cc8a6039684eb7d2a3e",
      "index_sur_type": 0,
      "factor_survey_id": "5e21c7956ace1ca7381320d0e49fa969",
      "factor_survey_path": "9f6747b3c6449cc8a6039684eb7d2a3e.ee8f78480069bc6544a4873aec79dc19.bad",
      "factor_survey_type": 4,
      "default_factor_score": 0
    }

    console.log("Correlation filter: ", filter);
    this.cor_filterData = new CorrelationForm(filter);
    // this.cor_filterData = new CorrelationForm(filter2);
  }
}
