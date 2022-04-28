import { Component, OnInit, Inject, HostListener, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddProcessComponent } from './add-process/add-process.component';
import { ProcessConfigService } from '../shared/services/process-config/process-config.service';
import { ProcessStep, SingleProcess } from '../shared/models/process-config/confuguration.model';
import { SnackBarNotificationService } from '../shared/services/snack-bar-notification/snack-bar-notification.service';
import * as _ from 'underscore';
import { environment } from '../../environments/environment';
import { PreFetchService } from '../shared/services/pre-fetch/pre-fetch.service';
import { IDVerifier } from '../shared/models/aggregator/aggregator_request';
import { SelectIdVerifierDialogComponent } from './select-id-verifier-dialog/select-id-verifier-dialog.component';
import { LeaderLine } from 'leader-line';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LinkTarget } from 'ngx-extended-pdf-viewer';
declare let LeaderLine: any;

@Component({
  selector: 'app-process-config',
  templateUrl: './process-config.component.html',
  styleUrls: ['./process-config.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessConfigComponent implements OnInit {
  showFails = false;
  message = '';
  loading = false;
  currentConfigurations: any;
  processes: SingleProcess[] = [];
  salesProcesses: SingleProcess[] = [];
  configTypes: string[];
  panelOpenState = [];

  private initPointX: number;
  private initPointY: number;

  /* @HostListener('scroll') onScrollHost(e: Event): void {
    console.log(this.getYPosition(e));
  } */

  constructor(
    public dialog: MatDialog,
    private processConfigService: ProcessConfigService,
    private snackBar: SnackBarNotificationService, ele: ElementRef,
    @Inject(DOCUMENT) private document
  ) {}

  @HostListener('mousewheel', ['$event'])
    scroll(event: MouseEvent) {
        console.log("Entered mouse wheel", event);
        /* let wheelDelta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if(wheelDelta > 0) {
          factor = 0.5;
        }else {
         factor = 2.0;
        }

        this.initPointX = event.PageX;
        this.initPointY = event.PageY;   */ 
    }

  /* getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  } */

  ngOnInit(): void {
    this.initialise();
    this.configTypes = environment.defaultProcessConfigTypes;
  }

  closeAllPanels(): void {
    this.configTypes.forEach((el) => {
      this.panelOpenState[this.configTypes.indexOf(el)] = false;
    });
  }

  initialise(): void {
    this.loading = true;
    this.processConfigService
      .loadProcesses()
      .then((res) => {
        this.snackBar.displayMessage(
          'Retrieved current configuration successfully'
        );
        this.processes = res;
        this.retrieveCurrentConfig();
      })
      .catch((error) => {
        this.snackBar.displayError(error.message);
      })
      .finally(() => {
        this.closeAllPanels();
      });
    this.loadSalesProcesses();
  }

  loadSalesProcesses(): void {
    this.processConfigService
      .loadSalesProcesses()
      .then((res) => {
        this.snackBar.displayMessage('Retrieved sales processes');
        this.salesProcesses = res;
      })
      .catch((error) => {
        this.snackBar.displayError(error.message);
      });
  }

  drop(event: CdkDragDrop<string[]>, type: string): void {
    this.currentConfigurations[type].changed = true;
    moveItemInArray(
      this.currentConfigurations[type],
      event.previousIndex,
      event.currentIndex
    );
  }

  retrieveCurrentConfig(): void {
    this.processConfigService
      .getConfigurations()
      .then((res) => {
        this.currentConfigurations = res.map((element) => {
          return {
            ...element.process,
            step: element.step,
            flow: element.flow.type,
          };
        });
        this.currentConfigurations = _.groupBy(
          this.currentConfigurations,
          (configuration) => configuration.flow
        );
        console.log(this.currentConfigurations);
      })
      .catch((err) => {
        this.snackBar.displayError(err.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  openAddProcessDialog(type: string): void {
    const dialogRef = this.dialog.open(AddProcessComponent, {
      data: {
        currentConfigurations: this.currentConfigurations[type] ?? [],
        processes:
          type.toLowerCase().trim() === 'sales'
            ? this.salesProcesses
            : this.processes,
        configTypes: this.configTypes,
        type,
      },
    });
    dialogRef
      .afterClosed()
      .toPromise()
      .then(() => {
        this.snackBar.displayMessage('Click save to persist your changes');
      });
  }

  updateIdVerifierDialog(): void {
    this.dialog.open(SelectIdVerifierDialogComponent, {
      width: '450px',
    });
  }

  saveConfiguration(type: string): void {
    const newConfig: ProcessStep[] = this.currentConfigurations[type].map(
      (config) => {
        return {
          processId: config.processId,
          step: this.currentConfigurations[type].indexOf(config) + 1,
        };
      }
    );
    this.processConfigService
      .saveConfigurations(newConfig, type.split('_').join(''))
      .then((res) => {
        this.initialise();
        this.snackBar.displayMessage(res);
      })
      .catch((error) => {
        this.snackBar.displayError(error.message);
      });
  }

  initialiseType(type: string): string {
    this.currentConfigurations[type] = this.currentConfigurations[type] ?? [];
    return this.processConfigService.mapToHumanReadableTypes(type);
  }

  deleteConfiguration(type: string): void {
    this.processConfigService
      .deleteConfigurations(type)
      .then((res) => {
        this.initialise();
        this.snackBar.displayMessage(res);
      })
      .catch((error) => {
        this.snackBar.displayError(error.message);
      });
  }

  drawLines(id: number): void {
    // this.removeLines();
    this.removeAllLines();

    /* this.panelOpenState[id] = true;

    let p = 'panel_' + id;

    let panel = this.document.getElementById(p);

    let q = '#cdk-drop-list-' + id;

    const nodes = panel.querySelectorAll(
      q + ' > div.process-box:not(:last-child)'
    );

    console.log(nodes);

    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];

      let start = node;
      console.log('Start: ', start);
      let end = node.nextElementSibling;
      console.log('End: ', end);

      const line = new LeaderLine(start, end, {
        path: 'grid',
        startSocket: 'right',
        endSocket: 'left',
        endPlug: 'arrow3',
        startSocketGravity: 20,
        color: 'rgba(0, 0, 0, 0.5)',
        size: 2,
      });
    }

    let _svgs = [];

    _svgs = this.document.querySelectorAll('.leader-line');

    // this.document.querySelector('.container').appendChild(this.document.querySelectorAll('.leader-line'));

    let x = nodes.length;

    for (let index = 0; index < x; index++) {
      const _svg = _svgs[index];
      _svg.style.zIndex = '1';
      // _svg.style.position = 'fixed';
    } */
  }

  removeLines(id: number): void {
    this.removeAllLines();
    if (id) {
      this.panelOpenState[id] = false;
    }
  }

  removeAllLines () {
    console.log("Removing all lines");

    const _svgs = this.document.querySelectorAll('svg');

    for (let index = 0; index < _svgs.length; index++) {
      const _svg = _svgs[index];
      _svg.remove();
    }

  }

  onWindowScroll(event: any): void {}
}
