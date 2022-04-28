import {Component, OnInit} from '@angular/core';
import {NotificationsService} from '../../shared/services/notifications/notifications.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any[];
  defaultNotifications: any[];
  blockedNotifications = [];

  constructor(private notificationsService: NotificationsService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.retrieveNotificationTypes();
    this.retrieveBlockedNotifications();
  }

  retrieveBlockedNotifications(): void {
    this.notificationsService.retrieveBlockedNotifications().subscribe(data => {
        this.blockedNotifications = data.blockedNotifications;
        this.snackbar.open(`Retrieved notification settings successfully`, 'Dismiss', {
          duration: 2000
        });
      },
      error => {
        this.snackbar.open(`Failed to load notifications. Reason ${error.message.substr(0, 21)}`, 'Dismiss', {
          duration: 2000,
        });
      });
  }

  retrieveNotificationTypes(): void{
    this.notificationsService.getNotificationTypes().subscribe(data => {
      this.notifications = data.notificationTypes;
      this.notifications.sort((a,b) => {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);});
      console.log("Notifications: ", this.notifications);
    },
      error => {
        console.log(error);
      });
  }

  updateBlockStatus(notification: any, event: any): void {
    if (event.checked) {
      this.notificationsService.unBlockNotification(this.getNotificationId(notification.page)).subscribe(data => {
        this.retrieveBlockedNotifications();
      });
    } else {
      this.notificationsService.blockNotification(notification).subscribe(data => {
        this.retrieveBlockedNotifications();
      });

    }
  }

  isNotificationBlocked(page: string): boolean {
    const current = this.blockedNotifications.map(element => element.notificationTypeEntity.page);
    return current.includes(page);
  }

  getNotificationId(page: string): string {
    const element = this.blockedNotifications.find(e => e.notificationTypeEntity.page === page);
    return element.id.toString();
  }
}
