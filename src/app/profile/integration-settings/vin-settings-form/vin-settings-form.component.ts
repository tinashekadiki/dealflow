import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../shared/services/authorization/authorization.service';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {environment} from '../../../../environments/environment';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-vin-settings-form',
  templateUrl: './vin-settings-form.component.html',
  styleUrls: ['./vin-settings-form.component.scss']
})
export class VinSettingsFormComponent implements OnInit {
  vinSolutionsForm: FormGroup;
  vinSolutions: any;
  constructor(private formBuilder: FormBuilder,
              private auth: AuthorizationService,
              private profileService: ProfileService,
              private snackBar: SnackBarNotificationService,
              private xmlJson: XmlJsonProcessorService) {
    this.vinSolutionsForm = this.formBuilder.group({
      branchId: this.auth.activeBranch.branchId,
      dealerid: ['', [Validators.required]],
      leadsources: ['', [Validators.required]],
      userid: ['', [Validators.required]],
      leadTypeId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateVinSolutions();
  }

  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultVinSolutionsCode).then(res => {
        this.snackBar.displayMessage(`${environment.defaultVinSolutionsCode} Settings updated successfully`);
      }).catch(err => {
        this.snackBar.displayError(`Failed to save ${environment.defaultVinSolutionsCode} settings ${err.message}`);
      });
  }

  updateVinSolutions(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultVinSolutionsCode).then(res => {
      this.vinSolutions = this.xmlJson.xmlToJson(res?.settingsToken);
      this.vinSolutionsForm.patchValue({
        ...this.vinSolutions.settings
      });
    });
  }
}
