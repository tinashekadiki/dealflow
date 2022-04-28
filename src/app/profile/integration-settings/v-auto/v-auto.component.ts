import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-v-auto',
  templateUrl: './v-auto.component.html',
  styleUrls: ['./v-auto.component.scss']
})
export class VAutoComponent implements OnInit {
  vAutoForm: FormGroup;
  vAutoSettings: any;

  constructor(private profileService: ProfileService, private snackBar: SnackBarNotificationService,
              private formBuilder: FormBuilder,
              private xmlJson: XmlJsonProcessorService) {
    this.vAutoForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      entityId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.updateVAutoSolutions();
  }

  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultVAutoCode).then(res => {
      this.snackBar.displayMessage(`${environment.defaultVAutoCode} Settings updated successfully`);
    }).catch(err => {
      this.snackBar.displayError(`Failed to save ${environment.defaultVAutoCode} settings ${err.message}`);
    });
  }

  updateVAutoSolutions(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultVAutoCode).then(res => {
      this.vAutoSettings = this.xmlJson.xmlToJson(res?.settingsToken);
      this.vAutoForm.patchValue({
        ...this.vAutoSettings.settings
      });
    });
  }
}
