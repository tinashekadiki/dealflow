import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PurchaseVehicle } from 'src/app/shared/models/vehicle-inventory/purchase_vehicle';
import { TradeInVehicle, TradeInVehicleResp } from 'src/app/shared/models/vehicle-inventory/trade_in_vehicle';
import { VehicleListPaginated } from 'src/app/shared/models/vehicle-inventory/vehicle_list_paginated';
import { PolkTypeN } from 'src/app/shared/models/vehicle-inventory/polk_type_n';
import { PolkTypePv } from 'src/app/shared/models/vehicle-inventory/polk_type_pv';
import { DealProgressService } from '../deal-progress/deal-progress.service';
import { Trade_Vehicle_Request } from '../../models/vehicle-inventory/trade_vehicle_request';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private _refreshTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  addPurchaseProcessId = 4;

  constructor(private http: HttpClient, private dealProgressService: DealProgressService) { }

  getVehicleInventoryList(params = {}): Observable<VehicleListPaginated> {
    return this.http.get<VehicleListPaginated>(environment.getVehicleInventoryList, { params });
  }

  shouldTriggerRefresh(shouldI: boolean) {
    this._refreshTrigger.next(shouldI);
  }

  triggerRefresh() {
    return this._refreshTrigger.asObservable();
  }

  addPurchaseVehicle(customerId: string, vin: string): Observable<Object> {
    return this.http.post(environment.addPurchaseVehicleUrl, { globalCustomerId: customerId, vin }).pipe(finalize(() => {
      this.shouldTriggerRefresh(true);
      this.dealProgressService.addNewCompletion(customerId, { processId: this.addPurchaseProcessId })
    }));
  }

  getCustomerPurchaseVehicle(customerId: string): Observable<PurchaseVehicle[]> {
    return this.http.get<PurchaseVehicle[]>(environment.getPurchaseVehicleUrl + customerId).pipe(map((pvs) => {
      if (pvs.length < 1) {
        this.dealProgressService.removeProcess(customerId, { processId: this.addPurchaseProcessId })
      } else {
        this.dealProgressService.addNewCompletion(customerId, { processId: this.addPurchaseProcessId })
      }
      return pvs;
    }));
  }

  deletePurchaseVehicle(purchaseVehicleId: number, customerId: string) {
    return this.http.post(environment.deletePurchaseVehicleUrl, {
      id: purchaseVehicleId
    }, { responseType: "text" }).pipe(finalize(() => {
      this.shouldTriggerRefresh(true);
      this.dealProgressService.removeProcess(customerId, { processId: this.addPurchaseProcessId })
    }));
  }

  getCustomerTradeInVehicle(customerId: string): Observable<TradeInVehicleResp[]> {
    return this.http.get<TradeInVehicleResp[]>(environment.getTradeInVehicleUrl + customerId);
  }

  getQueryPolkTypeN(tradeInVehicleDetails: PolkTypeN): Observable<any> {
    return this.http.post(environment.queryTradeInVehicleTypeNUrl, tradeInVehicleDetails, { responseType: "text" });
  }

  getQueryPolkTypePV(tradeInVehicleDetails: PolkTypePv): Observable<any> {
    return this.http.post(environment.queryTradeInVehicleTypePVUrl, tradeInVehicleDetails, { responseType: "text" });
  }

  addTradeInVehicle(tardeInVehicleRequest: Trade_Vehicle_Request) {
    return this.http.post(environment.addTradeInVehicleUrl, tardeInVehicleRequest, { responseType: "text" })
  }

  deleteTradeVehicle(payload) {
    return this.http.post(environment.removeTradeInVehicleUrl, payload, { responseType: "text" });
  }

  getTradeInVehicle(vin: string) {
    return this.http.get(`${environment.getTradeInVehicleDetails}${vin}?format=json`);
  }
}
