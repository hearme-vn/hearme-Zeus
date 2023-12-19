import {Component, Injector, ViewChild} from '@angular/core';
import {TablePageComponent} from '@app/_bases';
import {Theme} from '@app/_models/theme.model';

/**
 * @license hearme
 * @copyright 2017-2022 https://hearme.vn
 * @author Thuc VX <thuc@hearme.vn>
 * @date 12 Sep 2022
 * @purpose for managing theme
 */
@Component({
  templateUrl: 'theme.component.html'
})
export class ThemeComponent extends TablePageComponent {
  @ViewChild('createObjectDialog') creating_Dialog;

  object_type = Theme;
  /** Structure of filtering form fields */
  filtering_form = {
    name: null,
    status: -1
  };
  type_list = [];

  constructor(
    public injector: Injector,
    ) {
    super(injector);
  }

  /** Load theme type list */
  loadTypeList() {
    this.type_list = [];
    const url = this.getMainURL(this.object_type.uri_type_list);
    this.app_service.getAPIPromise(url).then(
      function(res) {
        this.type_list = res;
      }.bind(this)
    );
  }
  /** Load supportive data */
  loadSupportiveData() {
    this.loadTypeList();
  }

  /** Set params for search data */
  searchPrams() {
    console.log('Filtering form values are: ', this.filtering_form);
    if (this.filtering_form.name) {
      this.params['name'] = this.filtering_form.name;
    } else {
      delete this.params['name'];
    }
    if (this.filtering_form.status != -1) {
      this.params['status'] = this.filtering_form.status;
    } else {
      delete this.params['status'];
    }
  }
  /** Set data when open update dialog */
  initDataForUpdatingObject() {
    this.object.data.type_key_name = null;
    this.object.data.type_names = null;
  }
}
