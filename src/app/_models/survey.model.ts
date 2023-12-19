/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 14 Aug 2022
 * @purpose For working with survey model and relationship between surveys
 */

import { BaseModel } from './base.model';
import { Configure } from './configure.model';

export class SurveyModel extends BaseModel {
  
  /**
   * default_required: whether this survey answer is required or not
   */
  default_notification = 1;       // Create notification
  default_required = 1;           // Require to answer
  default_inverted_order = 0;     // From smallest to biggest

  /**
   * Add fields to based model
  */
  name: String;
  question: String;
  description: String;
  type: number = 0;
  fb_count: number;
  score: number;
  parent: String;
  sub_order: number
  ext_question: String;       // Deprecated
  scales: number;
  col_id: String;
  tags: String;
  theme_id: String;
  notification: number;
  required: number;
  inverted_order: number;

  // Extension fields - created for processing
  subs: SurveyModel[];       // Factors
  children: SurveyModel[];   // Child surveys
  configures: Configure[];             // Survey configurations
  question_texts: any[];       // Store question in defferent languages
  description_texts: any[];    // Store description in defferent languages

  question_text_links: {};    // Link language code and question text
  description_text_links: {}; // Link language code and description text

  sur_path: String;           // this field will be filled in survey tree

  static create_fields = ['status', 'name', 'question', 'description', 'type', 'sub_order', 'ext_question', 
    'col_id', 'tags', 'theme_id', 'notification', 'required', 'inverted_order', 'scales', 'parent'];
  static update_fields = ['id', 'status', 'name', 'question', 'description', 'type', 'sub_order', 'ext_question', 
    'col_id', 'tags', 'theme_id', 'notification', 'required', 'inverted_order', 'question_texts', 'description_texts', 'configures'];

  /** Survey types, in order for UI */  
  static SURVEY_TYPE = {
    CSAT: 0,    // SCAT
    NPS: 1,     // NPS
    CES: 2,     // CES
    FLX: 10,    // Flexible satisfaction survey
    SFR: 3,     // Survey factor
    MTF: 4,     // Multi factor
    EXF: 5,     // Exclusive-factor selection
    RTF: 6,     // Rating factors
    HOW: 7,     // Open question
    CONT: 9,    // Contact survey
    ATCH: 12,   // Attachment survey
    INFO: 13,   // Info survey
    MIXED: 8,   // Container
    FRM: 11     // Form based survey
  }

  /**
  * Survey Constructor
  */
  constructor( raw_data ) {
    super(raw_data);
  }

  static STATUS_LIST = {
    NEW: 0,
    ACTIVE: 1,
    INACTIVE: 2
  }

  /**
   * Init data for this model
  */
  initData() {
    this.notification = this.default_notification;
    this.required = this.default_required;
    this.inverted_order = this.default_inverted_order;
  }

}


/**
 * Express relationship between parent and child survey
*/
export class RelationModel extends BaseModel {

  parent_id: String;
  child_id: String;
  rule: String;
  child_order: number;
  status: number;
  
  static RELATION_STATUS = {
    ACTIVE: 0,
    INACTIVE: 1,
    DELETE: 2
  }

}
