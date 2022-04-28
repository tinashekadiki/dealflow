

export const environment: any = {
  elkUrl: 'https://apm.qubedlab.com/',
  elkServerName: 'dealflow-webapp',
  elkPassword: 'dealflow4200',
  elkUserName: 'qubed',
  production: false,
  applicationKey: 'u9VmwAO3XTueJrVNde35f1cjc42Gs6Ux',
  idleTimeoutSeconds: 6000,
  idleTimeoutWarningSeconds: 30,
  notificationsFirstPage: 0,
  notificationsDefaultSize: 5,
  defaultCrmService: 4,
  defaultDmsService: 2,
  defaultVinSolutionsCode: 'VIN',
  defaultVAutoCode: 'VAUTO',
  defaultCdkCode: 'CDKDMS',
  defaultCustomerInteractionCode: 'CINT',
  defaultInventoryCode: 'INV',
  defaultCreditCode: 'CREDIT',
  defaultEleadIntCode: 'ELEADINT',
  defaultRouteOneIntCode: 'ROUTEONE',
  defaultDealerTrackIntCode: 'DEALERT',
  defaultInnovisCode: 'INNOVIS',
  snackBarTimeout: 6000,
  defaultUserId: 0,
  defaultRoles: ['SALES', 'MANAGER'],
  defaultProcessConfigTypes: ['ENDTOEND', 'SALES', 'INTERNETLEAD', 'CUSTOMER', 'COMPLIANCE'],
  defaultManagerRoleString: 'MANAGER',
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  dmsBaseUrl: 'https://asgard.qubedlab.com/dealer-management-service-v1.0.2/',

  get userValidationUrl(): string {
    return `${this.dmsBaseUrl}uservalidation`;
  },

  get getBranchListByOrgIdBranchIdUrl(): string {
    return `${this.dmsBaseUrl}branches/organisation/branchlist`;
  },

  get updateUserUrl(): string {
    return `${this.dmsBaseUrl}users/update`;
  },

  get createUserUrl(): string {
    return `${this.dmsBaseUrl}users/addsingle`;
  },

  get getAllPermissions(): string {
    return `${this.dmsBaseUrl}userpermissions/all`;
  },

  get saveNewRole(): string {
    return `${this.dmsBaseUrl}roles/addcustomrolesmap`;
  },

  get deleteRole(): string {
    return `${this.dmsBaseUrl}roles/branch`;
  },

  get fetchUsersByBranch(): string {
    return `${this.dmsBaseUrl}users/branch/`;
  },

  get fetchRolesByBranch(): string {
    return `${this.dmsBaseUrl}roles/branch/`;
  },

  get saveIntegrationSettingsUrl(): string {
    return `${this.dmsBaseUrl}integrationsettings/add`;
  },

  get saveGeneralSettingsUrl(): string {
    return `${this.dmsBaseUrl}generalsettings/add`;
  },

  get getGeneralSettingsUrl(): string {
    return `${this.dmsBaseUrl}generalsettings/organisation/`;
  },

  get getIntegrationSettingsUrl(): string {
    return `${this.dmsBaseUrl}integrationsettings/organisation/`;
  },

  get getEntitlementUrl(): string {
    return `${this.dmsBaseUrl}entitlements/organisation/`;
  },

  get getMarketProductUrl(): string {
    return `${this.dmsBaseUrl}marketprices/all/implemented`;
  },

  get getPromotionalProductUrl(): string {
    return `${this.dmsBaseUrl}promotions/organisation/`;
  },

  get getRolesByBranch(): string {
    return `${this.dmsBaseUrl}roles/branch/`;
  },

  get getBranchesUrl(): string {
    return `${this.dmsBaseUrl}branches/organisation/`;
  },

  get fetchUserUsingEmail(): string {
    return `${this.dmsBaseUrl}users/organisation/`;
  },

  get createBulkUsers(): string {
    return `${this.dmsBaseUrl}users/addbulk`;
  },

  get fetchIntegrationSettings(): string {
    return `${this.dmsBaseUrl}integrationsettings/organisation/`;
  },

  get activateProduct(): string {
    return `${this.dmsBaseUrl}marketprices/activate/organisation/`;
  },

  get deactivateProduct(): string {
    return `${this.dmsBaseUrl}marketprices/deactivate/organisation/`;
  },


  notificationsBaseUrl: 'https://asgard.qubedlab.com/pushnotifications-service/pushnotifications/',

  get notificationsList(): string {
    return `${this.notificationsBaseUrl}notifications/`;
  },
  get blockedNotifications(): string {
    return `${this.notificationsBaseUrl}blocked_notifications/`;
  },
  get blockNotification(): string {
    return `${this.notificationsBaseUrl}block`;
  },
  get deleteNotification(): string {
    return `${this.notificationsBaseUrl}delete/`;
  },
  get readNotification(): string {
    return `${this.notificationsBaseUrl}read/`;
  },
  get unblockNotification(): string {
    return `${this.notificationsBaseUrl}unblock/`;
  },

  get notificationTypes(): string {
    return `${this.notificationsBaseUrl}notificationtypes`;
  },

  complianceServiceBaseUrl: 'https://asgard.qubedlab.com/compliance-service-new/',

  get retrieveComplianceDashboardMetrics(): string {
    return `${this.complianceServiceBaseUrl}fetch/complianceStatisticsSuit`;
  },

  get getCustomerComplianceProcessesUrl(): string {
    return `${this.complianceServiceBaseUrl}getCompliance/`;
  },

  get getCustomerComplianceProcessDetailUrl(): string {
    return `${this.complianceServiceBaseUrl}getComplianceDetails/`;
  },

  get getCustomerComplianceConsentProcessDetailUrl(): string {
    return `${this.complianceServiceBaseUrl}getHistory/`;
  },

  get allComplianceProcessesUrl(): string {
    return `${this.complianceServiceBaseUrl}getProcesses`;
  },

  // new compliance endpoints

  // History
  get fetchComplianceRecords(): string {
    // latest full suit
    return `${this.complianceServiceBaseUrl}fetch/complianceRecords`;
  },

  get fetchSignedConsent(): string {
    return `${this.complianceServiceBaseUrl}fetch/signedConsent`;
  },

  get fetchComplianceRecordHistory(): string {
    // all History per flag
    return `${this.complianceServiceBaseUrl}fetch/complianceRecord`;
  },

  // https://asgard.qubedlab.com/compliance-service-new/overrideResponse/true
  get overrideResponse(): string {
    return `${this.complianceServiceBaseUrl}resolution/overrideResponse/true`;
  },

  // https://asgard.qubedlab.com/compliance-service-new/resolution/overrideRequest
  get overrideRequest(): string {
    return `${this.complianceServiceBaseUrl}resolution/overrideRequest`;
  },

  // https://asgard.qubedlab.com/compliance-service-new/fetch/recordToResolve/{flag}/{id}
  get fetchRecordToResolve(): string {
    return `${this.complianceServiceBaseUrl}fetch/recordToResolve`;
  },
  
  // https://asgard.qubedlab.com/compliance-service-new/resolution/dealerDriveRequest
  get dealerDriveRequest(): string {
    return `${this.complianceServiceBaseUrl}resolution/dealerDriveRequest`;
  },

  // https://asgard.qubedlab.com/compliance-service-new/resolution/digitalAuthRequest
  get digitalAuthRequest(): string {
    return `${this.complianceServiceBaseUrl}resolution/digitalAuthRequest`;
  },

  // https://asgard.qubedlab.com/compliance-service-new/resolution/fraudCheckRequest
  get fraudCheckRequest(): string {
    return `${this.complianceServiceBaseUrl}resolution/fraudCheckRequest`;
  },

  // https://asgard.qubedlab.com/compliance-service-new/resolution/types
  get fetchResolutionTypes(): string {
    return `${this.complianceServiceBaseUrl}resolution/types`;
  },

  // https://asgard.qubedlab.com/compliance-service-new/record/types
  get fetchRecordTypes(): string {
    return `${this.complianceServiceBaseUrl}resolution/record/types`;
  },

  customerRecordsBaseUrl: 'https://asgard.qubedlab.com/customer-records-v2/',
  get applicationDetailsUrl(): string {
    return `${this.customerRecordsBaseUrl}ApplicationDetails`;
  },
  get customerFailedScanUrl(): string {
    return `${this.customerRecordsBaseUrl}FailedIdScan`;
  },
  get customerListBaseUrl(): string {
    return `${this.customerRecordsBaseUrl}web/customerlist`;
  },
  get deleteCustomerUrl(): string {
    return `${this.customerRecordsBaseUrl}delete`;
  },
  get customerProfileBaseUrl(): string {
    return `${this.customerRecordsBaseUrl}customer/profile`;
  },
  get manualCreateProfileUrl(): string {
    return `${this.blcUrl}profile/manualcreate`;
  },
  get specificCustomerSalesProcess(): string {
    return `${this.customerRecordsBaseUrl}getCustomerProcess/`;
  },
  get deleteCustomerSalesProcess(): string {
    return `${this.customerRecordsBaseUrl}deleteProcess/`;
  },
  get addCustomerCoBorrowerUrl(): string {
    return `${this.customerRecordsBaseUrl}coborrower`;
  },

  get markArchivedCustomerUrl(): string {
    return `${this.customerRecordsBaseUrl}block`;
  },

  get dateSearchArchivedCustomerUrl(): string {
    return `${this.customerRecordsBaseUrl}searchByDate/ArchiveOrInactive`;
  },

  documentServiceBaseUrl: 'https://asgard.qubedlab.com/document-storage-service/',

  get documentServiceUrl(): string {
    return `${this.documentServiceBaseUrl}fileStorage/upload`;
  },


  get customerDataAggregationRequestUrl(): string {
    return this.blcUrl + 'crmdms/send';
  },


  customerInteractionBaseUrl: 'https://asgard.qubedlab.com/customer-interaction-service/',

  get sendDigitalApplicationRequestUrl(): string {
    return this.customerInteractionBaseUrl + 'LinkRequest';
  },

  get retrieveDigitalApplicationRequestUrl(): string {
    return this.customerInteractionBaseUrl + 'RetrieveApplication/';
  },

  get sendCreditScoreRequestUrl(): string {
    return this.customerInteractionBaseUrl + 'CreditEquiry';
  },

  get retrieveExistingCreditReport(): string {
    return this.customerInteractionBaseUrl + 'PreviousCreditEquiry/';
  },

  blcUrl: 'https://asgard.qubedlab.com/rbe-configurator/',

  blcTestUrl: 'https://test.qubedlab.com/rbe-configurator/',

  get processListUrl(): string {
    return `${this.blcUrl}configurations/branch/`;
  },

  get allProcesses(): string {
    return `${this.blcUrl}processes/all`;
  },

  get crmDms(): string {
    return `${this.blcUrl}crmdms/send`;
  },

  get getDmsList(): string {
    return `${this.blcTestUrl}crmdms/getDMSs/branch/`;
  },

  get getIdVerifiers(): string {
    return `${this.blcUrl}/idverifiers/all`;
  },

  get setIdVerifier(): string {
    return `${this.blcUrl}/idverifiers/config/add`;
  },

  get getCrmList(): string {
    return `${this.blcTestUrl}crmdms/getCRMs/branch/`;
  },

  get allSalesProcesses(): string {
    return `${this.blcUrl}processes/allsales`;
  },

  get updateProcessUrl(): string {
    return `${this.blcUrl}updateProcess/`;
  },

  get createConfiguration(): string {
    return `${this.blcUrl}configurations/create`;
  },

  get deleteConfiguration(): string {
    return `${this.blcUrl}configurations/delete/branch`;
  },

  get configurationsUrl(): string {
    return `${this.blcUrl}processes/configurations`;
  },

  get saleProcessConfigurationUrl(): string {
    return `${this.blcUrl}configurations/branch/flow/`;
  },

  creditServiceBaseUrl: 'https://asgard.qubedlab.com/credit-service/',


  vehicleInventoryBaseUrl: 'https://asgard.qubedlab.com/inventory-service/',

  get getVehicleInventoryList(): string {
    return `${this.vehicleInventoryBaseUrl}vehiclelist/`;
  },
  get addPurchaseVehicleUrl(): string {
    return `${this.vehicleInventoryBaseUrl}AddPurchaseVehicle`;
  },
  get deletePurchaseVehicleUrl(): string {
    return this.vehicleInventoryBaseUrl + 'DeletePurcahseVehicle';
  },
  get getPurchaseVehicleUrl(): string {
    return this.vehicleInventoryBaseUrl + 'getcustomer/vin/';
  },

  polkVinServiceBaseUrl: 'https://asgard.qubedlab.com/polk-vin-service/',

  get queryTradeInVehicleTypeNUrl(): string {
    return this.polkVinServiceBaseUrl + 'requestTypeN/polk';
  },
  get queryTradeInVehicleTypePVUrl(): string {
    return this.polkVinServiceBaseUrl + 'requestTypeP/polkPlate';
  },
  get addTradeInVehicleUrl(): string {
    return this.vehicleInventoryBaseUrl + 'addTradeIn';
  },

  get getTradeInVehicleUrl(): string {
    return this.vehicleInventoryBaseUrl + 'getcustomer/trade/';
  },
  // get addTradeInVehicleUrl(): string {
  //   return this.vehicleInventoryBaseUrl + 'getcustomer/trade/';
  // },
  get removeTradeInVehicleUrl(): string {
    return this.vehicleInventoryBaseUrl + 'DeleteTradeIn';
  },
  get requestValuationUrl(): string {
    return this.vehicleInventoryBaseUrl + '';
  },

  get getTradeInVehicleDetails(): string {
    return 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/';
  },

  documentVaultBaseUrl: "https://asgard.qubedlab.com/document-vault-service/",

  get getCustomerFolderUrl(): string {
    return `${this.documentVaultBaseUrl}document-vault/get/customer-folder/`;
  },


  clientssoUrl: 'https://qa.clientsso.corelogic.com/as/authorization.oauth2?client_id=IntellidealQA&response_type=token&scope=openid&redirect_uri=http://localhost:4200/callback',

  issuer_uri: 'https://uat.clientsso.corelogic.com',
  client_id: 'intellideal',
  client_secret: 'krArGm5kwjEOZ5fLxC6ytoxxT5efdwiVjdPcAoHduYEn7B2hH4gWO910nxWeWhAb',
  redirect_uri: 'http://localhost:4200/callback',
  scope: 'openid',
  extras: {
    prompt: 'consent',
    access_type: 'offline',
    tk: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IksxIiwicGkuYXRtIjoid2FvMyJ9.eyJzY29wZSI6Im9wZW5pZCIsImNsaWVudF9pZCI6ImludGVsbGlkZWFsIiwiYWdpZCI6ImVMUkdvNEZCckp1UzU4MUplR1kxQlV3TXhoQUpaUm5RIiwiZW1haWxBZGRyZXNzIjoiRGVhbGVyMVVzZXIxVUFUQ0xHWEBtYWlsaW5hdG9yLmNvbSIsInVzZXJuYW1lIjoiRGVhbGVyMVVzZXIxVUFUQ0xHWEBtYWlsaW5hdG9yLmNvbSIsImV4cCI6MTYxMzgyNzM2NH0.VQDuo6ySx0gKf6dPh9Mha309ah1oBdyGz3Qqe2ybIGoDFo1jjROxkWQXy-QAO-b_wL05Vlxm1DyZL-ChKqm_qULtmfnVdg1bTNZmWMLjMkKtkqUfsVdQ6TL1gO4gu3JLGyiZlwef7o9X_BzfCawfhxSjT11PE7xHIOQXFF77wxUIe7PSrISRcJiK18SJftHD5HbaiXlPwPbn8fDA0QMZe24wZSlNUYMGYwt5gA5t7qINayiDq_6kDTJPAGe4nyRcQ0SVX73GQwQyFQBovsPhQhfVMJCCpT5DoN9q-XLNf77hR0PklXzQdItq3w4OoZuF3mwUG3l4JKesJbGQi1e0Ww',
    px: '!ME}b?d:[wBmbn~)J(9n]xetZFQE+.REVArR<J;C>tf4m5qvjf2-tXqDG3N2Z?^a{`d6~tD^<!b#t]V76fLgbZGGUPLe/^^}:',
    me: 'Test1Manager@mailinator.com'
  },
};


