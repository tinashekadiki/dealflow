import {Injectable} from '@angular/core';
import {AES, enc, SHA256} from 'crypto-js';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  constructor() {
  }

  private hashKey(key: string): string {
    return SHA256(key).toString();
  }

  private encrypt(message: string): string {
    return AES.encrypt(message, environment.applicationKey).toString();
  }

  private decrypt(cipher: string): string {
    return AES.decrypt(cipher, environment.applicationKey).toString(enc.Utf8);
  }

  public setItem(key: string, object: any): void {
    const nk = this.hashKey(key);
    let item: string;
    if (typeof object === 'string') {
      item = object;
    } else {
      item = JSON.stringify(object);
    }
    return sessionStorage.setItem(nk, this.encrypt(item));
  }

  public getItem(key: string): string | null {
    const nk = this.hashKey(key);
    const item = sessionStorage.getItem(nk);
    return item != null ? this.decrypt(item) : null;
  }

  public removeItem(key: string): void {
    const nk = this.hashKey(key);
    sessionStorage.removeItem(nk);
  }
}
