import { NgModule } from  '@angular/core';
import { SharedModule } from '@app/_bases/shared.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ModuleRouting } from './module.routing';
import {ModuleComponent} from '@app/pages/module/module.component';

@NgModule({
  imports: [
    SharedModule,
    ModuleRouting,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [ ModuleComponent ]
})
export class ModuleModule { }

