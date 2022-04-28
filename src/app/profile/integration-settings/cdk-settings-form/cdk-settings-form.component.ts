import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {AuthorizationService} from '../../../shared/services/authorization/authorization.service';
import {environment} from '../../../../environments/environment';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-cdk-settings-form',
  templateUrl: './cdk-settings-form.component.html',
  styleUrls: ['./cdk-settings-form.component.scss']
})
export class CdkSettingsFormComponent implements OnInit {
  cdkForm: FormGroup;
  cdkSettings: any;
  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private snackBar: SnackBarNotificationService,
              private auth: AuthorizationService,
              private xmlJson: XmlJsonProcessorService) {
    this.cdkForm = this.formBuilder.group({
      branchId: this.auth.activeBranch.branchId,
      dealerid: ['', [Validators.required]],
      password: ['', [Validators.required]],
      userid: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateCDKSettings();
  }

  updateCDKSettings(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultCdkCode).then(res => {
      this.cdkSettings = this.xmlJson.xmlToJson(res?.settingsToken);
      this.cdkForm.patchValue({
        ...this.cdkSettings.settings
      });
    });
  }


  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultCdkCode).then(res => {
      this.snackBar.displayMessage(`${environment.defaultCdkCode} Settings updated successfully`);
      }).catch(err => {
      this.snackBar.displayError(`Failed to save ${environment.defaultCdkCode} settings ${err.message}`);
      });
  }
}
