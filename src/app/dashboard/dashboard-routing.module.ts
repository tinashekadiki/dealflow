import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplianceDashboardComponent } from './compliance-dashboard/compliance-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          breadcrumb: {
            skip: true,
          }
        },
      },
      {
        path: 'customer-details',
        loadChildren: () => import('../customer-details/customer-details.module').then(m => m.CustomerDetailsModule),
        data: {
          breadcrumb: {
            skip: true,
          }
        },
      },
      {
        path: 'compliance-dashboard',
        component: ComplianceDashboardComponent,
        data: {
          breadcrumb: {
            label: 'Compliance Dashboard',
          }
        },
      },
      {
        path: 'inventory-list',
        component: InventoryComponent,
        data: {
          breadcrumb: {
            label: 'Vehicle Inventory',
          }
        },
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardRoutingModule { }
