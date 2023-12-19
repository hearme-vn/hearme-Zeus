import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/_helpers';

// Import Containers
import { DefaultLayoutComponent, AnyoneLayoutComponent } from './containers';

import { OnboardingComponent } from './pages/dashboard';
import { P404Component } from './pages/error/404.component';
import { P500Component } from './pages/error/500.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    // All support components - implemented in page/utils folder, 
    path: 'sc',   
    loadChildren: () => import('./pages/utils/sc.module').then(m => m.SCModule),
    data: {
      title: "Welcome to hearme solution's administration tool"
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'anyone',
    component: AnyoneLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
          // title_key: 'SIDEBAR.LOGIN',
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page'
          // title_key: 'SIDEBAR.REGISTER',
        }
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title_key: 'SIDEBAR.HOME',
      permissions: []
    },
    children: [
      {
        path: 'survey',
        loadChildren: () => import('./pages/survey/survey.module').then(m => m.SurveyModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "config"]
        }
      },
      {
        path: 'cs',
        loadChildren: () => import('./pages/cs/cs.module').then(m => m.CSModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "service"]
        }
      },
      {
        path: 'onboarding',
        component: OnboardingComponent,
        data: {
          title_key: 'SIDEBAR.ONBOARDING'
        }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'report',
        loadChildren: () => import('./pages/reports/report.module').then(m => m.ReportModule),
      },
      {
        path: 'tools',
        loadChildren: () => import('./pages/utils/sc.module').then(m => m.SCModule),
      },
      {
        path: 'group',
        loadChildren: () => import('./pages/group/group.module').then(m => m.GroupModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "service"]
        }
      },
      {
        path: 'device',
        loadChildren: () => import('./pages/device/device.module').then(m => m.DeviceModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "service"]
        }
      },
      {
        path: 'collection',
        loadChildren: () => import('./pages/collection/collection.module').then(m => m.CollectionModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "config"]
        }
      },
      {
        path: 'theme',
        loadChildren: () => import('./pages/theme/theme.module').then(m => m.ThemeModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "service"]
        }
      },
      {
        path: 'target',
        loadChildren: () => import('./pages/target/target.module').then(m => m.TargetModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "service"]
        }
      },
      {
        path: 'module',
        loadChildren: () => import('./pages/module/module.module').then(m => m.ModuleModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "service"]
        }
      },
      {
        path: 'cfg',
        loadChildren: () => import('./pages/cfg/cfg.module').then(m => m.CfgModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "service"]
        }
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "service"]
        }
      },
      {
        path: 'organization',
        loadChildren: () => import('./pages/organization/organization.module').then(m => m.OrganizationModule),
        canActivate: [AuthGuard],
        data: {
          permissions: ["admin", "service"]
        }
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,  {useHash : true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  constructor() {
    }
}
