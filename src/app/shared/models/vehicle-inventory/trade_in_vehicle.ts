export interface Trade {
    vin: string;
    date: string;
    mode: string;
    clean: boolean;
    error: string;
    success: boolean;
    branchId: string;
    parentId: string;
    globalCustomerId: string;
}

export interface Attributes {
    id: number;
    tradeInVehicles?: any;
    VIN: string;
    Year: number;
    Make: string;
    Model: string;
    Trim: string;
    Engine: string;
    MadeIn: string;
    Style: string;
    SteeringType: string;
    "Anti-BrakeSystem": string;
    FuelType: string;
    FuelCapacity: string;
    GrossWeight: string;
    OverallHeight: number;
    OverallLength: number;
    OverallWidth: number;
    StandardSeating: string;
    OptionalSeating: string;
    HighwayMileage: number;
    CityMileage: number;
    currentMileage: number;
    InvoicePrice: number;
    MSRP: string;
}

export interface TradeInVehicleResp {
    trade: Trade;
    attributes: Attributes;
}

export class TradeInVehicle {
    lienHolder: string;
    estimatedPayOff: string;
    estimatedPayOffExpiryDate: Date;
    payoff: string;
    payoffExpiryDate: Date;
    cashOffer: string;
    cashOfferExpiryDate: Date;
    acv: string;
    appraisedBy: string;
    appraisedByExpiryDate: Date;
    vin: string;
    mileage: string;
    model: string;
    year: string;
    exteriorColor: string;
    makeName: string;
    vehicleStock: string;
    stockType: string;
    modelType: string;
    price: string;
    parentId: string;
    dealerId: string;
    bodyStyle: string;
    financeCompany: string;
    pricingType: string;
}
