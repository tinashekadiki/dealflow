import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../shared/services/profile/profile.service';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {environment} from '../../../../environments/environment';
import {XmlJsonProcessorService} from '../../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-route-one',
  templateUrl: './route-one.component.html',
  styleUrls: ['./route-one.component.scss']
})
export class RouteOneComponent implements OnInit {
  routeOneForm: FormGroup;
  routeOneSettings: any;

  constructor(private profileService: ProfileService, private snackBar: SnackBarNotificationService,
              private formBuilder: FormBuilder,
              private xmlJson: XmlJsonProcessorService) {
    this.routeOneForm = this.formBuilder.group({
      logicalId: ['', [Validators.required]],
      component: ['', [Validators.required]],
      task: ['', [Validators.required]],
      referenceId: ['', [Validators.required]],
      authorizationId: ['', [Validators.required]],
      creatorNameCode: ['', [Validators.required]],
      senderNameCode: ['', [Validators.required]],
      storeNumber: ['', [Validators.required]],
      destinationNameCode: ['', [Validators.required]],
      senderID: ['', [Validators.required]],
      targetID: ['', [Validators.required]],
      messageType: ['', [Validators.required]],
      sequenceNo: ['', [Validators.required]],
      r1DealerID: ['', [Validators.required]],
      partyId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.updateVAutoSolutions();
  }

  saveSettings(data: any): void {
    this.profileService.saveIntegrationSettings(data, environment.defaultRouteOneIntCode).then(res => {
      this.snackBar.displayMessage(`${environment.defaultRouteOneIntCode} Settings updated successfully`);
    }).catch(err => {
      this.snackBar.displayError(`Failed to save ${environment.defaultRouteOneIntCode} settings ${err.message}`);
    });
  }

  updateVAutoSolutions(): void {
    this.profileService.fetchIntegrationSettings(environment.defaultRouteOneIntCode).then(res => {
      this.routeOneSettings = this.xmlJson.xmlToJson(res?.settingsToken);
      this.routeOneForm.patchValue({
        ...this.routeOneSettings.settings
      });
    });
  }

}
