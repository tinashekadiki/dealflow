import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AggregatorRequest } from '../../models/aggregator/aggregator_request';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class CdkServiceService {

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) { }

  sendToAggregator(customerRecord: AggregatorRequest): Observable<any> {
    const req = {
      ...customerRecord,
      branchId: this.authorizationService.getActiveBranch?.branchId,
      vin: '',
      value: ''
    };
    console.log(req);
    return this.http.post(environment.customerDataAggregationRequestUrl, req, {responseType: 'text'});
  }

  setIdVerifier(verifierId: string): Promise<any>{
    const requestBody = {
      verifierId,
      branchId: this.authorizationService.getActiveBranch?.branchId,
    };
    return this.http.post(environment.setIdVerifier, requestBody, {responseType: 'text'}).toPromise();
  }
}
