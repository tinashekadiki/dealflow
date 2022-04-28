import { TestBed } from '@angular/core/testing';

import { SecureStorageService } from './secure-storage.service';

describe('SecureStorageService', () => {
  let service: SecureStorageService;
  let store = {}

  beforeEach(() => {

    spyOn(sessionStorage, 'getItem').and.callFake(function (key) {
      return store[key]||null;
    });

    spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
      store[key] = value;
    });

    spyOn(sessionStorage, 'removeItem').and.callFake(function (key) {
      delete store[key]
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureStorageService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("#_hashKey()",()=>{
    it("should use SHA256 to encrypt key",()=>{

      let result = service.hashKey("test");

      expect(result).toEqual("9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08")
    })
  })

  //Can't test AES as the value changes constn
  // describe("#_encrypt()",()=>{
  //   it("should use AES to encrypt key",()=>{

  //     let result = service._encrypt("test");

  //     expect(result).toEqual("U2FsdGVkX1/t80yITsw4twS2ao2iaZogHrthO4Y6Oc8=")
  //   })
  // })

  describe("#setItem()",() => {
    it("should call #_hashKey() and #_encrypt() and store results in sessionStorage",()=>{
      spyOn(service,"_hashKey").and.returnValue("enc_key");
      spyOn(service,"_encrypt").and.returnValue("enc_value");

      store = {};

      service.setItem("key","value");

      expect(service.hashKey).toHaveBeenCalledWith("key");
      expect(service.encrypt).toHaveBeenCalledWith("value");
      expect(store).toEqual({enc_key:"enc_value"});
    })
  })

  describe("#removeItem()",() => {
    it("should call #_hashKey() remove stored key from sessionStorage",()=>{
      spyOn(service,"_hashKey").and.returnValue("enc_key");

      store = {enc_key:"enc_value"};

      service.removeItem("key");

      expect(service.hashKey).toHaveBeenCalledWith("key");
      expect(store).toEqual({});
    })
  })

  describe("#getItem()",() => {
    it("should call #_hashKey() and #_encrypt() and get results from sessionStorage",()=>{
      spyOn(service,"_hashKey").and.returnValue("enc_key");
      spyOn(service,"_decrypt").and.returnValue("value");

      store = {enc_key:"enc_value"};

      let result = service.getItem("key");

      expect(service.hashKey).toHaveBeenCalledWith("key");
      expect(service.decrypt).toHaveBeenCalledWith("enc_value");
      expect(result).toEqual("value");
    })

    it("should call #_hashKey() and #_encrypt() and return null if key is not in sessionStorage",()=>{
      spyOn(service,"_hashKey").and.returnValue("enc_keyy");
      spyOn(service,"_decrypt").and.returnValue("value");

      store = {enc_key:"enc_value"};

      let result = service.getItem("keyy");

      expect(service.hashKey).toHaveBeenCalledWith("keyy");
      expect(service.decrypt).not.toHaveBeenCalled();
      expect(result).toEqual(null);
    })
  })

});
