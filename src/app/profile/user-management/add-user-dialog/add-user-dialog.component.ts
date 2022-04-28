import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddPermissionsComponent} from '../add-permissions/add-permissions.component';
import {UserService} from '../../../shared/services/user/user.service';
import {Branch} from '../../../shared/models/profile/profiles.model';
import {AuthorizationService} from '../../../shared/services/authorization/authorization.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  userForm: FormGroup;
  roles: string[];
  branches: Branch[];
  loading = false;
  success = false;

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private userService: UserService,
              private auth: AuthorizationService) {
    this.userForm = this.fb.group({
      defaultBranchId: [''],
      defaultRole: ['', [Validators.required]],
      costCenter: ['', [Validators.required]],
      department: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      employeeId: [''],
      enabled: [true],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      organisationalId: [this.auth.activeUser.organisationalId, [Validators.required]],
      overrideperm: [''],
      phoneNumber: ['', [Validators.required]],
      region: ['', [Validators.required]],
      timeZone: ['', [Validators.required]],
      userId: [0, [Validators.required]],
      customCreateUserEmailText: ['', [Validators.required]],
      customRoles: [[]]
    });
  }

  ngOnInit(): void {
    this.roles = this.userService.rolesList;
    this.fetchBranches();
  }

  openAddPermissionsDialog(): void {
    const dialogRef = this.dialog.open(AddPermissionsComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  fetchBranches(): void {
    this.userService.getBranches().then(branches => {
        this.branches = branches;
      });
  }
}
