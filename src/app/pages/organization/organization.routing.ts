import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationComponent} from '@app/pages/organization/organization.component';


let routes: Routes = [
  {
    path: 'list',
    component: OrganizationComponent,
    data: {
      title_key: 'SIDEBAR.ORGANIZATION_LIST'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRouting {}

