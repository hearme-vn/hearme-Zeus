import { NgModule } from '@angular/core';
import { SharedModule } from '@app/_bases/shared.module';
import { TreeviewModule } from '@ngx-treeview';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

import { HMCommonModule } from '@app/_bases/common'; 
import { SurveyTreeComponent } from './surveytree/surveytree_select.component';
import { SurveySelectComponent } from './survey_select/survey_select.component';
import { DeviceSelectComponent } from './device_select/device_select.component';

@NgModule({
  imports: [
    SharedModule,
    TreeviewModule.forRoot(),
    NgSelectModule,
    NgOptionHighlightModule,
    HMCommonModule
  ],
  declarations: [ SurveyTreeComponent, SurveySelectComponent, DeviceSelectComponent ],
  exports: [ 
    SurveyTreeComponent, SurveySelectComponent, DeviceSelectComponent
  ]
})
export class HMUIsModule { }
