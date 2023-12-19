import { SharedModule } from '@app/_bases/shared.module';
import { NgModule } from '@angular/core';

import { ReportRoutingModule } from './report-routing.module';
import { SurveyAnalysisComponent, RelationAnalysisComponent } from '.'; 
import { HMUIsModule } from '@app/_bases/ui';
import { HMReportsModule } from '@app/_bases/reports';

@NgModule({
  imports: [
    SharedModule,
    ReportRoutingModule,
    HMReportsModule,
    HMUIsModule
  ],
  declarations: [ 
    SurveyAnalysisComponent,
    RelationAnalysisComponent,
  ]
})
export class ReportModule { }