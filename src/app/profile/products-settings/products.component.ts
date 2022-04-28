import {Component, OnInit} from '@angular/core';
import {ProfileService} from 'src/app/shared/services/profile/profile.service';
import {MarketProduct, Product, PromotionalProduct} from '../../shared/models/profile/settings.model';
import {SnackBarNotificationService} from '../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {environment} from '../../../environments/environment';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import * as _ from 'underscore';
import { isJSDocReturnTag } from 'typescript';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../../customer-details/overview/cards/shared.component.scss', './products.component.scss']
})
export class ProductsComponent implements OnInit {
  entitlementProducts: Product[] = [];
  marketProducts: MarketProduct[] = [];
  activeProducts: MarketProduct[] = [];
  promotionalProducts: PromotionalProduct[] = [];
  productGroups = [
    'DealFlow',
    'ID Verification',
    'CRM',
    'DMS',
    'F&I Portal',
    'Inventory',
    'Credit'
  ]
  loading: boolean;

  constructor(private profileService: ProfileService, private snackbar: SnackBarNotificationService) {
  }

  ngOnInit(): void {
    this.getEntitlementProducts();
  }

  getEntitlementProducts(): void {
    this.loading = true;
    this.profileService.getEntitlementProducts().then(data => {
      this.entitlementProducts = data;
      console.log(this.entitlementProducts);
      this.entitlementProducts.sort((a, b) => {
        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
      });
    }).catch(error => {
      this.snackbar.displayMessage(`${error.error.error}`);
    }).finally(() => {
      this.getMarketProducts();
    });
  }

  getMarketProducts(): void {
    this.profileService.getMarketProducts().then(data => {
      this.marketProducts = _.groupBy(
        data,
        (product) => product.productGroup
      );
      this.marketProducts.sort((a, b) => {
        return (a.productName.toLocaleLowerCase() > b.productName.toLocaleLowerCase()) ? 1
          : ((b.productName.toLocaleLowerCase() > a.productName.toLocaleLowerCase()) ? -1 : 0);
      });
    }).catch(error => {
      this.snackbar.displayMessage(`${error.error.error}`);
    }).finally(() => {
      this.getPromotionalProducts();
    });
  }

  getPromotionalProducts(): void {
    this.profileService.getPromotionalProducts().then(data => {
      this.promotionalProducts = data;
      this.promotionalProducts.sort((a, b) => {
        return (a.product.productName.toLocaleLowerCase() > b.product.productName.toLocaleLowerCase()) ? 1
          : ((b.product.productName.toLocaleLowerCase() > a.product.productName.toLocaleLowerCase()) ? -1 : 0);
      });
      this.activeProducts = this.marketProducts.filter(product => {
        return this.checkMarketProduct(product.productSku);
      });
    }).catch(error => {
      this.snackbar.displayMessage(`${error.error.error}`);
    }).finally(() => {
      this.loading = false;
    });
  }

  formatDate(rawDate: string): string {
    const monthNames = environment.monthNames;
    const dateObject = new Date(rawDate);
    return `${dateObject.getDate()} ${monthNames[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
  }

  updateProduct(event: any, product: MarketProduct, group: string): void {
    switch(group){
      case 'ID Verification':
      case 'DMS':
      case 'CRM': {
        if (!event.checked) {
          this.deActivateProduct(product);
        } else {
          this.marketProducts[group].map(product => {
            console.log('Deactivating other products', product);
              this.deActivateProduct(product);
          });
          this.activateProduct(product);
        }
      } break;
      default: {
        if (!event.checked) {
          this.deActivateProduct(product);
        } else {
          this.activateProduct(product);
        }
      }
    }
    
  }

  activateProduct(product: MarketProduct): void {
    this.profileService.activateProduct(product.productSku).then(data => {
      this.snackbar.displayMessage(`${data.toString()}`);
    }).catch(error => {
      this.snackbar.displayError(`${error.error.error}`);
    }).finally(() => {
      this.getPromotionalProducts();
    });
  }

  deActivateProduct(product: MarketProduct): void {
    if (this.checkMarketProduct(product.productSku)) {
      this.profileService.deActivateProduct(product.productSku).then(data => {
        this.snackbar.displayMessage(`${data.toString()}`);
      }).catch(error => {
        this.snackbar.displayError(`${error.error.error}`);
      }).finally(() => {
        this.getPromotionalProducts();
      });
    }
  }

  checkMarketProduct(productSku): boolean {
    const productSkus = this.promotionalProducts.map(el => {
      return el.product.productSku;
    });
    return productSkus.includes(productSku);
  }

  checkEntitlementProduct(productSku): boolean {
    const productSkus = this.entitlementProducts.map(el => {
      return el.productSku;
    });
    return productSkus.includes(productSku);
  }
}
