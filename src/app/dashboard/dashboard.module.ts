import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { ComplianceDashboardComponent } from './compliance-dashboard/compliance-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { TextFilterDialogComponent } from './home/filters/text-filter-dialog/text-filter-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectFilterDialogComponent } from './home/filters/select-filter-dialog/select-filter-dialog.component';
import { InventoryComponent } from './inventory/inventory.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { RangeFilterDialogComponent } from './home/filters/range-filter-dialog/range-filter-dialog.component';
import { RangeSelectFilterDialogComponent } from './home/filters/range-select-filter-dialog/range-select-filter-dialog.component';
import { NgIdleModule } from "@ng-idle/core";
import {MatBadgeModule} from '@angular/material/badge';
import { ArchiveSearchDialogComponent } from './home/filters/archive-search-dialog/archive-search-dialog.component';
import { NgxMaskModule } from 'ngx-mask';
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    ComplianceDashboardComponent,
    TextFilterDialogComponent,
    SelectFilterDialogComponent,
    InventoryComponent,
    RangeFilterDialogComponent,
    RangeSelectFilterDialogComponent,
    ArchiveSearchDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ChartsModule,
    MatSnackBarModule,
    MatMenuModule,
    BreadcrumbModule,
    NgIdleModule.forRoot(),
    NgxMaskModule.forRoot(),
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    TextFilterDialogComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'},
  ]
})
export class DashboardModule { }
