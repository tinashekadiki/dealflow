import { Branch, Dealership } from './profiles.model';

export interface IntegrationSetting {
  branch?: Branch;
  branchId?: string;
  organisationalId: number;
  thirdPartyCode: string;
  settingsToken: string;
}

export interface GeneralSetting {
  branch: Branch;
  branchId?: string;
  organisationalId: number;
  settingsToken: string;
}

export interface Product {
  productSku: string;
  productId: string;
  productName?: string;
  name?: string;
  dealership?: Dealership;
  startDate?: string;
  endDate?: string;
  version?: string;
  price: number;
  flag?: string;
}

export interface MarketProduct {
  productSku: string;
  productName: string;
  productType: string;
  marketPrice: string;
  productGroup: string;
  isActive: boolean;
}

export interface PromotionalProduct {
  subscriptionId?: number;
  product?: Product;
  branch?: Branch;
  effectivePrice?: number;
  discount?: number;
  startDate?: number;
  endDate?: number;
  status?: boolean;
}
