import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './login/callback/callback.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      breadcrumb: {
        label: 'Home',
      }
    },
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'profile',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    data: {
      breadcrumb: {
        label: 'Profile',
      }
    },
  },
  {
    path: 'process-config',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./process-config/process-config.module').then(m => m.ProcessConfigModule),
    data: {
      breadcrumb: {
        label: 'Process Configuration',
      }
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }
