import {Component} from '@angular/core';
import {AuthorizationService} from '../../shared/services/authorization/authorization.service';
import {PermissionsService} from '../../shared/services/permissions/permissions.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from 'src/environments/environment';
import {ApplicationUser} from '../../shared/models/authorization/authenticated_user';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent  {
  accessToken: string;
  isLoading: false;

  constructor(authorizationService: AuthorizationService,
              public permissionsService: PermissionsService,
              public router: Router, private snackBar: MatSnackBar) {
    const url = new URL(window.location.href.replace('#', '?'));

    if (url.searchParams.has('switch_branch')) {
      authorizationService.updateBranch(url.searchParams.get('switch_branch'));
      router.navigate(['/']);
      return;
    }

    authorizationService.setAccessToken(url.searchParams.get('access_token'));
    authorizationService.getPermissions().subscribe(() => {
      authorizationService.getPermissionsN().subscribe((user: ApplicationUser) => {
        authorizationService.setActiveBranch({branchId: user.defaultBranchId, roleId: user.defaultRole});
        router.navigate(['/']);
      });
        }, (err) => {
            this.isLoading = false;
            this.snackBar.open('Unable to complete login. Please try again later.', 'Dismiss', {
                duration: environment.snackBarTimeout
            });
            console.log('There was an error logging in', err);
            authorizationService.signOut();
            router.navigate(['/login']);
        });
    }
}
