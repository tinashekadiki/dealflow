import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../shared/services/authorization/authorization.service';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {environment} from '../../../../environments/environment';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-credit-settings-form',
  templateUrl: './credit-settings-form.component.html',
  styleUrls: ['./credit-settings-form.component.scss']
})
export class CreditSettingsFormComponent implements OnInit {
  creditSettingsForm: FormGroup;
  creditSettings: any;
  constructor(private formBuilder: FormBuilder,
              private auth: AuthorizationService,
              private profileService: ProfileService,
              private snackBar: SnackBarNotificationService,
              private xmlJson: XmlJsonProcessorService) {
    this.creditSettingsForm = this.formBuilder.group({
      accountid: ['', [Validators.required]],
      accountnumber: ['', [Validators.required]],
      branchId: this.auth.activeBranch.branchId,
      daystokeepcredit: ['', [Validators.required]],
      dealerid: ['', [Validators.required]],
      equifaxcodes: ['', [Validators.required]],
      experiancodes: ['', [Validators.required]],
      transunioncodes: ['', [Validators.required]],
      metadata: ''
    });
  }

  ngOnInit(): void {
    this.updateCredit();
  }


  updateCredit(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultCreditCode).then(res => {
      this.creditSettings = this.xmlJson.xmlToJson(res?.settingsToken);
      this.creditSettingsForm.patchValue({
        ...this.creditSettings.settings
      });
    });
  }

  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultCreditCode).then(res => {
        this.snackBar.displayMessage(`${environment.defaultCreditCode} Settings updated successfully`);
      }).catch(err => {
        this.snackBar.displayError(`Failed to save ${environment.defaultCreditCode} settings ${err.message}`);
      });
  }
}
