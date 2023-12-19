import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultLanguageComponent} from '@app/pages/cfg/default-language/default-language.component';
import {ConfigurationComponent} from '@app/pages/cfg/configuration/configuration.component';


let routes: Routes = [
  {
    path: 'default-language',
    component: DefaultLanguageComponent,
    data: {
      title_key: 'SIDEBAR.DEVICE_LANGUAGE'
    }
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
    data: {
      title_key: 'SIDEBAR.SYSTEM_CONFIGURATION'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CfgRouting {}

