import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {SettingsComponent} from './account-settings/settings.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {DealerSettingsComponent} from './dealer-settings/dealer-settings.component';
import {UsersComponent} from './user-management/users.component';
import {ProductsComponent} from './products-settings/products.component';
import {NotificationsComponent} from './notification-settings/notifications.component';
import {IntegrationsComponent} from './integration-settings/integrations.component';
import {PermissionsMatrixComponent} from './permissions-matrix/permissions-matrix.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'settings',
            pathMatch: 'full'
          },
          {
            path: 'settings',
            component: SettingsComponent,
            data: {
              breadcrumb: {
                label: 'Account Settings',
              }
            },
          },
          {
            path: 'dealer',
            component: DealerSettingsComponent,
            data: {
              breadcrumb: {
                label: 'Dealer Settings',
              }
            },
          },
          {
            path: 'users',
            component: UsersComponent,
            data: {
              breadcrumb: {
                label: 'User Management',
              }
            },
          },
          {
            path: 'products',
            component: ProductsComponent,
            data: {
              breadcrumb: {
                label: 'Products',
              }
            },
          },
          {
            path: 'notifications',
            component: NotificationsComponent,
            data: {
              breadcrumb: {
                label: 'Notifications',
              }
            },
          },
          {
            path: 'integration-settings',
            component: IntegrationsComponent,
            data: {
              breadcrumb: {
                label: 'Integrations',
              }
            },
          },
          {
            path: 'permissions',
            component: PermissionsMatrixComponent,
            data: {
              breadcrumb: {
                label: 'Permissions Matrix',
              }
            },
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
