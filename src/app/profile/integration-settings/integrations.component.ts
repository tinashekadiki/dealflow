import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Product, MarketProduct, PromotionalProduct } from 'src/app/shared/models/profile/settings.model';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.scss']
})
export class IntegrationsComponent implements OnInit {

  @ViewChild(MatAccordion)
  accordion: MatAccordion;

  constructor(private profileService: ProfileService) {
  }

  entitlementProducts: Product[] = [];
  activeProducts: MarketProduct[] = [];
  marketProducts: MarketProduct[] = [];
  promotionalProducts: PromotionalProduct[] = [];
  loading: boolean;

  ngOnInit(): void {
    this.getMarketProducts();
  }

  getMarketProducts(): void {
    this.profileService.getMarketProducts().then(data => {
      let markets = data;
      this.marketProducts = markets.filter(product => product.productName !== 'RouteOne F&I' && product.productName !== 'Synthetic Fraud');
      console.log(this.marketProducts);
      this.marketProducts.sort((a, b) => {
        return (a.productName.toLocaleLowerCase() > b.productName.toLocaleLowerCase()) ? 1
          : ((b.productName.toLocaleLowerCase() > a.productName.toLocaleLowerCase()) ? -1 : 0);
      });
    }).catch(error => {
      // this.snackbar.displayMessage(`${error.error.error}`);
    }).finally(() => {
      this.getPromotionalProducts();
    });
  }

  getPromotionalProducts(): void {
    this.profileService.getPromotionalProducts().then(data => {
      this.promotionalProducts = data;
      console.log('Promotional Products:', this.promotionalProducts);
      this.promotionalProducts.sort((a, b) => {
        return (a.product.productName.toLocaleLowerCase() > b.product.productName.toLocaleLowerCase()) ? 1
          : ((b.product.productName.toLocaleLowerCase() > a.product.productName.toLocaleLowerCase()) ? -1 : 0);
      });
      this.activeProducts = this.marketProducts.filter(product => {
        return this.checkMarketProduct(product.productSku);
      });
      console.log("Active products: ", this.activeProducts);
    }).catch(error => {
      // this.snackbar.displayMessage(`${error.error.error}`);
    }).finally(() => {
      this.loading = false;
    });
  }

  checkMarketProduct(productSku): boolean {
    const productSkus = this.promotionalProducts.map(el => {
      return el.product.productSku;
    });
    return productSkus.includes(productSku);
  }

}
