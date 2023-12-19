import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChangepasswdComponent} from '@app/pages/account/changepasswd.component';
import {LoginBarCodeComponent} from '@app/pages/account/loginbarcode.component';


let routes: Routes = [
  {
    path: 'changepasswd',
    component: ChangepasswdComponent,
    data: {
      title_key: 'SIDEBAR.CHANGEPASSWORD'
    }
  },
  {
    path: 'loginbarcode',
    component: LoginBarCodeComponent,
    data: {
      title_key: 'SIDEBAR.LOGINBARCODE'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRouting {}

