import {Injectable} from '@angular/core';
import {MarketProduct, Product} from '../../models/profile/settings.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AuthorizationService} from '../authorization/authorization.service';
import {IDVerifier} from '../../models/aggregator/aggregator_request';
import {ProfileService} from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class PreFetchService {
  public dealerDms: Product;
  public dealerCms: Product;
  public crms: Product[];
  public dmses: Product[];
  public idVerifiers: IDVerifier[];
  public entitlementProducts: Product[];
  public marketProducts: MarketProduct[];

  constructor(private http: HttpClient, private auth: AuthorizationService, private profileService: ProfileService) {
    if (this.auth.isUserLoggedIn()) {
      if ((this.crms === undefined || this.dmses === undefined)) {
        this.fetchDMSList().then(() => console.log('Fetched DMS list'));
        this.fetchCMSList().then(() => console.log('Fetched CMS list'));
      }
      if (this.idVerifiers === undefined) {
        this.fetchIdVerifiers().then(() => console.log('Fetched verifiers'));
      }
      if (this.entitlementProducts === undefined) {
        this.getEntitlementProducts().then(() => {
          this.fetchMarketProducts().then(() => {
            this.setDealerDefaults();
          });
        });
      }
      if (this.dealerCms || this.dealerDms !== undefined) {
        this.setDealerDefaults();
      }
    }
  }

  public fetchCMSList(): Promise<Product[]> {
    return this.http.post<any>(`${environment.getCrmList}${this.auth.activeBranch?.branchId}`, {}).toPromise().then(res => {
      this.crms = res;
      return res;
    });
  }

  public fetchDMSList(): Promise<Product[]> {
    return this.http.post<any>(`${environment.getDmsList}${this.auth.activeBranch?.branchId}`, {}).toPromise().then(res => {
      this.dmses = res;
      return res;
    });
  }

  public fetchIdVerifiers(): Promise<IDVerifier[]> {
    return this.http.get<IDVerifier[]>(environment.getIdVerifiers).toPromise().then(res => {
      this.idVerifiers = res;
      return res;
    });
  }

  public async getEntitlementProducts(): Promise<Product[]> {
    this.entitlementProducts = await this.profileService.getEntitlementProducts();
    return this.entitlementProducts;
  }

  public async fetchMarketProducts(): Promise<MarketProduct[]> {
    this.marketProducts = await this.profileService.getMarketProducts();
    return this.marketProducts;
  }

  private setDealerDefaults(): void {
    if (this.dmses !== undefined && this.dmses.length === 1){
      this.dealerDms = this.dmses[0];
    }
    if (this.crms !== undefined && this.crms.length === 1){
      this.dealerCms = this.crms[0];
    }
  }
}
