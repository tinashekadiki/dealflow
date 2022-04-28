// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { ComplianceService } from 'src/app/shared/services/compliance/compliance.service';
// import { AuthorizationService } from 'src/app/shared/services/authorization/authorization.service';
// import { FormsModule } from '@angular/forms';
// import { ComplianceDashboardComponent } from './compliance-dashboard.component';
// import { of } from 'rxjs/internal/observable/of';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { default as SampleDashboardResponse } from '../../testing/json/compliance_dashboard_response.json';
// import { ComplianceHistoryPaginated } from 'src/app/shared/models/compliance/compliance_history_paginated';
// import { throwError } from 'rxjs';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
//
// describe('ComplianceDashboardComponent', () => {
//   let component: ComplianceDashboardComponent;
//   let complianceService: ComplianceService;
//   let authorizationService: AuthorizationService;
//   let snackBar: MatSnackBar;
//   let fixture: ComponentFixture<ComplianceDashboardComponent>;
//   let sampleComplianceResponse: ComplianceHistoryPaginated = SampleDashboardResponse;
//
//   beforeEach(() => {
//
//     TestBed.configureTestingModule({
//       imports: [FormsModule, NoopAnimationsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [ComplianceDashboardComponent],
//       providers: [
//         {
//           provide: ComplianceService, useValue: {
//             getComplianceDashboardMetrics: (params => {
//               return of(sampleComplianceResponse);
//             })
//           }
//         },
//         {provide: AuthorizationService, useValue: {
//           userBranchList:[
//             { branchId: '23', name: 'Test 1' },
//             { branchId: '24', name: 'Test 2' },
//             { branchId: '25', name: 'Test 3' },
//           ],
//           getActiveBranch:{ branchId: '23', name: 'Test 1' }
//         }},
//         {
//           provide: MatSnackBar, useValue: {
//             open: (message, action, opt) => {
//             }
//           }
//         }
//       ]
//     });
//     fixture = TestBed.createComponent(ComplianceDashboardComponent);
//     complianceService = TestBed.inject(ComplianceService);
//     authorizationService = TestBed.inject(AuthorizationService);
//     snackBar = TestBed.inject(MatSnackBar);
//     component = fixture.componentInstance;
//   });
//
//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it(`displayedColumns has default the default column titles to display`, () => {
//     expect(component.displayedColumns).toEqual([
//       `position`,
//       `firstname`,
//       `lastname`,
//       `ssn`,
//       `alert`,
//       `alert_type`
//     ]);
//   });
//
//   it(`#isLoading has default value of true`, () => {
//     expect(component.isLoading).toEqual(true);
//   });
//
//   it(`#page has default value of 0`, () => {
//     expect(component.page).toEqual(0);
//   });
//
//   it(`#pageSize has default value`, () => {
//     expect(component.pageSize).toEqual(25);
//   });
//
//   it(`#chartType has default value of pie`, () => {
//     expect(component.chartType).toEqual(`pie`);
//   });
//
//   it(`chartLabels have predefined titles`, () => {
//     expect(component.chartLabels).toEqual([
//       `Alerts Unresolved`,
//       `Passed`,
//       `Alerts Resolved`,
//       `No Data`
//     ]);
//   });
//
//   it(`defaultColors has default chart colors`, () => {
//     expect(component.defaultColors).toEqual([
//       `#B11E2B`,
//       `#007987`,
//       `#FDB45C`,
//       `#ccc`
//     ]);
//   });
//
//
//   it(`blockWholeChart has default value`, () => {
//     expect(component.blockWholeChart).toEqual([`#ccc`, `#ccc`, `#ccc`, `#ccc`]);
//   });
//
//   describe('#ngOnInit', () => {
//     it('makes an expected call to getComplianceDashboard', () => {
//       spyOn(component, 'getComplianceDashboard');
//       component.selectedDealerships = component.allowedDealerships.map(obj=>obj.branchid);
//       component.ngOnInit();
//
//
//       expect(component.getComplianceDashboard).toHaveBeenCalled();
//     });
//
//     it('should set selectedDealerships to all allowedDealerships', () => {
//       spyOn(component, 'getComplianceDashboard');
//
//       component.ngOnInit();
//
//       expect(component.selectedDealerships).toEqual(['23']);
//     });
//   });
//
//   describe('#onSelectionChange', () => {
//     it('should call #resetPage', () => {
//       spyOn(component, 'getComplianceDashboard');
//       spyOn(component, 'resetPage');
//
//       component.onSelectionChange('23');
//
//       expect(component.resetPage).toHaveBeenCalled();
//     });
//
//     it('should call #getComplianceDashboard', () => {
//       spyOn(component, 'getComplianceDashboard');
//
//       component.onSelectionChange('23');
//
//       expect(component.getComplianceDashboard).toHaveBeenCalled();
//     });
//   });
//
//   describe('#updateFilters', () => {
//     it('should append page and size to filterCriteria', () => {
//       component.page = 1;
//       component.pageSize = 10;
//
//       expect(Object.keys(component.filterCriteria)).not.toContain('page');
//       expect(Object.keys(component.filterCriteria)).not.toContain('size');
//
//       component.updateFilters();
//
//       expect(Object.keys(component.filterCriteria)).toContain('page');
//       expect(Object.keys(component.filterCriteria)).toContain('size');
//     });
//
//     it('should not contain service and result is activeChart and activeLabel are undefined', () => {
//       component.activeChart = undefined;
//       component.activeLabel = undefined;
//       component.filterCriteria = { service: 'red_flag', result: true };
//
//       component.updateFilters();
//
//       expect(Object.keys(component.filterCriteria)).not.toContain('service');
//       expect(Object.keys(component.filterCriteria)).not.toContain('result');
//
//     });
//
//     it('should contain service and result is activeChart and activeLabel are defined', () => {
//       component.activeChart = 'red_flag';
//       component.activeLabel = 'Passed';
//
//       component.updateFilters();
//
//       expect(component.filterCriteria['service']).toEqual(component.serviceMap['red_flag']);
//       expect(component.filterCriteria['result']).toEqual(true);
//
//     });
//
//     it('should contain result of false when activeLabel is not Passed', () => {
//       component.activeChart = 'red_flag';
//       component.activeLabel = 'Failed';
//
//       component.updateFilters();
//
//       expect(component.filterCriteria['result']).toEqual(false);
//
//     });
//
//     it('should contain a comma separated list of selected branchids', () => {
//       component.selectedDealerships = ['23', '24', '25'];
//
//       component.updateFilters();
//
//       expect(component.filterCriteria['branchid']).toEqual('23,24,25');
//
//     });
//
//   });
//
//   describe('#resetAllChartColors', () => {
//     it('should reset chart to default colors', () => {
//       component.chartColorList = {
//         red_flag: [
//           {
//             backgroundColor: ['#000', '#000', '#000', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         ofac: [
//           {
//             backgroundColor: ['#000', '#000', '#000', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         fraud: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         mla: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         adverse_action: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ]
//       };
//
//       component.resetAllChartColors();
//
//       expect(component.chartColorList).toEqual({
//         red_flag: [
//           {
//             backgroundColor: component.defaultColors,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         ofac: [
//           {
//             backgroundColor: component.defaultColors,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         fraud: [
//           {
//             backgroundColor: component.defaultColors,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         mla: [
//           {
//             backgroundColor: component.defaultColors,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         adverse_action: [
//           {
//             backgroundColor: component.defaultColors,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ]
//       });
//
//
//     });
//   });
//
//   describe('#blockoutAllCharts', () => {
//     it('should all block chart with the blocked chart colors', () => {
//       component.chartColorList = {
//         red_flag: [
//           {
//             backgroundColor: ['#000', '#000', '#000', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         ofac: [
//           {
//             backgroundColor: ['#000', '#000', '#000', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         fraud: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         mla: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         adverse_action: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ]
//       };
//
//       component.blockoutAllCharts();
//
//       expect(component.chartColorList).toEqual({
//         red_flag: [
//           {
//             backgroundColor: component.blockWholeChart,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         ofac: [
//           {
//             backgroundColor: component.blockWholeChart,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         fraud: [
//           {
//             backgroundColor: component.blockWholeChart,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         mla: [
//           {
//             backgroundColor: component.blockWholeChart,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         adverse_action: [
//           {
//             backgroundColor: component.blockWholeChart,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ]
//       });
//
//
//     });
//
//     it('should all block charts except 1 or more specified charts with the blocked chart colors', () => {
//       component.chartColorList = {
//         red_flag: [
//           {
//             backgroundColor: ['#000', '#000', '#000', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         ofac: [
//           {
//             backgroundColor: ['#000', '#000', '#000', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         fraud: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         mla: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         adverse_action: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ]
//       };
//
//       component.blockoutAllCharts(['adverse_action', 'mla']);
//
//       expect(component.chartColorList).toEqual({
//         red_flag: [
//           {
//             backgroundColor: component.blockWholeChart,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         ofac: [
//           {
//             backgroundColor: component.blockWholeChart,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         fraud: [
//           {
//             backgroundColor: component.blockWholeChart,
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         mla: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         adverse_action: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ]
//       });
//
//
//     });
//   });
//
//
//   describe('#resetPage', () => {
//     it('should set the #page index back to 0', () => {
//       component.page = 10;
//
//       component.resetPage();
//
//       expect(component.page).toEqual(0);
//     });
//   });
//
//   describe('#handlePageChange', () => {
//     it('should set page and pageSize and then call #getComplianceDashboard', () => {
//       spyOn(component, 'getComplianceDashboard');
//
//       let eventResp = { pageIndex: 3, pageSize: 23 };
//
//       component.handlePageChange(eventResp);
//
//       expect(component.page).toEqual(3);
//       expect(component.pageSize).toEqual(23);
//       expect(component.getComplianceDashboard).toHaveBeenCalled();
//     });
//   });
//
//   describe('#chartClicked', () => {
//     it('should not proceed is the chart event\'s active array is empty', () => {
//       spyOn(component, 'resetAllChartColors');
//
//       let e = {
//         active: []
//       };
//
//       component.chartClicked(e, 'red_flag');
//
//       expect(component.resetAllChartColors).not.toHaveBeenCalled();
//
//     });
//
//     it('should not proceed is the chart\'s selected _index is for No Data ', () => {
//       spyOn(component, 'resetAllChartColors');
//
//       let e = {
//         active: [{ _index: 3 }]
//       };
//
//       component.chartClicked(e, 'red_flag');
//
//       expect(component.resetAllChartColors).not.toHaveBeenCalled();
//
//     });
//
//     it(`should call #clearChartSelection, #resetPage, #getComplianceDashboard
//         and not #blockoutAllCharts when active index and chart are the same as the event.`, () => {
//       spyOn(component, 'clearChartSelection');
//       spyOn(component, 'resetPage');
//       spyOn(component, 'getComplianceDashboard');
//       spyOn(component, 'blockoutAllCharts');
//
//       component.activeIndex = 1;
//       component.activeChart = 'red_flag';
//
//       let e = {
//         active: [{ _index: 1 }]
//       };
//
//       component.chartClicked(e, 'red_flag');
//
//       expect(component.clearChartSelection).toHaveBeenCalled();
//       expect(component.resetPage).toHaveBeenCalled();
//       expect(component.getComplianceDashboard).toHaveBeenCalled();
//       expect(component.blockoutAllCharts).not.toHaveBeenCalled();
//     });
//
//     it('should update chart colors to match clicked index', () => {
//       spyOn(component, 'resetPage');
//       spyOn(component, 'getComplianceDashboard');
//       spyOn(component, 'blockoutAllCharts');
//
//       component.chartColorList = {
//         red_flag: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         ofac: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         fraud: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         mla: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         adverse_action: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ]
//       };
//
//
//       let e = {
//         active: [{ _index: 1 }]
//       };
//
//       component.chartClicked(e, 'red_flag');
//
//       expect(component.chartColorList).toEqual({
//         red_flag: [
//           {
//             backgroundColor: ['#ccc', '#007987', '#ccc', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2
//           }
//         ],
//         ofac: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         fraud: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         mla: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ],
//         adverse_action: [
//           {
//             backgroundColor: ['#B11E2B', '#007987', '#FDB45C', '#ccc'],
//             hoverBackgroundColor: ['#E10600', '#48B295', '#FFC870'],
//             borderWidth: 2,
//           }
//         ]
//       });
//
//       expect(component.blockoutAllCharts).toHaveBeenCalledWith(['red_flag']);
//       expect(component.resetPage).toHaveBeenCalled();
//       expect(component.getComplianceDashboard).toHaveBeenCalledWith(true);
//
//     });
//   });
//
//   describe('#getComplianceDashboard', () => {
//     it('should return ComplianceHistoryPaginated and update chart data on sucessful request', () => {
//       let loc = sampleComplianceResponse;
//       loc.redFlag = 55;
//       loc.ofac = 0;
//       loc.fraud = 0;
//       loc.mla = 0;
//       loc.csd = 0;
//       spyOn(complianceService, 'getComplianceDashboardMetrics').and.returnValue(of(loc));
//       spyOn(component, 'updateFilters');
//
//       component.getComplianceDashboard();
//
//       expect(component.updateFilters).toHaveBeenCalled();
//       expect(component.complianceDashboardMetrics).toEqual(sampleComplianceResponse);
//       expect(component.totalElements).toEqual(sampleComplianceResponse.totalItems);
//
//       let compRep = component.complianceDashboardMetrics;
//
//       console.log(compRep.mla);
//       expect(component.chartDatasetLists.red_flag[0].data).toEqual([compRep.redFlagFail, compRep.redFlagPass, 0, 0]);
//       expect(component.chartDatasetLists.ofac[0].data).toEqual([compRep.ofacFail, compRep.ofacPass, 0, 100]);
//       expect(component.chartDatasetLists.fraud[0].data).toEqual([compRep.fraudFail, compRep.fraudPass, 0, 100]);
//       expect(component.chartDatasetLists.mla[0].data).toEqual([compRep.mlaFail, compRep.mlaPass, 0, 100]);
//       expect(component.chartDatasetLists.adverse_action[0].data).toEqual([compRep.csdFail, compRep.csdPass, 0, 100]);
//       expect(component.isLoading).toEqual(false);
//     });
//
//     it('should return ComplianceHistoryPaginated and update chart on no data to 100 when total of service is zero', () => {
//       let loc = sampleComplianceResponse;
//       loc.redFlag = 0;
//       loc.ofac = 10;
//       loc.fraud = 20;
//       loc.mla = 30;
//       loc.csd = 40;
//       spyOn(complianceService, 'getComplianceDashboardMetrics').and.returnValue(of(loc));
//       spyOn(component, 'updateFilters');
//
//       component.getComplianceDashboard();
//
//       expect(component.updateFilters).toHaveBeenCalled();
//       expect(component.complianceDashboardMetrics).toEqual(sampleComplianceResponse);
//       expect(component.totalElements).toEqual(sampleComplianceResponse.totalItems);
//
//       let compRep = component.complianceDashboardMetrics;
//
//       expect(component.chartDatasetLists.red_flag[0].data).toEqual([compRep.redFlagFail, compRep.redFlagPass, 0, 100]);
//       expect(component.chartDatasetLists.ofac[0].data).toEqual([compRep.ofacFail, compRep.ofacPass, 0, 0]);
//       expect(component.chartDatasetLists.fraud[0].data).toEqual([compRep.fraudFail, compRep.fraudPass, 0, 0]);
//       expect(component.chartDatasetLists.mla[0].data).toEqual([compRep.mlaFail, compRep.mlaPass, 0, 0]);
//       expect(component.chartDatasetLists.adverse_action[0].data).toEqual([compRep.csdFail, compRep.csdPass, 0, 100]);
//       expect(component.isLoading).toEqual(false);
//     });
//
//
//     it('should return ComplianceHistoryPaginated and not update chart data if isChart is true.', () => {
//       spyOn(complianceService, 'getComplianceDashboardMetrics').and.returnValue(of(sampleComplianceResponse));
//
//       component.chartDatasetLists.red_flag[0].data = [5, 20, 0, 0];
//       component.chartDatasetLists.ofac[0].data = [5, 20, 0, 0];
//       component.chartDatasetLists.fraud[0].data = [5, 20, 0, 0];
//       component.chartDatasetLists.mla[0].data = [5, 20, 0, 0];
//       component.chartDatasetLists.adverse_action[0].data = [5, 20, 0, 0];
//
//       component.getComplianceDashboard(true);
//
//       expect(component.complianceDashboardMetrics).toEqual(sampleComplianceResponse);
//       expect(component.totalElements).toEqual(sampleComplianceResponse.totalItems);
//
//       expect(component.chartDatasetLists.red_flag[0].data).toEqual([5, 20, 0, 0]);
//       expect(component.chartDatasetLists.ofac[0].data).toEqual([5, 20, 0, 0]);
//       expect(component.chartDatasetLists.fraud[0].data).toEqual([5, 20, 0, 0]);
//       expect(component.chartDatasetLists.mla[0].data).toEqual([5, 20, 0, 0]);
//       expect(component.chartDatasetLists.adverse_action[0].data).toEqual([5, 20, 0, 0]);
//       expect(component.isLoading).toEqual(false);
//     });
//
//     it('should call a #snackbar.open when request fails', () => {
//       spyOn(complianceService, 'getComplianceDashboardMetrics').and.returnValue(throwError('Test'));
//       spyOn(snackBar, 'open');
//
//       component.getComplianceDashboard();
//
//       expect(component.isLoading).toEqual(false);
//       expect(snackBar.open).toHaveBeenCalled();
//
//     });
//
//   });
//
//   describe("#resetDate()",()=>{
//     it("should filter criteria, dates and call #defaultPageReset() upon being called",()=>{
//       spyOn(component,"defaultPageReset");
//       component.filterCriteria['date1'] = '2020-10-10 00:00:00';
//       component.filterCriteria['date2'] = '2020-11-10 00:00:00';
//       component.startDate = new Date("2020-10-10");
//       component.endDate = new Date("2020-11-10");
//
//       component.resetDate()
//
//       expect(Object.keys(component.filterCriteria)).not.toContain("date1");
//       expect(Object.keys(component.filterCriteria)).not.toContain("date2");
//       expect(component.startDate).toBeUndefined();
//       expect(component.endDate).toBeUndefined();
//       expect(component.defaultPageReset).toHaveBeenCalled();
//     })
//   })
//
//   describe("#resetDealership()",()=>{
//     it("should to default dealer selection and call #defaultPageReset()",() => {
//       spyOn(component,"defaultPageReset");
//       authorizationService.userBranchList = [{name:"T1",branchId:"1"},{name:"T2",branchId:"2"},{name:"T3",branchId:"3"},{name:"T4",branchId:"4"},]
//       component.selectedDealerships = ["1","2"];
//
//       component.resetDealership();
//
//       expect(component.selectedDealerships).toEqual(["1","2","3","4"]);
//       expect(component.defaultPageReset).toHaveBeenCalled();
//     })
//   })
//
//   describe("#defaultPageReset()",() => {
//     it("should call #clearResetChart(), #resetPage() and #getComplianceDashboard()",() => {
//       spyOn(component,"clearResetChart");
//       spyOn(component,"resetPage");
//       spyOn(component,"getComplianceDashboard");
//
//       component.defaultPageReset();
//
//       expect(component.clearResetChart).toHaveBeenCalled();
//       expect(component.resetPage).toHaveBeenCalled();
//       expect(component.getComplianceDashboard).toHaveBeenCalled();
//
//     })
//   })
//
//   describe('#updatedDate', () => {
//     it('should remove field from criteria is an empty value is provided', () => {
//       component.filterCriteria['date1'] = '2020-10-10 00:00:00';
//
//       component.updatedDate('', 'date1');
//
//       expect(Object.keys(component.filterCriteria)).not.toContain('date1');
//     });
//
//     it('should append date to filterCriteria if date provided', () => {
//       component.updatedDate('2020-10-10', 'date1');
//
//       expect(component.filterCriteria['date1']).toEqual('2020-10-10 00:00:00');
//     });
//
//     it('should call #clearResetChart, #resetPage and #getComplianceDashboard if 2 dates have been provided', () => {
//       spyOn(component, 'clearResetChart');
//       spyOn(component, 'resetPage');
//       spyOn(component, 'getComplianceDashboard');
//
//       component.filterCriteria['date1'] = '2020-10-10 00:00:00';
//
//       component.updatedDate('2020-11-10', 'date2');
//
//       expect(Object.keys(component.filterCriteria)).toContain('date2');
//
//       expect(component.clearResetChart).toHaveBeenCalled();
//       expect(component.resetPage).toHaveBeenCalled();
//       expect(component.getComplianceDashboard).toHaveBeenCalled();
//     });
//
//     it('should clear endDate if it is the smaller of the 2 dates provided', () => {
//       component.endDate = new Date('2020-09-09');
//
//       component.filterCriteria['date1'] = '2020-10-10 00:00:00';
//
//       component.updatedDate(component.endDate.toString(), 'date2');
//
//       expect(Object.keys(component.filterCriteria)).not.toContain('date2');
//       expect(component.endDate).toEqual(null);
//
//     });
//   });
//
//   describe('#clearResetChart', () => {
//     it('makes expected call to #resetAllChartColors', () => {
//       spyOn(component, 'resetAllChartColors');
//
//       component.clearResetChart();
//
//       expect(component.resetAllChartColors).toHaveBeenCalled();
//     });
//
//     it('makes expected call to #clearChartSelection', () => {
//       spyOn(component, 'clearChartSelection');
//
//       component.clearResetChart();
//
//       expect(component.clearChartSelection).toHaveBeenCalled();
//     });
//   });
//
//   describe('#clearChartSelection', () => {
//     it('should set all active chart properties to undefined when called', () => {
//       component.activeIndex = 0;
//       component.activeChart = 'red_flah';
//       component.activeLabel = 'passed';
//
//       component.clearChartSelection();
//
//       expect(component.activeIndex).toBe(undefined);
//       expect(component.activeChart).toBe(undefined);
//       expect(component.activeLabel).toBe(undefined);
//     });
//   });
// });
