import {formatDate} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {BranchZones} from 'src/app/shared/models/dealer-zones/branch_zones';
import {AuthorizationService} from 'src/app/shared/services/authorization/authorization.service';
import {ComplianceService} from 'src/app/shared/services/compliance/compliance.service';
import {environment} from 'src/environments/environment';
import moment from 'moment';

import {
  ComplianceStatistic, Customer
} from '../../shared/models/compliance/compliance_history_paginated';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-compliance-dashboard',
  templateUrl: './compliance-dashboard.component.html',
  styleUrls: ['./compliance-dashboard.component.scss']
})

export class ComplianceDashboardComponent implements OnInit {
  complianceDashboardMetrics: ComplianceStatistic[];
  complianceDashboardTableData: any[] = [];
  idVerificationData: ComplianceStatistic;
  ofacData: ComplianceStatistic;
  expiredLicenseData: ComplianceStatistic;
  syntheticFraudData: ComplianceStatistic;
  mlaData: ComplianceStatistic;
  customerList: Customer[];

  displayedColumns = ['position', 'firstname', 'lastname', 'date', 'ssn', 'alert', 'alert_type'];

  activeLabel: string;
  activeIndex: number;
  activeChart: string;

  startDate: Date;
  endDate: Date;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  isLoading = true;
  page = 0;
  pageSize = 25;
  totalElements = 0;

  filterCriteria: any = {
    page: 0,
    size: 10,
    date1: '2001-01-01'
  };

  public get allowedDealerships(): any {
    return this.authorizationService.userBranchList;
  }

  selectedDealerships: string[] = [];

  public regionData: BranchZones;

  serviceMap = {
    IdVerification: {read: 'Identity Verification', constant: 'IdVerification'},
    Ofac: {read: 'OFAC', constant: 'Ofac'},
    ExpiredLicense: {read: 'Expired License', constant: 'ExpiredLicense'},
    Mla: {read: 'MLA', constant: 'Mla'},
    SyntheticFraud: {read: 'Synthetic Fraud', constant: 'SyntheticFraud'}
  };

  public chartType = 'pie';

  public chartDatasetLists = {
    red_flag: [
      {data: [0, 0, 0, 100], label: this.serviceMap.IdVerification.read}
    ],
    ofac: [
      {data: [0, 0, 0, 100], label: this.serviceMap.Ofac.read}
    ],
    fraud: [
      {data: [0, 0, 0, 100], label: this.serviceMap.SyntheticFraud.read}
    ],
    mla: [
      {data: [0, 0, 0, 100], label: this.serviceMap.Mla.read}
    ],
    expired_license: [
      {data: [0, 0, 0, 100], label: this.serviceMap.ExpiredLicense.read}
    ],
  };

  public chartLabels: Label[] = ['Alerts Unresolved', 'Passed', 'Pending', 'No Data'];

  chartColorList: any = {
    red_flag: [
      {
        backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
        hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
        borderWidth: 2,
      }
    ],
    ofac: [
      {
        backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
        hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
        borderWidth: 2,
      }
    ],
    fraud: [
      {
        backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
        hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
        borderWidth: 2,
      }
    ],
    mla: [
      {
        backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
        hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
        borderWidth: 2,
      }
    ],
    expired_license: [
      {
        backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
        hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
        borderWidth: 2,
      }
    ]
  };

  public defaultColors = ['#B11E2B', '#007987', '#FDB45C', '#378805', '#ccc'];
  public blockWholeChart = ['#ccc', '#ccc', '#ccc', '#ccc'];

  public chartOptions: ChartOptions = {
    responsive: true
  };

  constructor(private complianceService: ComplianceService, private snackBar: MatSnackBar,
              private authorizationService: AuthorizationService) {
  }

  ngOnInit(): void {
    this.selectedDealerships = [this.authorizationService.getActiveBranch?.branchId];
    this.getComplianceDashboard();
  }

  onSelectionChange(item: any): void {
    console.log(item.value);
    this.clearResetChart();
    this.resetPage();
    this.getComplianceDashboard();
  }

  extractDate(dateString: string): Date {
    let d: Date;
    d = moment(dateString).toDate();
    if (d.toString() === 'Invalid Date') {
      return null;
    }
    return d;
  }

  updatedDate(field: string, event: MatDatepickerInputEvent<Date>): any {
    this.filterCriteria[field] = formatDate(event.value, 'yyyy-MM-dd', 'en-US');
    if (this.filterCriteria.hasOwnProperty('date1') && this.filterCriteria.hasOwnProperty('date2')) {
      const date2 = new Date(this.filterCriteria.date2);

      if (date2 > new Date('2001-01-01')) {
        if (new Date(this.filterCriteria.date1) > date2) {
          this.endDate = null;
          return delete this.filterCriteria.date2;
        }
        this.clearResetChart();
        this.resetPage();
        this.getComplianceDashboard();
      }
    }
  }

  updateFilters(): void {
    delete this.filterCriteria.service;
    delete this.filterCriteria.result;
    console.log(this.selectedDealerships);
    // this.filterCriteria.branchid = this.selectedDealerships.map((branchid) => branchid).join(',');
    this.filterCriteria.page = this.page;
    this.filterCriteria.size = this.pageSize;

    if (this.activeChart !== undefined && this.activeLabel !== undefined) {
      this.filterCriteria.service = this.serviceMap[this.activeChart];
      this.filterCriteria.result = ((this.activeLabel === 'Passed'));
    }
  }

  getComplianceDashboard(): any {
    this.isLoading = true;
    this.complianceDashboardMetrics = undefined;
    this.updateFilters();
    this.complianceService.getComplianceDashboardMetrics(this.filterCriteria, this.selectedDealerships).subscribe((compRep) => {
      this.complianceDashboardMetrics = compRep;
      console.log(compRep);
      this.isLoading = false;
      this.idVerificationData = this.complianceDashboardMetrics.find(
        (complianceStat) => complianceStat.recordType === this.serviceMap.IdVerification.constant);

      this.ofacData = this.complianceDashboardMetrics.find(
        (complianceStat) => complianceStat.recordType === this.serviceMap.Ofac.constant
      );

      this.expiredLicenseData = this.complianceDashboardMetrics.find(
        (complianceStat) => complianceStat.recordType === this.serviceMap.ExpiredLicense.constant
      );

      this.syntheticFraudData = this.complianceDashboardMetrics.find(
        (complianceStat) => complianceStat.recordType === this.serviceMap.SyntheticFraud.constant
      );

      this.mlaData = this.complianceDashboardMetrics.find(
        (complianceStat) => complianceStat.recordType === this.serviceMap.Mla.constant
      );
      console.log(this.mlaData);

      this.isLoading = false;
      this.chartDatasetLists.red_flag[0].data = [this.idVerificationData.bad,
        this.idVerificationData.good,
        this.idVerificationData.pending + this.idVerificationData.missingInfo, (this.idVerificationData.customerCount > 0 ? 0 : 100)];

      this.chartDatasetLists.ofac[0].data = [this.ofacData.bad,
        this.ofacData.good, this.ofacData.pending + this.ofacData.missingInfo, (this.ofacData.customerCount > 0 ? 0 : 100)];

      this.chartDatasetLists.expired_license[0].data = [this.expiredLicenseData.bad,
        this.expiredLicenseData.good,
        this.expiredLicenseData.pending + this.expiredLicenseData.missingInfo, (this.expiredLicenseData.customerCount > 0 ? 0 : 100)];

      this.chartDatasetLists.fraud[0].data = [this.syntheticFraudData.bad,
        this.syntheticFraudData.good,
        this.syntheticFraudData.pending + this.syntheticFraudData.missingInfo, (this.syntheticFraudData.customerCount > 0 ? 0 : 100)];

      this.chartDatasetLists.mla[0].data = [this.mlaData.bad,
        this.mlaData.good, this.mlaData.pending + this.mlaData.missingInfo, (this.mlaData.customerCount > 0 ? 0 : 100)];

      this.complianceDashboardTableData = [
        ...this.idVerificationData.data,
        ...this.ofacData.data,
        ...this.expiredLicenseData.data,
        ...this.syntheticFraudData.data,
        ...this.mlaData.data
      ];

      console.log(this.complianceDashboardTableData);
      this.setListOfCustomers();
    }, (err) => {
      console.warn(err);
      this.snackBar.open(`Failed to load compliance dashboard data.`, 'Dismiss', {
        duration: environment.snackBarTimeout,
      });
      this.isLoading = false;
    });
  }

  handlePageChange(event): any {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getComplianceDashboard();
  }


  public chartClicked(e: any, chart: string): void {
    const indexId = e.active[0]._index;
    console.log(indexId);
    switch (chart) {
      case this.serviceMap.IdVerification.constant:
        this.complianceDashboardTableData = this.idVerificationData.data;
        break;
      case this.serviceMap.Ofac.constant:
        this.complianceDashboardTableData = this.ofacData.data;
        break;
      case this.serviceMap.ExpiredLicense.constant:
        this.complianceDashboardTableData = this.expiredLicenseData.data;
        break;
      case this.serviceMap.SyntheticFraud.constant:
        this.complianceDashboardTableData = this.syntheticFraudData.data;
        break;
      case this.serviceMap.Mla.constant:
        this.complianceDashboardTableData = this.mlaData.data;
        console.log(this.complianceDashboardTableData);
        break;
    }
    if (indexId === 0) {
      this.complianceDashboardTableData = this.complianceDashboardTableData.filter(metric => {
        return metric.page.type !== 'success';
      });
    } else if (indexId === 1) {
      this.complianceDashboardTableData = this.complianceDashboardTableData.filter(metric => {
        return metric.page.type === 'success';
      });
    } else if (indexId === 2) {
      this.complianceDashboardTableData = this.complianceDashboardTableData.filter(metric => {
        return metric.page.type === 'missingInfo';
      });
    }
  }

  resetDate(): void {
    delete this.filterCriteria.date1;
    delete this.filterCriteria.date2;
    this.startDate = undefined;
    this.endDate = undefined;
    this.defaultPageReset();
  }

  resetDealership(): void {
    this.selectedDealerships = this.allowedDealerships.map(obj => obj.branchId);
    this.defaultPageReset();
  }

  defaultPageReset(): void {
    this.clearResetChart();
    this.resetPage();
    this.getComplianceDashboard();
  }

  resetAllChartColors(): void {
    Object.keys(this.chartColorList).forEach((chartKey) => {
      this.chartColorList[chartKey][0].backgroundColor = this.defaultColors;
    });
  }

  getCustomer(customerId): Customer {
    return this.customerList.find((customer) => {
      return customer.globalCustomerId === customerId;
    });
  }

  setListOfCustomers(): void {
    const customers = [];
    this.complianceDashboardMetrics.forEach(complianceMetrics => {
      complianceMetrics.customers.forEach(customer => {
        if (customers.find(el => el.globalCustomerId === customer.globalCustomerId) === undefined) {
          customers.push(customer);
        }
      });
    });
    this.customerList = customers;
    console.log(this.customerList);
  }

  //
  // blockoutAllCharts(except: string[] = []): void {
  //   Object.keys(this.chartColorList).forEach((chartKey) => {
  //     if (except.indexOf(chartKey) === -1) {
  //       this.chartColorList[chartKey][0].backgroundColor = this.blockWholeChart;
  //     }
  //   });
  // }

  clearChartSelection(): void {
    this.activeIndex = undefined;
    this.activeChart = undefined;
    this.activeLabel = undefined;
  }

  clearResetChart(): void {
    this.resetAllChartColors();
    this.clearChartSelection();
  }

  resetPage(): void {
    this.page = 0;
  }

}
