import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { formatDate } from '@angular/common';
import moment from 'moment';
import { ComplianceService } from 'src/app/shared/services/compliance/compliance.service';
import {
  CustomerCompliance,
  Display,
} from 'src/app/shared/models/customer-compliance/customer-compliance';

@Component({
  selector: 'app-red-flag-dialog',
  templateUrl: './red-flag-dialog.component.html',
  styleUrls: ['../shared.component.scss', './red-flag-dialog.component.scss'],
})
export class RedFlagDialogComponent implements OnInit {
  customerCell: string;
  customerSsn: string;
  managers: string[] = ['Robbie Fowler', 'Daniel Murphy', 'Joe Plumber'];
  selectedManager: string;

  customerComplianceHistory: CustomerCompliance[] = [];

  isLoadingCompliance = false;

  constructor(
    private dialogRef: MatDialogRef<RedFlagDialogComponent>,
    private complianceService: ComplianceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('dialog up');
    console.log(this.data);
    this.fetchComplianceRecordHistory(
      this.data.customerGlobalId,
      this.data.flag
    );
  }

  fetchComplianceRecordHistory(customerGlobalId: string, flag: string): any {
    this.complianceService
      .fetchComplianceRecords(customerGlobalId, flag)
      .subscribe(
        (allHistory) => {
          this.customerComplianceHistory = allHistory;
          console.log(
            'Customer Compliance All History: ',
            this.customerComplianceHistory
          );
          this.customerComplianceHistory.forEach((compliance) => {
            compliance = this.displayOptions(compliance);
          });
        },
        (err) => {
          console.log('Customer Compliance History Error: ', err);
          this.isLoadingCompliance = false;
        }
      );
  }

  displayOptions(compliance: any): CustomerCompliance {
    console.log('Attempting to set the display', compliance);
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    if (compliance.resolutionRequestsModel?.page?.pageId === 'NON00') {
      console.log('Silapha');
      switch (compliance.page?.pageId) {
        case 'RFG07':
        case 'SYN07':
        case 'OFC07':
        case 'CSD07':
        case 'CIC07':
          console.log('Approved Success');
          data = { colorClass: 'success', icon: 'check_circle' };
          break;
        case 'SYN33':
        case 'RFG39':
        case 'SYN03':
        case 'RFG03':
        case 'OFC03':
        case 'CSD03':
        case 'CIC03':
          console.log('Blocked, Awaiting Resolution');
          data = { colorClass: 'danger', icon: 'warning' };
          switch (compliance.resolutionRequestsModel?.page.pageId) {
            case 'RFG88':
            case 'OVELA':
            case 'RFG08':
            case 'OVRFA':
            case 'SYN08':
            case 'OVSYA':
            case 'OFC08':
            case 'OFC09':
            case 'CSDL8':
            case 'CICL8':
              console.log('Resolution applied');
              data = { colorClass: 'pending', icon: 'check_circle' };
              break;
            case 'OVELD':
            case 'RFG09':
            case 'OVRFD':
            case 'SYN09':
            case 'OVSYD':
              console.log('Blocked, No Resolution');
              data = { colorClass: 'danger', icon: 'warning' };
              break;
          }
      }
    } else {
      switch (compliance.page?.pageId) {
        case 'SYN33':
        case 'RFG39':
        case 'SYN03':
        case 'RFG03':
        case 'OFC03':
        case 'CSD03':
        case 'CIC03':
          console.log('Blocked, Awaiting Resolution');
          data = { colorClass: 'danger', icon: 'warning' };
          switch (compliance.resolutionRequestsModel?.page.pageId) {
            case 'RFG88':
            case 'OVELA':
            case 'RFG08':
            case 'OVRFA':
            case 'SYN08':
            case 'OVSYA':
            case 'OFC08':
            case 'OFC09':
            case 'CSDL8':
            case 'CICL8':
              console.log('Resolution applied');
              data = { colorClass: 'pending', icon: 'check_circle' };
              break;
            case 'OVELD':
            case 'RFG09':
            case 'OVRFD':
            case 'SYN09':
            case 'OVSYD':
              console.log('Blocked, No Resolution');
              data = { colorClass: 'danger', icon: 'warning' };
              break;
          }
      }
    }

    /* else if (compliance.resolutionRequestsModel?.page.pageId === 'RFG07') {
      data = { colorClass: 'danger', icon: 'warning' };
    } */
    compliance.display = data;
    return compliance;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getComplianceStatus(process: string, code: string): any {
    let procStatus = this.data.mainProcesses.find(
      (proc) => proc.process.toLowerCase() === process.toLowerCase()
    );

    procStatus = procStatus.pages.find(
      (procPage) => procPage.page.toLowerCase() === code?.toLowerCase()
    );

    return {
      colorClass: procStatus?.type,
      success: procStatus?.success,
      icon: procStatus?.success ? 'check_circle' : 'error',
    };
  }

  isValidDate(d: any): boolean {
    return d instanceof Date && !isNaN(d.getTime());
  }

  parsedDate(date: string): Date {
    let d: Date = new Date(date);
    if (!this.isValidDate(d)) {
      d = moment(date, 'ddd MMM DD HH:mm:ss z YYYY').toDate();
    }
    return d;
  }

  get complianceStatus(): any {
    const curProcess = this.data.procName;
    const processIndex = this.data.mainProcesses.findIndex(
      (proc) => proc.process.toLowerCase() == curProcess.toLowerCase()
    );

    if (this.data.procDetail == null || processIndex === -1) {
      return { colorClass: '', icon: '', success: false };
    }

    const compProcesses = this.data.procDetail.response;
    const pageIndex = this.data.mainProcesses[processIndex].pages.findIndex(
      (procPage) =>
        procPage.page.toLowerCase() === compProcesses.pageId.toLowerCase()
    );
    if (pageIndex === -1) {
      return { colorClass: '', icon: '' };
    }

    const procStatus = this.data.mainProcesses[processIndex].pages[pageIndex];
    return {
      colorClass: procStatus.type,
      success: procStatus.success,
      icon: procStatus.success ? 'check_circle' : 'blocked',
    };
  }

  get historyDateGrouping(): any {
    return _.groupBy(this.data.procDetail?.history, (n) => {
      return formatDate(
        this.parsedDate(n.timeCreated),
        'y-MM-dd',
        'en-US',
        n.timezone
      );
    });
  }

  get historyDateKeys(): any {
    return Object.keys(this.historyDateGrouping);
  }


}
