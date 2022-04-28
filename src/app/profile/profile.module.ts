import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './account-settings/settings.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DealerSettingsComponent } from './dealer-settings/dealer-settings.component';
import { UsersComponent } from './user-management/users.component';
import { ProductsComponent } from './products-settings/products.component';
import { NotificationsComponent } from './notification-settings/notifications.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from './user-management/add-user-dialog/add-user-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { BulkUploadUsersComponent } from './user-management/bulk-upload-users/bulk-upload-users.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddPermissionsComponent } from './user-management/add-permissions/add-permissions.component';
import { IntegrationsComponent } from './integration-settings/integrations.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PermissionsMatrixComponent } from './permissions-matrix/permissions-matrix.component';
import { AddRoleComponent } from './permissions-matrix/add-role/add-role.component';
import { DeleteRoleComponent } from './permissions-matrix/delete-role/delete-role.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskModule } from 'ngx-mask';
import { NgIdleModule } from '@ng-idle/core';
import {MatMenuModule} from '@angular/material/menu';
import { ChangeRoleComponent } from './user-management/change-role/change-role.component';
import { CdkSettingsFormComponent } from './integration-settings/cdk-settings-form/cdk-settings-form.component';
import { VinSettingsFormComponent } from './integration-settings/vin-settings-form/vin-settings-form.component';
import { CreditSettingsFormComponent } from './integration-settings/credit-settings-form/credit-settings-form.component';
import { CustomerInteractionsFormComponent } from './integration-settings/customer-interactions-form/customer-interactions-form.component';
import { InventorySettingsFormComponent } from './integration-settings/inventory-settings-form/inventory-settings-form.component';
import { ELeadSettingsFormComponent } from './integration-settings/elead-settings-form/e-lead-settings-form.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EditRoleComponent } from './permissions-matrix/edit-role/edit-role.component';
import { VAutoComponent } from './integration-settings/v-auto/v-auto.component';
import { DealerTrackComponent } from './integration-settings/dealer-track/dealer-track.component';
import { RouteOneComponent } from './integration-settings/route-one/route-one.component';
import { InnovisComponent } from './integration-settings/innovis/innovis.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DisclosuresConsentsComponent } from './disclosures-consents/disclosures-consents.component';
import { PiiConsentComponent } from './disclosures-consents/pii-consent/pii-consent.component';
import { TcpaDisclosureComponent } from './disclosures-consents/tcpa-disclosure/tcpa-disclosure.component';
import { ElectronicTransactionConsentComponent } from './disclosures-consents/electronic-transaction-consent/electronic-transaction-consent.component';
import { CreditInquiryDisclosureComponent } from './disclosures-consents/credit-inquiry-disclosure/credit-inquiry-disclosure.component';
import { StateApplicationDisclosureComponent } from './disclosures-consents/state-application-disclosure/state-application-disclosure.component';
import { CaliforniaPrivacyActDisclosureComponent } from './disclosures-consents/california-privacy-act-disclosure/california-privacy-act-disclosure.component';
import { WebsiteTermsConditionsDisclosureComponent } from './disclosures-consents/website-terms-conditions-disclosure/website-terms-conditions-disclosure.component';
import { JointCreditApplicationDisclosureComponent } from './disclosures-consents/joint-credit-application-disclosure/joint-credit-application-disclosure.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    DealerSettingsComponent,
    UsersComponent,
    ProductsComponent,
    NotificationsComponent,
    AddUserDialogComponent,
    BulkUploadUsersComponent,
    AddPermissionsComponent,
    IntegrationsComponent,
    PermissionsMatrixComponent,
    AddRoleComponent,
    DeleteRoleComponent,
    ChangeRoleComponent,
    CdkSettingsFormComponent,
    VinSettingsFormComponent,
    CreditSettingsFormComponent,
    CustomerInteractionsFormComponent,
    InventorySettingsFormComponent,
    ELeadSettingsFormComponent,
    EditRoleComponent,
    VAutoComponent,
    DealerTrackComponent,
    RouteOneComponent,
    InnovisComponent,
    DisclosuresConsentsComponent,
    PiiConsentComponent,
    TcpaDisclosureComponent,
    ElectronicTransactionConsentComponent,
    CreditInquiryDisclosureComponent,
    StateApplicationDisclosureComponent,
    CaliforniaPrivacyActDisclosureComponent,
    WebsiteTermsConditionsDisclosureComponent,
    JointCreditApplicationDisclosureComponent
    ],
  exports: [IntegrationsComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatGridListModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        FlexModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatDialogModule,
        MatRadioModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatChipsModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatExpansionModule,
        NgxMaskModule.forRoot(),
        MatProgressSpinnerModule,
        NgIdleModule.forRoot(),
        MatMenuModule,
        MatTabsModule,
        MatButtonToggleModule
    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProfileModule {
}
