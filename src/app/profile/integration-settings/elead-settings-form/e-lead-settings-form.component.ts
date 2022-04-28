import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthorizationService} from '../../../shared/services/authorization/authorization.service';
import {environment} from '../../../../environments/environment';
import {SnackBarHarnessFilters} from '@angular/material/snack-bar/testing';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-elead-settings-form',
  templateUrl: './e-lead-settings-form.component.html',
  styleUrls: ['./e-lead-settings-form.component.scss']
})
export class ELeadSettingsFormComponent implements OnInit {
  formGroup: FormGroup;
  eLeadSettings: any;

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private snackBar: SnackBarNotificationService,
              private auth: AuthorizationService,
              private xmlJson: XmlJsonProcessorService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      branchId: this.auth.activeBranch.branchId,
      dealerid: this.auth.activeUser.organisationalId,
      subscription: ['', [Validators.required]],
    });
    this.updateSettings();
  }

  updateSettings(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultEleadIntCode).then(res => {
      this.eLeadSettings = this.xmlJson.xmlToJson(res?.settingsToken);
      this.formGroup.patchValue({
        ...this.eLeadSettings.settings
      });
    }).catch(() => {
      this.snackBar.displayError('Failed to fetch e lead settings');
    });
  }

  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultEleadIntCode).then(res => {
        this.snackBar.displayMessage(`${environment.defaultEleadIntCode} Settings updated successfully`);
      }).catch(
      err => {
        this.snackBar.displayError(`Failed to save ${environment.defaultEleadIntCode} settings ${err.message}`);
      });
  }

}
