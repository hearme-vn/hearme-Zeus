import {NgModule} from '@angular/core';
import {SharedModule} from '@app/_bases/shared.module';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';

import {OrganizationRouting} from './organization.routing';
import {OrganizationComponent} from '@app/pages/organization/organization.component';
import {CfgModule} from '@app/pages/cfg/cfg.module';

@NgModule({
  imports: [
    SharedModule,
    OrganizationRouting,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CfgModule
  ],
  declarations: [OrganizationComponent],
  exports: [OrganizationComponent]
})
export class OrganizationModule { }

