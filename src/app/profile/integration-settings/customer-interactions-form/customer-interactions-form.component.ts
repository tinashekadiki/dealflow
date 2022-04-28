import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {AuthorizationService} from '../../../shared/services/authorization/authorization.service';
import {environment} from '../../../../environments/environment';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-customer-interactions-form',
  templateUrl: './customer-interactions-form.component.html',
  styleUrls: ['./customer-interactions-form.component.scss']
})
export class CustomerInteractionsFormComponent implements OnInit {
  customerInteractionSettingsForm: FormGroup;
  customerInteractionSettings: any;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService,
              private snackBar: SnackBarNotificationService,
              private auth: AuthorizationService,
              private xmlJson: XmlJsonProcessorService) {
    this.customerInteractionSettingsForm = this.formBuilder.group({
      branchId: this.auth.activeBranch.branchId,
      parentid: this.auth.activeUser.organisationalId,
      linkExpiryTime: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateCDKSettings();
  }

  updateCDKSettings(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultCustomerInteractionCode).then(res => {
      this.customerInteractionSettings = this.xmlJson.xmlToJson(res?.settingsToken);
      this.customerInteractionSettingsForm.patchValue({
        ...this.customerInteractionSettings.settings
      });
    });
  }

  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultCustomerInteractionCode).then(() => {
      this.snackBar.displayMessage(`${environment.defaultCustomerInteractionCode} Settings updated successfully`);
    }).catch(
      err => {
        this.snackBar.displayError(`Failed to save ${environment.defaultCustomerInteractionCode} settings ${err.message}`);
      });
  }
}
