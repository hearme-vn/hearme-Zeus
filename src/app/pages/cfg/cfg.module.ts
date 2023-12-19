import { NgModule } from  '@angular/core';
import { SharedModule } from '@app/_bases/shared.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CfgRouting } from './cfg.routing';
import { DefaultLanguageComponent } from '@app/pages/cfg/default-language/default-language.component';
import { ConfigurationComponent } from '@app/pages/cfg/configuration/configuration.component';
import { CfgDeviceBgComponent } from '@app/pages/cfg/configuration/cfg-device-bg.component';
import { CfgDeviceHeaderComponent } from '@app/pages/cfg/configuration/cfg-device-header.component';
import { CfgThankPageComponent } from '@app/pages/cfg/configuration/cfg-thank-page.component';
import { CfgOtherComponent } from '@app/pages/cfg/configuration/cfg-other.component';
import { CfgHookComponent } from '@app/pages/cfg/configuration/cfg-hook.component';
import { SelectImageComponent } from '@app/_bases/ui/dialogs/select-image.component';

@NgModule({
  imports: [
    SharedModule,
    CfgRouting,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [DefaultLanguageComponent, ConfigurationComponent, CfgDeviceBgComponent, CfgDeviceHeaderComponent, CfgThankPageComponent, CfgOtherComponent, CfgHookComponent, SelectImageComponent],
  exports: [DefaultLanguageComponent, ConfigurationComponent, CfgDeviceBgComponent, CfgDeviceHeaderComponent, CfgThankPageComponent, CfgOtherComponent, CfgHookComponent, SelectImageComponent]
})
export class CfgModule { }

