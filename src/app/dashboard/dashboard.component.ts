import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../shared/services/navigation/navigation.service';
import {MatSidenav} from '@angular/material/sidenav';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {AuthorizationService} from '../shared/services/authorization/authorization.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InactiveUserDialogComponent} from '../shared/components/dialogs/inactive-user-dialog/inactive-user-dialog.component';
import {environment} from 'src/environments/environment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  events: string[] = [];
  opened: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;
  timeoutSub: Subscription;
  timeoutWarnSub: Subscription;

  closeSidenav(): void {
    this.sidenav.close();
  }

  constructor(private navigationService: NavigationService,
              private dialog: MatDialog,
              private authorizationService: AuthorizationService,
              private router: Router,
              private idle: Idle) {
    idle.setIdle(environment.idleTimeoutSeconds);
    idle.setTimeout(environment.idleTimeoutWarningSeconds);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    let dialogRef: MatDialogRef<InactiveUserDialogComponent>;

    this.timeoutWarnSub = idle.onTimeoutWarning.subscribe(
      (countdown) => {
        if (dialogRef === undefined) {
          dialogRef = dialog.open(InactiveUserDialogComponent, {
            data: {countdown}
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result === true || result === 'timed_out') {
              dialog.closeAll();
              dialogRef = undefined;
              authorizationService.signOut();
              router.navigate(['/login']);
            } else {
              dialogRef = undefined;
            }
          });
        }
      });
    idle.watch();
  }

  ngOnInit(): void {
    this.navigationService.sideNavClickedEvent.subscribe(
      () => {
        this.sidenav.toggle();
      }
    );
  }

  ngOnDestroy(): void {
    this.timeoutWarnSub.unsubscribe();
    this.idle.stop();
  }

}

