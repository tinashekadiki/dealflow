import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationUser} from 'src/app/shared/models/authorization/authenticated_user';
import {AuthorizationService} from 'src/app/shared/services/authorization/authorization.service';
import {ProfileService} from 'src/app/shared/services/profile/profile.service';
import {SecureStorageService} from 'src/app/shared/services/secure-storage/secure-storage.service';
import {UserService} from '../../shared/services/user/user.service';
import {SnackBarNotificationService} from '../../shared/services/snack-bar-notification/snack-bar-notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  newUserForm: FormGroup;
  loading: boolean;
  success = false;
  currentUser: ApplicationUser;
  roles: string[];

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private snackBar: SnackBarNotificationService,
              private secureStorageService: SecureStorageService,
              private authorisationService: AuthorizationService,
              private userService: UserService) {

    this.newUserForm = this.formBuilder.group({
      defaultBranchId: [''],
      defaultRole: ['', [Validators.required]],
      costCenter: ['', [Validators.required]],
      department: ['', [Validators.required]],
      emailAddress: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      employeeId: [''],
      enabled: [true],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      organisationalId: ['', [Validators.required]],
      overrideperm: [{value: false, disabled: false}],
      phoneNumber: ['', [Validators.required]],
      region: ['', [Validators.required]],
      timeZone: ['', [Validators.required]],
      userId: [{value: '', disabled: true}, [Validators.required]],
      customCreateUserEmailText: ['', [Validators.required]],
      customRoles: [[]]
    });
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(): void{
    this.currentUser = this.authorisationService.activeUser;
    this.loading = true;
    this.userService.fetchRoles().then(res => {
      this.roles = res;
      this.loading = false;
    });
    this.newUserForm.patchValue({
      defaultRole: this.currentUser.defaultRole,
      costCenter: this.currentUser.costCenter,
      department: this.currentUser.department,
      emailAddress: this.currentUser.emailAddress,
      employeeId: this.currentUser.employeeId,
      firstName: this.currentUser.firstName,
      defaultBranchId: this.currentUser.defaultBranchId,
      lastName: this.currentUser.lastName,
      organisationalId: this.currentUser.organisationalId,
      overrideperm: this.currentUser.overrideperm,
      phoneNumber: this.currentUser.phoneNumber,
      region: this.currentUser.region,
      timeZone: this.currentUser.timeZone,
      userId: this.currentUser.userId,
      customCreateUserEmailText: this.currentUser.customCreateUserEmailText,
      customRoles: this.currentUser.customRoles
    });
  }

  handleNewUserForm(user: ApplicationUser): void {
    this.loading = true;
    user.userId = this.currentUser.userId;
    user.emailAddress = this.currentUser.emailAddress;
    this.profileService.updateUserDMS(user).subscribe(data => {
        this.snackBar.displayMessage(data.toString());
        this.authorisationService.getPermissionsN().toPromise().then(res => {
          this.currentUser = res;
        });
      },
      error => {
        this.snackBar.displayError(`Failed to update. Reason ${error.error.error}`);
      },
      () => {
        this.loading = false;
      });
  }
}
