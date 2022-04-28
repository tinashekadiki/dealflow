import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDetailsRoutingModule } from './customer-details-routing.module';
import { CustomerDetailsComponent } from './customer-details.component';
import { OverviewComponent } from './overview/overview.component';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreditInquiryComponent } from './overview/cards/credit-inquiry/credit-inquiry.component';
import { LenderPortalComponent } from './overview/cards/lender-portal/lender-portal.component';
import { DeskingComponent } from './overview/cards/desking/desking.component';
import { PurchaseVehicleComponent } from './overview/cards/purchase-vehicle/purchase-vehicle.component';
import { TradeVehicleComponent } from './overview/cards/trade-vehicle/trade-vehicle.component';
import { DealProgressComponent } from './overview/cards/deal-progress/deal-progress.component';
import { CreditScoreValueComponent } from './overview/cards/credit-inquiry/credit-score-value/credit-score-value.component';
import { CustomerDetailComponent } from './overview/cards/customer-detail/customer-detail.component';
import { CoBorrowerComponent } from './overview/cards/co-borrower/co-borrower.component';
import { RedFlagDialogComponent } from './overview/cards/customer-detail/compliance-dialogs/red-flag-dialog/red-flag-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxMaskModule } from 'ngx-mask';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SyntheticFraudProofComponent } from './overview/cards/customer-detail/compliance-dialogs/red-flag-dialog/partials/synthetic-fraud-proof/synthetic-fraud-proof.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TransactionHistoryComponent } from './overview/cards/transaction-history/transaction-history.component';
import { CreditComplianceDialogComponent } from './overview/cards/customer-detail/compliance-dialogs/credit-compliance-dialog/credit-compliance-dialog.component';
import {FinancialApplicationComponent} from './overview/cards/financial-application/financial-application.component';
import {FinanceApplicationTabsComponent} from './overview/cards/finance-application-tabs/finance-application-tabs.component';
import { NewFinanceTabsComponent } from './overview/cards/new-finance-tabs/new-finance-tabs.component';
import { CustomerDocumentsComponent } from './overview/cards/customer-documents/customer-documents.component';
import { ApplicationDisclosureDialogComponent } from './overview/cards/customer-detail/compliance-dialogs/application-disclosure-dialog/application-disclosure-dialog.component';
import { CustomerDocumentComponent } from './overview/cards/customer-detail/customer-document/customer-document.component';
import { CustomerDocumentFolderComponent } from './overview/cards/customer-detail/customer-document-folder/customer-document-folder.component';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import { CustomerDocumentDocumentviewerComponent } from './overview/cards/customer-detail/customer-document-documentviewer/customer-document-documentviewer.component';

@NgModule({
  declarations: [
    CustomerDetailsComponent,
    OverviewComponent,
    LenderPortalComponent,
    CreditInquiryComponent,
    DeskingComponent,
    PurchaseVehicleComponent,
    TradeVehicleComponent,
    DealProgressComponent,
    CreditScoreValueComponent,
    CustomerDetailComponent,
    CoBorrowerComponent,
    RedFlagDialogComponent,
    CustomerDocumentComponent,
    SyntheticFraudProofComponent,
    TransactionHistoryComponent,
    CreditComplianceDialogComponent,
    FinancialApplicationComponent,
    FinanceApplicationTabsComponent,
    NewFinanceTabsComponent,
    CustomerDocumentsComponent,
    CustomerDocumentFolderComponent,
    ApplicationDisclosureDialogComponent,
    CustomerDocumentDocumentviewerComponent
  ],
  entryComponents: [
    RedFlagDialogComponent,
    CreditComplianceDialogComponent,
    CustomerDocumentComponent
  ],
  imports: [
    CommonModule,
    CustomerDetailsRoutingModule,
    FlexModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    NgxExtendedPdfViewerModule,
    MatTabsModule,
    MatCheckboxModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule
  ],
  exports: [
    NewFinanceTabsComponent
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerDetailsModule { }
