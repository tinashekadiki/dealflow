import {Component, OnInit} from '@angular/core';
import {NotificationsService} from '../../../services/notifications/notifications.service';
import {environment} from '../../../../../environments/environment';
import {MatDialogRef} from '@angular/material/dialog';
import {SnackBarNotificationService} from '../../../services/snack-bar-notification/snack-bar-notification.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notificationsList: any[];
  isLoading = true;
  page: number;
  size: number;

  constructor(private notificationsService: NotificationsService,
              private snackbar: SnackBarNotificationService, public dialModalRef: MatDialogRef<any>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.page = environment.notificationsFirstPage;
    this.size = environment.notificationsDefaultSize;
    this.retrieveNotifications();
    this.changePosition();
  }

  changePosition(): void {
    this.dialModalRef.updatePosition({top: '50px', right: '50px'});
  }

  retrieveNotifications(): void {
    this.isLoading = true;
    this.notificationsService.retrieveNotifications(this.page, this.size).then(response => {
      this.notificationsList = response.pushnotifications;
    }).catch(error => {
      this.snackbar.displayError('Failed to retrieve notifications');
    }).finally(() => {
      this.isLoading = false;
    });
  }

  readNotifications(id: number): void {
    this.isLoading = true;
    this.notificationsService.readNotification(id).then(response => {
      this.snackbar.displayMessage('Notification read');
    }).catch(error => {
      this.snackbar.displayError('Failed to mark notification as read');
    }).finally(() => {
      this.retrieveNotifications();
    });
  }

  deleteNotifications(id: number): void {
    this.isLoading = true;
    this.notificationsService.deleteNotification(id).then(response => {
      this.snackbar.displayMessage('Notification deleted');
    }).catch(error => {
      this.snackbar.displayError('Failed to delete notification.');
    }).finally(() => {
      this.retrieveNotifications();
    });
  }

  blockNotifications(notification): void {
    this.isLoading = true;
    this.notificationsService.blockNotification(notification).toPromise().then(response => {
      this.snackbar.displayMessage('Notification blocked');
    }).catch(error => {
      this.snackbar.displayError('Failed to block notification.');
    }).finally(() => {
      this.retrieveNotifications();
    });
  }


  nextPage(): void {
    this.page++;
    this.retrieveNotifications();
  }

  prevPage(): void {
    this.page--;
    this.retrieveNotifications();
  }

  readAndNavigate(notification: any): void {
    if (!notification.read){
      this.readNotifications(notification.id);
      this.router.navigateByUrl(`/customer-details/${notification.customerGlobalId}`);
    }
  }
}
