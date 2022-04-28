import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import moment from 'moment';
import { CustomerDisclosures } from 'src/app/shared/models/customer-disclosures/customer-disclosures';

@Component({
  selector: 'app-credit-compliance-dialog',
  templateUrl: './credit-compliance-dialog.component.html',
  styleUrls: ['../shared.component.scss', './credit-compliance-dialog.component.scss']
})
export class CreditComplianceDialogComponent implements OnInit {
  dataSource: any[];
  processDetails: any;
  displayedColumns: string[] = ['position', 'name', 'date', 'time', 'view'];

  constructor(private dialogRef: MatDialogRef<CreditComplianceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.processDetails = this.data.procDetail;
    this.generateDataSource();
    console.log(this.data);
    this.data.procDetail.forEach((compliance) => {
      compliance = this.displayOptions(compliance);
    });
  }

  displayOptions(compliance: any): CustomerDisclosures {
    console.log('Attempting to set the display', compliance);
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    const disclosures = this.data.disclosures;
    if (disclosures.includes(compliance.consents?.disclosureName)) {
      data = { colorClass: 'success', icon: 'check_circle' };
    }
    compliance.display = data;
    console.log('Disclosure: ', compliance);
    return compliance;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private generateDataSource(): void {
    if (this.data.procName === 'Application Disclosures'){
      this.dataSource = [
        {
          position: 1, name: 'Joint Credit Application Disclosure',
          date: this.extractDate(this.processDetails['Joint Credit Application Disclosure']?.response?.historyDate),
          view: this.viewIcon(this.processDetails['Joint Credit Application Disclosure']?.response?.historyDate)
        },
        {
          position: 2, name: 'California Privacy Act Disclosure',
          date: this.extractDate(this.processDetails['California Privacy Act Disclosure']?.response?.historyDate),
          view: this.viewIcon(this.processDetails['California Privacy Act Disclosure']?.response?.historyDate)
        },
        {
          position: 3, name: 'Electronic Record Disclosure',
          date: this.extractDate(this.processDetails['California Privacy Act Disclosure']?.response?.historyDate),
          view: this.viewIcon(this.processDetails['California Privacy Act Disclosure']?.response?.historyDate)
        },
        {
          position: 4, name: 'Credit Inquiry Disclosure',
          date: this.extractDate(this.processDetails['California Privacy Act Disclosure']?.response?.historyDate),
          view: this.viewIcon(this.processDetails['California Privacy Act Disclosure']?.response?.historyDate),
        },
        {
          position: 5, name: 'State Application Disclosure',
          date: this.extractDate(this.processDetails['California Privacy Act Disclosure']?.response?.historyDate),
          view: this.viewIcon(this.processDetails['California Privacy Act Disclosure']?.response?.historyDate),
        }
      ];
    }
    else{
      this.dataSource = [
        {
          position: 1, name: 'Data Privacy and Usage Consent',
          date: this.extractDate(this.processDetails['Data Privacy and Usage Consent']?.response?.historyDate),
          view: this.viewIcon(this.processDetails['Data Privacy and Usage Consent']?.response?.historyDate)
        },
        {
          position: 2, name: 'Driver’s License Scan Disclosure',
          date: this.extractDate(this.processDetails['Driver\'s License Scan Disclosure']?.response?.historyDate),
          view: this.viewIcon(this.processDetails['Driver\'s License Scan Disclosure']?.response?.historyDate)
        },
        ];
    }
  }

  viewIcon(dateString: string): string {
    return dateString != null ? `info` : dateString;
  }

  extractDate(dateString: string): Date {
    let d: Date = new Date(dateString);
    if (this.isValidDate(d)) {
      d = moment(dateString, 'ddd MMM DD HH:mm:ss z YYYY').toDate();
      // console.log(d.toString());
      if (d.toString() === 'Invalid Date') {
        return null;
      }
      return d;
    } else {
      return null;
    }
  }

  isValidDate(d: any): boolean {
    return d instanceof Date;
  }

  getPhoneNUmber(): string {
    const processes: any[] = Object.values(this.processDetails);
    const process: any = processes.find(x => x !== undefined);
    const dataArray = process.response.actionMessage.split(',');
    // console.log(dataArray);
    return dataArray[7]?.split(':') ?? '';
  }

  getIpAddress(): string {
    const processes: any[] = Object.values(this.processDetails);
    const process: any = processes.find(x => x !== undefined);
    const dataArray = process.response.actionMessage.split(',');
    return dataArray[3]?.split(':') ?? '';
  }

  getMacAddress(): string {
    const processes: any[] = Object.values(this.processDetails);
    const process: any = processes.find(x => x !== undefined);
    const dataArray = process.response.actionMessage.split(',');
    return dataArray[1]?.split(':')[1];
  }
}
