import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { DashboardComponent } from '../dashboard/dashboard.component';
import { CustomerDetailsComponent } from './customer-details.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
    {
      path: ':customerId',
      component: CustomerDetailsComponent,
      data: {
        breadcrumb: {
          alias: 'customerName',
        }
      },
      children: [
        {
          path: '',
          component: OverviewComponent
        },
      ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomerDetailsRoutingModule { }
