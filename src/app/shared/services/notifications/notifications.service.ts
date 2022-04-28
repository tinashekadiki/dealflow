import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {AuthorizationService} from '../authorization/authorization.service';
import {where} from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  readonly notificationsUrl = environment.notificationsList;
  readonly unblockUrl = environment.unblockNotification;
  readonly readBlockedNotifications = environment.blockedNotifications;
  readonly notificationsFirstPage = environment.notificationsFirstPage;
  readonly notificationsDefaultSize = environment.notificationsDefaultSize;
  readonly notificationTypes = environment.notificationTypes;
  constructor(private http: HttpClient, private authorisationService: AuthorizationService) { }

  public retrieveNotifications(page = this.notificationsFirstPage, size = this.notificationsDefaultSize): Promise<any>{
    return this.http.get(`${this.notificationsUrl}?page=${page}&size=${size}`).toPromise().then(data => {
      return data;
    });
  }

  public retrieveAllNotifications(): Promise<any>{
    return this.http.get<any>(this.notificationsUrl).toPromise().then(response => {
      response.numberOfNotifications = this.countUnreadNotifications(response.pushnotifications);
      response.pushnotifications = response.pushnotifications.slice(0, environment.notificationsDefaultSize);
      return response;
    });
  }

  public countUnreadNotifications(pushNotifications: any): string{
    const unread = where(pushNotifications, {read: false});
    const numberOfNotifications = unread.length;
    return (numberOfNotifications < 100 && numberOfNotifications >= 0) ? numberOfNotifications.toString() : '99+';
  }

  public retrieveBlockedNotifications(): Observable<any>{
    return this.http.get(`${this.readBlockedNotifications}`);
  }

  public unblockNotification(id: number): Observable<any>{
    return this.http.get(`${this.unblockUrl}${id}`);
  }

  public deleteNotification(id: number): Promise<any>{
    return this.http.delete(`${environment.deleteNotification}${id}`).toPromise();
  }

  public readNotification(id: number): Promise<any>{
    return this.http.put(`${environment.readNotification}${id}`, {}).toPromise();
  }

  public blockNotification(data: any): Observable<any>{
    return this.http.post(`${environment.blockNotification}`, {
      page: data.page,
      emailAddress: this.authorisationService.activeUser.emailAddress
    });
  }

  public unBlockNotification(id: string): Observable<any>{
    return this.http.get(`${this.unblockUrl}${id}`);
  }

  public getNotificationTypes(): Observable<any>{
    return this.http.get(`${this.notificationTypes}`);
  }
}
