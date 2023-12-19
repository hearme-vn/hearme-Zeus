import { NgModule } from  '@angular/core';
import { SharedModule } from '@app/_bases/shared.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TargetRouting } from './target.routing';
import {TargetComponent} from '@app/pages/target/target.component';
import {CfgModule} from '@app/pages/cfg/cfg.module';

@NgModule({
  imports: [
    SharedModule,
    TargetRouting,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CfgModule
  ],
  declarations: [ TargetComponent ]
})
export class TargetModule { }

