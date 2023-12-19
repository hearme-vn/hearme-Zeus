// Angular libraries
import { Injector, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';

// Third party libraries
// import { InfiniteScroll } from 'ngx-infinite-scroll';

import {BaseObject} from '@app/_models';
import { APPService, URIS, APPCONSTS, I18nService, AuthenticationService } from '@app/_services';
import { BaseComponent } from './base.component';

/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 2 Apr 2020
 * @purpose Base component, will be extended by all page components
 * This provide common method for all components
 */
/**
 * Purpose: Base Component for pages in type of list of one object
*/
class TablePageComponent extends BaseComponent {

  /**
   * object type is defined in models folder
   * - If this is null, this class get list of object through uri_list defined in object type
   * - Other, this URL will be more priority
  */
  getlist_url = "";   
  form_data = {};      
  nextOffset = true;
  params = null;

  /**
   * array of main objects for this page
  */
  objects = null;

  /**
   * Working object - a multi purpose property: 
   * used for cases such as creating new object, updating object
   * */
  object = null;

  /**
   * Hold reference to object that is updating
  */
  updating_object = null;

  /** object Type: 
   * - is defined in models folder 
   * - Type of object that this page mainly working on
  */
  object_type = BaseObject;

  /**
   * status: list of status for filtering object in form
  */
  status_list = [
    { name_key: 'APP.UI_STATUS_ACTIVE', value: 0 },
    { name_key: 'APP.UI_STATUS_INACTIVE', value: 1 }
  ]

  /**
   * - Device list keeps all device information that user has permisson.
   * - Used in many cases
   * */ 
  public device_list: [];

  /**
   * filtering_form: includes fields for filtering list of objects
  */
  filtering_form = {};

  /** Dialog handle for creating, updating object */
  creating_Dialog: ModalDirective;

  /** Dialog handle for showing object information */
  information_Dialog: ModalDirective;

  constructor( injector: Injector
    ) {

    super(injector);
  }

  /**
   * Make params for getting list of objects
   */ 
  initParams() {
    return {
      "offset": 0,
      "limit": this.APPCONSTS.FIRSTLOAD_COUNT
    }
  }
  
  /**
   * Load object  data into page
  */
  loadMainPageObjects() {
    // start search
    this.search();
  }
    
  /**
   * Make search parameters from filter form
   **/ 
  searchPrams() {}

  /**
   *  Search for list of main objects in page for management
   * - For example: if the derived component is customer management, this method will search for all customers
   * - All subsequence search for other segment will be processed by {@link BaseComponent.loadMore | loadMore() method} 
  */
  search() {
    // Init search state
    this.nextOffset = true;
    this.objects = null;
    
    // Making search parameters
    this.params = this.initParams();
    this.searchPrams();
    
    // start search
    this.loadMore();
  }
  
  /**
  * Insert new object list into current list. Apply when scroll down page
  */
  insertObjectsToList(data) {
    if (data.length==this.params.limit) {
      this.params.offset += this.params.limit;
      this.params.limit = this.APPCONSTS.LOADMORE_COUNT;
      this.nextOffset = true;
    }
      
    if (this.objects == undefined || this.objects == null) {
      this.objects = data;
    } else {
      if(data.length > 0){
        this.objects = this.objects.concat(data);
      }
    }
  }
    
  /**
   * Load more objects when scroll down; search for next segment of objects
   **/ 
  loadMore() {
    // let url = this.app_service.Based_URLs.main + this.object_type.uri_list;
    // if (this.getlist_url)   url = this.getlist_url;
    let url = this.getListingURL();

    if (this.nextOffset) {
      this.nextOffset = false;
      this.app_service.postAPI(url, this.params, this.insertObjectsToList.bind(this));
    }
  }

  onScrollDown() {
    // console.log('scrolled down!!');
    this.loadMore();
  }

  onScrollUp() {
    // console.log('scrolled up!!');
  }  

  /**
   * Load all devices into list that this user has permission
  */
  loadDeviceListData(filter) {
    // Load device list
    let device_list_url = this.app_service.Based_URLs.main + URIS.main.device_list;
    this.app_service.postAPI(device_list_url, filter, function(res) {
      this.device_list = res;
      // console.log("return devices:", res);
    }.bind(this));
  }

  /** This method will be called for initiating data before opening creating dialog */
  initDataForCreatingObject() {}

  /** This method will be called for initiating data before opening creating dialog */
  initDataForUpdatingObject() {}

  /** Open dialog for creating object */
  openDialogForCreating() {
    this.object = this.object_type.newObject(this.injector);
    this.initDataForCreatingObject();
    this.creating_Dialog.show();
  }

  /**
   * Creat new object, using backend API
  */
  createObject() {
    this.object.create()?.then( function(res) {
      if ([ 400, 401, 403, 500].indexOf(res.status) == -1 && res.ok !== false) {
        // console.log("new object is: ", res);
        this.objects.unshift(res);
        this.creating_Dialog.hide();
      }
    }.bind(this));
  }

  /** Open dialog for updating object */
  openDialogForUpdating(object) {
    this.updating_object = object;
    this.object = this.object_type.newObject(this.injector, object);
    this.initDataForUpdatingObject();
    this.creating_Dialog.show();
  }

  /**
   * Update object, using backend API
  */
  updateObject() {
    this.object.update()?.then( function(res) {
      // console.log("update object result: ", res);
      // Update back to list
      Object.keys(res).forEach((key) => {
        this.updating_object[key] = res[key];
      });
      this.creating_Dialog.hide();
    }.bind(this));
  }

}


export {  TablePageComponent };
