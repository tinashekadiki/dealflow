import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../shared/services/authorization/authorization.service';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {environment} from '../../../../environments/environment';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-inventory-settings-form',
  templateUrl: './inventory-settings-form.component.html',
  styleUrls: ['./inventory-settings-form.component.scss']
})
export class InventorySettingsFormComponent implements OnInit {
  formGroup: FormGroup;
  inventorySettings: any;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthorizationService,
              private profileService: ProfileService,
              private snackBar: SnackBarNotificationService,
              private xmlJson: XmlJsonProcessorService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      branchId: this.auth.activeBranch.branchId,
      dealerid: ['', [Validators.required]],
      parentid: this.auth.activeUser.organisationalId,
      timeToUpdateInventory: ['', [Validators.required]],
      deltaDate: ['', [Validators.required]],
      paramInvCompany: ['', [Validators.required]],
      queryId: ['', [Validators.required]],
      thirdPartyName: ['', [Validators.required]],
    });
    this.updateInventorySettings();
  }

  updateInventorySettings(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultInventoryCode).then(res => {
      this.inventorySettings = this.xmlJson.xmlToJson(res?.settingsToken);
      this.formGroup.patchValue({
        ...this.inventorySettings.settings
      });
    });
  }

  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultInventoryCode).then(res => {
        this.snackBar.displayMessage(`${environment.defaultInventoryCode} Settings updated successfully`);
      }).catch(err => {
        this.snackBar.displayError(`Failed to save ${environment.defaultInventoryCode} settings ${err.message}`);
      });
  }
}
