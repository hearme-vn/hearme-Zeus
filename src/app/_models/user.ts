import { BaseModel } from './base.model';
import { BaseObject } from './base.object';
// import { Timestamp } from 'rxjs/internal/operators/timestamp';

/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 2 Apr 2020
 * @purpose User model
 */
export class UserModel extends BaseModel {
  id: String;
  username: String;
  password:String;
  email: String;
  first_name: String;
  last_name: String;
  name: String;
  address: String;
  phone: String;
  birthday: Date;
  org_id: String;
  prepaid: Number;
  balance: Number;
  lock_time: Date;
  created: Date;
  status: Number;
  validated: Number;
  default_lang: Number;
  login_failed_count: Number;
  login_failed_time: Date;
  login_verify_code: String
}



export class User extends BaseObject {

  
}
