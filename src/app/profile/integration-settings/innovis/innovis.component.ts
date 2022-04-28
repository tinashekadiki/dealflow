import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {environment} from '../../../../environments/environment';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-innovis',
  templateUrl: './innovis.component.html',
  styleUrls: ['./innovis.component.scss']
})
export class InnovisComponent implements OnInit {

  innovisForm: FormGroup;
  innovisSettings: any;

  constructor(private profileService: ProfileService, private snackBar: SnackBarNotificationService,
              private formBuilder: FormBuilder,
              private xmlJson: XmlJsonProcessorService) {
    this.innovisForm = this.formBuilder.group({
      softwareProviderId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      customerId2: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      uatAccessCode: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.updateVAutoSolutions();
  }

  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultInnovisCode).then(res => {
      this.snackBar.displayMessage(`${environment.defaultInnovisCode} Settings updated successfully`);
    }).catch(err => {
      this.snackBar.displayError(`Failed to save ${environment.defaultInnovisCode} settings ${err.message}`);
    });
  }

  updateVAutoSolutions(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultInnovisCode).then(res => {
      this.innovisSettings = this.xmlJson.xmlToJson(res?.settingsToken);
      this.innovisForm.patchValue({
        ...this.innovisSettings.settings
      });
    });
  }

}
