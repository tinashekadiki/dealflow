export interface Customer {
    id: number;
    customerGlobalId: string;
    firstName: string;
    lastName: string;
    phoneNumber?: any;
    email?: any;
    buyingStage: string;
    complianceFlag: string;
}
export interface CustomerListPaginated {
        totalItems: number;
        totalPages: number;
        customers: Customer[];
        currentPage: number;
}