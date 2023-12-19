import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { OnboardingComponent } from './onboarding.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HMReportsModule } from '@app/_bases/reports';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ButtonsModule.forRoot(),
    TranslateModule,
    HMReportsModule
  ],
  declarations: [ 
    DashboardComponent, 
    OnboardingComponent
  ]
})
export class DashboardModule { }
