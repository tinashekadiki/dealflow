import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XmlJsonProcessorService {

  constructor() { }

  // xmlToJson(xml: any): any{
  //   if (xml !== undefined){
  //     const json = {};
  //     for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
  //       const key = res[1] || res[3];
  //       const value = res[2] && this.xmlToJson(res[2]);

  //       json[key] = ((value && Object.keys(value).length) ? value : res[2]) || null;
  //     }
  //     return json;
  //   }
  //   return {};
  // }
  xmlToJson(xmlDoc): any {
    var xmlToJson = function (xml) {
      // 'use strict';
      var obj = {};
      if (xml.nodeType == 3) { 
          obj = xml.nodeValue;
      }            
      if (xml.hasChildNodes()) {
          for (var i = 0; i < xml.childNodes.length; i++) {
              var item = xml.childNodes.item(i);
              var nodeName = item.nodeName;
              if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xmlToJson(item);
              } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                      var old = obj[nodeName];
                      obj[nodeName] = [];
                      obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xmlToJson(item));
              }
          }
      }
      // if(typeof obj == 'number' || typeof obj == 'string'){
      //   // console.log(obj);
      //   return obj;
      // }
      // if(typeof obj == 'object'){
      //   if(Object.keys(obj).includes('#text')){
      //     console.log(obj['#text']);
      //     return obj['#text'];
      //   }
      // }
      return obj;
  };

    let parser = new DOMParser();
    let xml = parser.parseFromString(xmlDoc, "text/xml");
    let preJson = xmlToJson(xml);
    this.sanitiseJson(preJson);
    return preJson;
  }

  sanitiseJson(obj){
    let json = {};
    Object.keys(obj).forEach(element => {
      let value = obj[element];
      if(!(typeof value == 'object')){
        json[element] = value;
      }
      else{
       if(element == '#text'){
        console.log('Text found');
       }
      }
      console.log(element, value);
    });
    return json;
  }

  plainObjectToXml(data: object): string {
    let xmlObject = '<settings>';
    Object.keys(data).forEach((key) => {
      const xmlNode = this.xmlNode(key, data[key]);
      xmlObject += xmlNode;
    });
    return `${xmlObject}</settings>`;
  }

  xmlNode(key: string, value: string): string {
    return `<${key}>${value}</${key}>`;
  }
}
