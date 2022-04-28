import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AuthorizationService} from '../authorization/authorization.service';
import {ApplicationUser} from '../../models/authorization/authenticated_user';
import {GeneralSetting, IntegrationSetting, MarketProduct, Product} from '../../models/profile/settings.model';
import {Permission} from '../../models/profile/permissions.model';
import {XmlJsonProcessorService} from '../xml-json/xml-json-processor.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  readonly baseUrl = environment.permissionsMatrixUrl;
  readonly uploadUrl = environment.documentServiceUrl;
  readonly updateUser = environment.updateUserUrl;

  vinSolutionsSettings: any;
  cdkSettings: any;
  creditSettings: any;
  customerInteractionSettings: any;
  eLeadSettings: any;
  permissions: Permission[];

  constructor(private http: HttpClient, private authorisationService: AuthorizationService, private xmlJson: XmlJsonProcessorService) {
  }

  public postCDKSettings(path: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${path}`, data);
  }

  public getRequest(path: string, branchId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${path}${branchId}`);
  }

  public getEntitlementProducts(): Promise<Product[]> {
    return this.http.get<Product[]>(`${environment.getEntitlementUrl}${this.authorisationService.activeUser.organisationalId}`).toPromise();
  }

  public getMarketProducts(): Promise<MarketProduct[]> {
    return this.http.get<MarketProduct[]>(`${environment.getMarketProductUrl}`).toPromise();
  }

  public getPromotionalProducts(): Promise<any[]> {
    console.log(`${environment.getPromotionalProductUrl}${this.authorisationService.activeUser.organisationalId}/branch/${this.authorisationService.activeBranch.branchId}`);
    return this.http.get<any[]>(`${environment.getPromotionalProductUrl}${this.authorisationService.activeUser.organisationalId}/branch/${this.authorisationService.activeBranch.branchId}`).toPromise();
  }

  public activateProduct(productSku): Promise<string> {
    console.log("Activating: ", `${environment.activateProduct}${this.authorisationService.activeUser.organisationalId}/branch/${this.authorisationService.activeBranch.branchId}/productsku/${productSku}`);
    return this.http.put(`${environment.activateProduct}${this.authorisationService.activeUser.organisationalId}/branch/${this.authorisationService.activeBranch.branchId}/productsku/${productSku}`, {}, {responseType: 'text'}).toPromise();
  }

  public deActivateProduct(productSku): Promise<string> {
    console.log("Deactivating: ", `${environment.deactivateProduct}${this.authorisationService.activeUser.organisationalId}/branch/${this.authorisationService.activeBranch.branchId}/productsku/${productSku}`);
    return this.http.delete(`${environment.deactivateProduct}${this.authorisationService.activeUser.organisationalId}/branch/${this.authorisationService.activeBranch.branchId}/productsku/${productSku}`, {responseType: 'text'}).toPromise();
  }

  public postRequest(path: string, branchId: string, data): Observable<any> {
    return this.http.post(`${this.baseUrl}${path}${branchId}`, data);
  }

  public uploadImage(data: any): Observable<any> {
    return this.http.post(this.uploadUrl, data);
  }

  public fetch(organisationalId: string | number, branchId: string): Promise<IntegrationSetting[]> {
    return this.http.get<IntegrationSetting[]>(`${environment.fetchIntegrationSettings}${organisationalId}/branch/${branchId}`).toPromise();
  }

  public fetchGeneralSettings(): Promise<GeneralSetting> {
    return this.http.get<GeneralSetting>(`${environment.getGeneralSettingsUrl}${this.authorisationService.activeUser.organisationalId}/branch/${this.authorisationService.activeBranch.branchId}`).toPromise();
  }

  public fetchIntegrationSettings(thirdParty: string): Promise<IntegrationSetting> {
    return this.http.get<IntegrationSetting>(`${environment.getIntegrationSettingsUrl}${this.authorisationService.activeUser.organisationalId}/branch/${this.authorisationService.activeBranch.branchId}/thirdparty/${thirdParty}`).toPromise();
  }

  public saveIntegrationSettings(integrationSettingsData: any, thirdParty: string): Promise<string> {
    const requestBody = this.generateRequestBody(integrationSettingsData, thirdParty);
    console.log(requestBody);
    return this.http.post(`${environment.saveIntegrationSettingsUrl}`, requestBody, {responseType: 'text'}).toPromise();
  }

  public saveGeneralSettings(settingsToken: string): Observable<any> {
    const postData = {
      branchId: this.authorisationService.activeBranch.branchId,
      organisationalId: this.authorisationService.activeUser.organisationalId,
      settingsToken
    };
    return this.http.post(`${environment.saveGeneralSettingsUrl}`, postData, {responseType: 'text'});
  }

  public updateUserDMS(user: ApplicationUser): Observable<any> {
    return this.http.put(`${this.updateUser}`, user, {responseType: 'text'});
  }

  public saveUserDMS(user: ApplicationUser): Promise<string> {
    return this.http.post(`${environment.createUserUrl}`, user, {responseType: 'text'}).toPromise();
  }

  generateRequestBody(data: any, thirdPartyCode: string): IntegrationSetting {
    const settingsToken = this.xmlJson.plainObjectToXml(data);
    return {
      branchId: this.authorisationService.activeBranch.branchId,
      organisationalId: this.applicationUser.organisationalId,
      thirdPartyCode,
      settingsToken
    };
  }

  get applicationUser(): ApplicationUser {
    return this.authorisationService.activeUser;
  }
}
