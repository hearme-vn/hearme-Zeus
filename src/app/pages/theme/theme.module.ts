import { NgModule } from  '@angular/core';
import { SharedModule } from '@app/_bases/shared.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ThemeRouting } from './theme.routing';
import {ThemeComponent} from '@app/pages/theme/theme.component';

@NgModule({
  imports: [
    SharedModule,
    ThemeRouting,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [ ThemeComponent ]
})
export class ThemeModule { }

