import {Component, Injector, ViewChild} from '@angular/core';
import {TablePageComponent} from '@app/_bases';
import {Utils} from '@app/_services';
import {Tabs} from '@app/_models/tabs.model';
import {Device, Group, Label} from '@app/_models';

/**
 * @license hearme
 * @copyright 2017-2022 https://hearme.vn
 * @author Thuc VX <thuc@hearme.vn>
 * @date 12 Sep 2022
 * @purpose for managing theme
 */
@Component({
  templateUrl: 'module.component.html',
  styleUrls: ['module.component.css']
})
export class ModuleComponent extends TablePageComponent {
  @ViewChild('createObjectDialog') creating_Dialog;

  object_type = Tabs;

  /** Structure of filtering form fields */
  filtering_form = {
    group_id: '',
    device_id: ''
  };

  /** Selected language for add/edit image */
  current_lang_code = null;
  selected_lang = null;

  objectFB: any = this.object_type.newObject(this.injector);
  objectCOL: any = this.object_type.newObject(this.injector);

  constructor(
    public injector: Injector,
    ) {
    super(injector);
  }

  /**
   * Change language for image
   **/
  changeFactorLanguage() {
    this.selected_lang = Utils.getLangByLangcode(this.device_langs, this.current_lang_code);
  }

  /** Load supportive data */
  loadSupportiveData() {
    // Get device language configuration, in order to input survey question in suported languages
    this.getDeviceLanguages(function(device_default_language, device_langs) {
        this.current_lang_code = device_default_language.code;
        this.selected_lang = Utils.getLangByLangcode(this.device_langs, this.current_lang_code);
      }.bind(this)
    );
    this.getGrouplist();
  }

  /**
   * Load more objects when scroll down; search for next segment of objects
   **/
  loadMore() {
    let url = this.getListingURL();

    if (this.nextOffset) {
      this.nextOffset = false;
      this.app_service.getAPIPromise(url, this.params).then(function(data) {
        this.insertObjectsToList(data);
      }.bind(this));
    }
  }

  /** load initial labels */
  loadInitialLabels(data) {
    data.lang_texts = [];
    data.lang_text_links = Label.createLabelListForUI(data.lang_texts);
    Label.loadInitialLabels(this, this.object_type.tableLang, this.object_type.columnLang, data.id, function(res) {
      data.lang_texts = res;
      data.lang_text_links = Label.createLabelListForUI(data.lang_texts);
    }.bind(this));
  }

  /**
   * Insert new object list into current list. Apply when scroll down page
   */
  insertObjectsToList(data) {
    super.insertObjectsToList(data);
    if (this.objects.length == 0) {
      this.objectFB = this.object_type.newObject(this.injector);
      this.objectCOL = this.object_type.newObject(this.injector);
      this.objectCOL.data.col_check = false;
      this.loadInitialLabels(this.objectFB.data);
      this.loadInitialLabels(this.objectCOL.data);
    } else {
      for (let obj of this.objects) {
        if (obj.function == 0) {// feedback
          this.objectFB = this.object_type.newObject(this.injector, obj);
          this.loadInitialLabels(this.objectFB.data);
        } else if (obj.function == 1) {// collection media
          this.objectCOL = this.object_type.newObject(this.injector, obj);
          this.objectCOL.data.col_check = this.objectCOL.data.status == 0 ? true : false;
          this.loadInitialLabels(this.objectCOL.data);
        }
      }
    }
  }

  /** Set params for search data */
  searchPrams() {
    console.log('Filtering form values are: ', this.filtering_form);
    if (this.filtering_form.device_id == '') {
      if (this.filtering_form.group_id) {
        this.params['id'] = this.filtering_form.group_id;
      } else {
        this.params['id'] = 'null';
      }
    } else {
      this.params['id'] = this.filtering_form.device_id;
    }
  }

  /** reload objects after change group or device */
  changeGroup() {
    this.filtering_form.device_id = '';
    this.getDevicelist(this.filtering_form.group_id);
    this.search();
  }
  changeDevice() {
    this.search();
  }

  /** Save data */
  proccess() {
    var obj = null;
    if (this.device_list.length > 0) {
      if (this.filtering_form.device_id == '') {
        obj = this.filtering_form.group_id;
      } else {
        obj = this.filtering_form.device_id;
      }
    } else if (this.group_list.length > 0) {
      if (this.filtering_form.group_id != '') {
        obj = this.filtering_form.group_id;
      }
    }

    if (!this.objectFB.data.id) {
      this.objectFB.data.function = 0;
      this.objectFB.data.object_id = obj;
      this.objectFB.create();
    } else {
      this.objectFB.update();
    }

    this.objectCOL.data.status = this.objectCOL.data.col_check ? 0 : 1;
    if (!this.objectCOL.data.id) {
      this.objectCOL.data.function = 1;
      this.objectCOL.data.object_id = obj;
      this.objectCOL.create();
    } else {
      this.objectCOL.update();
    }
  }
}
