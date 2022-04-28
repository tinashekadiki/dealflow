import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../services/authorization/authorization.service';
import {NavigationService} from '../../services/navigation/navigation.service';
import {ApplicationUser, CustomRole} from '../../models/authorization/authenticated_user';
import {NotificationsService} from '../../services/notifications/notifications.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {NotificationListComponent} from '../dialogs/notification-list/notification-list.component';
import {Branch} from '../../models/profile/profiles.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  defaultNotifications = [];
  unreadNotifications: number;

  constructor(private navigationService: NavigationService,
              private notificationsService: NotificationsService,
              public authorizationService: AuthorizationService,
              private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!this.authorizationService.isLoadingBranchList && this.authorizationService.userBranchList === undefined) {
      this.authorizationService.getFullBranchList();
    }
    this.retrieveNotifications();
  }

  get activeBranch(): Branch {
    if (this.authorizationService.userBranchList === undefined) {
      return undefined;
    }
    return this.authorizationService.userBranchList?.find((branch: any) => {
      return branch?.branchId === this.authorizationService.activeBranch?.branchId;
    });
  }

  get applicationUser(): ApplicationUser {
    return this.authorizationService.activeUser;
  }

  get activeRoleDetails(): CustomRole {
    return this.authorizationService.activeBranch;
  }


  sideNavClicked(): void {
    this.navigationService.sideNavClicked('opened');
  }

  logout(): void {
    this.authorizationService.signOut();
    this.router.navigate(['login']);
  }

  retrieveNotifications(): void {
    this.notificationsService.retrieveAllNotifications().then(data => {
        this.defaultNotifications = data?.pushnotifications;
        this.unreadNotifications = data.numberOfNotifications;
      }).catch(error => {
        this.snackbar.open(`Failed to retrieve notifications. Reason ${error.message.substr(0, 21)}`, 'Dismiss', {
          duration: 2000,
        });
      }
    );
  }

  openNotificationsList(): void {
    const dialog = this.dialog.open(NotificationListComponent, {
      width: '450px'
    });
    dialog.afterClosed().toPromise().then(() => {
      this.retrieveNotifications();
    });
  }
}
