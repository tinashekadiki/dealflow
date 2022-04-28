export interface AggregatorRequest {
  globalCustomerId: string;
  flag: string;
  eventCode: string;
  branchId: string;
  productSku?: string;
  value?: string;
  vin?: string;
}

export interface IDVerifier {
  verifierId: string;
  name: string;
}
