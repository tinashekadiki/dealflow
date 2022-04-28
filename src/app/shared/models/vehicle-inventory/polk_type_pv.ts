export class PolkTypePv {
  requestBranded: string;
  request: PvRequest[];
  permissions: PvPermissions;
}

export class PvPermissions {
  globalcustomerid: string;
  settingcode: string;
}

export class PvRequest {
  REQUESTID: string;
  LICENSEPLATE: string;
  LICENSESTATE: string;
}