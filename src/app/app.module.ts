import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, Inject, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApmErrorHandler, ApmService } from '@elastic/apm-rum-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { AuthorizationService } from './shared/services/authorization/authorization.service';
import { PermissionsService } from './shared/services/permissions/permissions.service';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './login/callback/callback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { RequestCreditDialogComponent } from './shared/components/dialogs/request-credit-dialog/request-credit-dialog.component';
import { AddCustomerDialogComponent } from './shared/components/dialogs/add-customer/add-customer-dialog.component';
import { SearchCustomersComponent } from './shared/components/dialogs/search-customers/search-customers.component';
import { AddPurchaseVehicleDialogComponent } from './shared/components/dialogs/add-purchase-vehicle-dialog/add-purchase-vehicle-dialog.component';
import { AddTradeVehicleDialogComponent } from './shared/components/dialogs/add-trade-vehicle-dialog/add-trade-vehicle-dialog.component';
import { GenerateFinanceApplicationDialogComponent } from './customer-details/overview/cards/generate-finance-application-dialog/generate-finance-application-dialog.component';
import { SendDigitalApplicationDialogComponent } from './shared/components/dialogs/send-digital-application-dialog/send-digital-application-dialog.component';
import { SendRecordToCrmDialogComponent } from './shared/components/dialogs/send-record-to-crm-dialog/send-record-to-crm-dialog.component';
import { SendRecordToDmsDialogComponent } from './shared/components/dialogs/send-record-to-dms-dialog/send-record-to-dms-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ConfirmActionDialogComponent } from './shared/components/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InactiveUserDialogComponent } from './shared/components/dialogs/inactive-user-dialog/inactive-user-dialog.component';
import { SearchCoboborrowerDialogComponent } from './shared/components/dialogs/search-coboborrower-dialog/search-coboborrower-dialog.component';
import { NotificationListComponent } from './shared/components/dialogs/notification-list/notification-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { CustomerDetailsModule } from './customer-details/customer-details.module';
import { MAT_DATE_LOCALE } from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallbackComponent,
    AddCustomerDialogComponent,
    SearchCustomersComponent,
    RequestCreditDialogComponent,
    AddPurchaseVehicleDialogComponent,
    AddTradeVehicleDialogComponent,
    GenerateFinanceApplicationDialogComponent,
    SendDigitalApplicationDialogComponent,
    SendRecordToCrmDialogComponent,
    SendRecordToDmsDialogComponent,
    ConfirmActionDialogComponent,
    InactiveUserDialogComponent,
    SearchCoboborrowerDialogComponent,
    NotificationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatRadioModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    HttpClientModule,
    NgxSkeletonLoaderModule.forRoot(),
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    CustomerDetailsModule
  ],
  exports: [
    MatInputModule
  ],
  entryComponents: [
    RequestCreditDialogComponent,
    AddPurchaseVehicleDialogComponent,
    AddTradeVehicleDialogComponent,
    GenerateFinanceApplicationDialogComponent,
    SendDigitalApplicationDialogComponent,
    SendRecordToCrmDialogComponent,
    SendRecordToDmsDialogComponent,
    SearchCoboborrowerDialogComponent
  ],
  providers: [
    {
      provide: ApmService,
      useClass: ApmService,
      deps: [Router]
    },
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler
    },
    AuthorizationService,
    PermissionsService,
    { provide: 'AuthorizationConfig', useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(@Inject(ApmService) service: ApmService) {
    const apm = service.init({
      serviceName: environment.elkServerName,
      serverUrl: environment.elkUrl
    });
    apm.setUserContext({
      username: environment.elkUserName,
      id: environment.elkPassword
    });
  }
}
