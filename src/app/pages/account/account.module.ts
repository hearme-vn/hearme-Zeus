import { NgModule } from  '@angular/core';
import { SharedModule } from '@app/_bases/shared.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AccountRouting } from './account.routing';
import {ChangepasswdComponent} from '@app/pages/account/changepasswd.component';
import {LoginBarCodeComponent} from '@app/pages/account/loginbarcode.component';
import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
  imports: [
    SharedModule,
    AccountRouting,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    QRCodeModule
  ],
  declarations: [ChangepasswdComponent, LoginBarCodeComponent],
  exports: [ChangepasswdComponent, LoginBarCodeComponent]
})
export class AccountModule { }

