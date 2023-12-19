import {BaseObject} from './base.object';
import {URIS} from '@app/_services';

import {BaseModel} from './base.model';
import {Label} from '@app/_models/label.model';

/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date Oct 10, 2022
 * @purpose Organization in DB
 */
export class OrganizationModel extends BaseModel {

  static create_fields = ["name", "address", "phone", "url", "logo", "status"];
  static update_fields = ["id", "name", "address", "phone", "url", "logo", "type", "user_id", "status", "created", "business_field", "fb_count"];

  /** Some specific fields for this object */
  name: String;
  phone: String;
  address: String;
  url: String;
  logo: String;
  type: Number;
  business_field: Number;
  fb_count: Number;

  lang_texts = []; // List label language
  lang_text_links = {};    // Link language code and text
}


/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date Oct 10, 2022
 * @purpose Customer Object for working with customer
 */
 export class Organization extends BaseObject {

  static uri_create = URIS.main.organization_create;
  static uri_update = URIS.main.organization_update;

  /** Table and column to update language */
  static tableLang = 'organization';
  static columnLang = 'name';

  public data: OrganizationModel;
  public model_type = OrganizationModel;

  /** Create payload from object data */
  makePayload(fields) {
    if (!fields || !fields.length || !this.data) {    return this.data; }

    const payload = {};
    for (const attr of fields) {
      if (this.data.id && attr == 'name') {
        payload[attr] = this.data.lang_text_links[this.app_service.device_default_language.code].value;
      } else {
        payload[attr] = this.data[attr];
      }
    }
    return payload;
  }

  /**
   * Prepare data before update object
   * */
  preUpdate() {
    Label.updateLang(this, Organization.tableLang, Organization.columnLang, this.data.lang_texts);
  }

}

