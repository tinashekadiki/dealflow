import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {AuthorizationService} from '../shared/services/authorization/authorization.service';
import {PreFetchService} from '../shared/services/pre-fetch/pre-fetch.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authorizationService: AuthorizationService,
              private snackBar: MatSnackBar,
              private router: Router,
              private preFetchService: PreFetchService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  error: string;

  ngOnInit(): void {
    const cur_uri = new URL(window.location.href);
    const error_description = cur_uri.searchParams.get('error_description');
    if (error_description != null) {
      this.error = error_description;
    }
  }

  redirectToSSO(): void {
    window.location.href = environment.clientssoUrl;
  }

  login(data): void {
    this.error = '';
    if (data.username === environment.extras.me && data.password === environment.extras.px) {
      this.authorizationService.setAccessToken(environment.extras.tk);
      this.authorizationService.setPermissions(environment.extras.permissions);
      this.authorizationService.getPermissionsN().subscribe((user) => {
        this.authorizationService.setActiveBranch({branchId: user.defaultBranchId, roleId: user.defaultRole});
        this.authorizationService.setUser(user);
        this.preFetchService.fetchDMSList();
        this.preFetchService.fetchCMSList();
      });
      this.router.navigate(['home']);
    } else {
      this.error = 'Failed to login. Check your credentials and try again.';
    }
  }
}
