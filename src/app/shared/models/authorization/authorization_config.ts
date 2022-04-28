// Copyright 2018 Ping Identity
//
// Licensed under the MIT License (the 'License'); you may not use this file
// except in compliance with the License.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export interface AuthorizationConfig {
  issuer_uri: string;
  client_id?: string;
  client_secret?: string;
  redirect_uri: string;
  scope?: string;
  extras?: any;
}

export interface GeneralEnvironmentInfo {
  production?: boolean;
  applicationKey: string;
  idleTimeoutSeconds: number;
  idleTimeoutWarningSeconds: number;

  dealerManagementBaseUrl: string;
  getBranchListByOrgIdBranchIdUrl:string;
  userValidationUrl: string;
  addPurchaseVehicleUrl: string;
  addTradeInVehicleUrl: string;
  applicationDetailsUrl: string;
  blcBaseUrl: string;
  cdkBaseUrl: string;
  crmRequestUrl: string;
  clientssoUrl: string;
  complianceServiceBaseUrl: string;
  configurationsUrl: string;
  creditServiceBaseUrl: string;
  customerFailedScanUrl: string;
  customerListBaseUrl: string;
  customerProfileBaseUrl: string;
  customerRecordsBaseUrl: string;
  specificCustomerSalesProcess: string;
  deleteCustomerSalesProcess:string;
  addCustomerCoBorrowerUrl:string;
  dealerBranchUploadUrl: string;
  deletePermissionsRoleUrl: string;
  deletePurchaseVehicleUrl: string;
  dmsRequestUrl: string;
  documentServiceUrl: string;
  flowableOrchestraBaseUrl: string;
  customerDataAggregationRequestUrl: string;
  getCustomerComplianceProcessDetailUrl: string;
  getCustomerComplianceProcessesUrl: string;
  getPurchaseVehicleUrl: string;
  getTradeInVehicleUrl: string;
  getVehicleInventoryList: string;
  manualCreateProfileUrl: string;
  permissionsBaseUrl: string;
  permissionsMatrixUrl: string;
  processListUrl: string;
  queryTradeInVehicleTypeNUrl: string;
  queryTradeInVehicleTypePVUrl: string;
  removeTradeInVehicleUrl: string;
  requestValuationUrl: string;
  retrieveByBranchId: string;
  retrieveComplianceDashboardMetrics: string;
  retrieveCurrentUser: string;
  retrieveExistingCreditReport: string;
  retrievepagespermissionsbywebauth: string;
  retrievePermissionByAuthToken: string;
  retrievePermissionsMatrixBranch: string;
  retrieveZonesByBranchIdUrl: string;
  saleProcessConfigurationUrl: string;
  sendCreditScoreRequestUrl: string;
  sendDigitalApplicationRequestUrl: string;
  updateProcessUrl: string;
  uploadUserUrl: string;
  vehicleInventoryBaseUrl: string;
}
