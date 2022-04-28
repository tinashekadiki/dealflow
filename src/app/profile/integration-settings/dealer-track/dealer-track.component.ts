import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {environment} from '../../../../environments/environment';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-dealer-track',
  templateUrl: './dealer-track.component.html',
  styleUrls: ['./dealer-track.component.scss']
})
export class DealerTrackComponent implements OnInit {
  dealerTrack: FormGroup;
  settings: any;

  constructor(private profileService: ProfileService, private snackBar: SnackBarNotificationService,
              private formBuilder: FormBuilder,
              private xmlJson: XmlJsonProcessorService) {
    this.dealerTrack = this.formBuilder.group({
      apiKey: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.updateSettings();
  }

  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultDealerTrackIntCode).then(res => {
      this.snackBar.displayMessage(`${environment.defaultDealerTrackIntCode} Settings updated successfully`);
    }).catch(err => {
      this.snackBar.displayError(`Failed to save ${environment.defaultDealerTrackIntCode} settings ${err.message}`);
    });
  }

  updateSettings(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultDealerTrackIntCode).then(res => {
      this.settings = this.xmlJson.xmlToJson(res?.settingsToken);
      this.dealerTrack.patchValue({
        ...this.settings.settings
      });
    });
  }

}
