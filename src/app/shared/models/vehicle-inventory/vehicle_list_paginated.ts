import { Vehicle } from './vehicle';

export interface VehicleListPaginated {
    totalItems: number;
    totalPages: number;
    vehicles: Vehicle[];
    currentPage: number;
}
