import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from 'src/app/shared/services/profile/profile.service';
import {CustomRole} from '../../shared/models/authorization/authenticated_user';
import {SnackBarNotificationService} from '../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {XmlJsonProcessorService} from '../../shared/services/xml-json/xml-json-processor.service';

@Component({
  selector: 'app-dealer-settings',
  templateUrl: './dealer-settings.component.html',
  styleUrls: ['./dealer-settings.component.scss']
})
export class DealerSettingsComponent implements OnInit {
  imageData: any;
  imageUploadError: boolean;
  imageUploading = false;
  imageUploaded = false;
  generalSettingsForm: FormGroup;
  managerForm: FormGroup;
  sosForm: FormGroup;
  generalSettings: any;
  saving = false;
  activeBranch: CustomRole;
  managers = [];
  sos = [];

  constructor(private profileService: ProfileService,
              private snackBar: SnackBarNotificationService,
              private formBuilder: FormBuilder,
              private xmLJson: XmlJsonProcessorService) {
    this.generalSettingsForm = this.formBuilder.group({
      additionalPage: ['', Validators.required],
      daysToArchive: ['', Validators.required],
      dealerFees: ['', Validators.required],
      downPayment: ['', Validators.required],
      minimumYearsAddress: ['', Validators.required],
      minimumYearsJob: ['', Validators.required],
      ficoScoreModel: ['', Validators.required],
      disclosure: ['', Validators.required],
      privacyLink: ['', Validators.required],
    });
    this.managerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.sosForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.retrieveDealerSettings();
  }

  retrieveDealerSettings(): void {
    this.profileService.fetchGeneralSettings().then(res => {
      this.generalSettings = this.xmLJson.xmlToJson(res?.settingsToken);
      this.imageData = {
        fileDownloadUri: this.generalSettings.settings.dealerimage['#text']
      };
      console.log(this.generalSettings);
      this.managers = this.processManagers(this.generalSettings.settings.managers.manager);
      this.sos = this.processManagers(this.generalSettings.settings.sos.manager);
      // console.log(this.managers);#text
      this.generalSettingsForm.patchValue({
        additionalPage: this.generalSettings.settings.additionalPage['#text'],
        daysToArchive: this.generalSettings.settings.daysToArchive['#text'],
        dealerFees: this.generalSettings.settings.dealerFees['#text'],
        downPayment: this.generalSettings.settings.downPayment['#text'],
        minimumYearsAddress: this.generalSettings.settings.minimumYearsAddress['#text'],
        minimumYearsJob: this.generalSettings.settings.minimumYearsJob['#text'],
        ficoScoreModel: this.generalSettings.settings.ficoScoreModel['#text'],
        disclosure: this.generalSettings.settings.disclosure['#text'],
        privacyLink: this.generalSettings.settings.privacyLink['#text']
      });
      console.log(this.generalSettingsForm);
    });
  }

  processManagers(managers: any[]): any[] {
    let newManagers = managers.map(element => {
      return {
        firstName: element.firstName['#text'],
        lastName: element.lastName['#text'],
        email: element.email['#text']
      }
    });
    return newManagers;
  }

  onFileSelected(event: any): void {
    this.imageUploading = true;
    let formData: FormData;
    formData = new FormData();
    formData.append('file', event.target.files[0]);
    this.profileService.uploadImage(formData).subscribe(data => {
        console.log(data);
        this.imageUploading = false;
        this.imageUploaded = true;
        this.imageData = data;
        this.snackBar.displayMessage('Image uploaded successfully.');
      },
      error => {
        this.imageUploading = false;
        this.imageUploadError = true;
        this.snackBar.displayError('Failed to upload image.');
      });
  }

  saveSettings(data: any): void {
    this.saving = true;
    data.dealerimage = this.imageData.fileDownloadUri;
    if (this.generalSettingsForm.invalid) {
      return;
    }
    const settingsToken = this.xmLJson.plainObjectToXml(data);
    this.profileService.saveGeneralSettings(settingsToken).subscribe(res => {
      this.snackBar.displayMessage(`${res}`);
      this.saving = false;
    });
  }
}
