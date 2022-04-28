import { Component, OnInit } from '@angular/core';

export interface LenderResponse {
  name: string;
  amountFinanced: number;
  term: number;
  monthlyPayment: number;
  APR: number;
  downPayment: number;
  action?: any;
  response?: string;
}

const ELEMENT_DATA: LenderResponse[] = [
  { amountFinanced: 22000, name: 'Alliance & Leicester', term: 36, monthlyPayment: 456, APR: 0.0035, downPayment: 3456 },
  { amountFinanced: 22000, name: 'Helium', term: 48, monthlyPayment: 333, APR: 0.0036, downPayment: 5130 },
  { amountFinanced: 23000, name: 'Lithium', term: 48, monthlyPayment: 358, APR: 0.0038, downPayment: 5120 },
  { amountFinanced: 21000, name: 'Beryllium', term: 36, monthlyPayment: 459, APR: 0.0032, downPayment: 6523 },
  { amountFinanced: 20500, name: 'Boron', term: 60, monthlyPayment: 300, APR: 0.0029, downPayment: 8934 },
  { amountFinanced: 19600, name: 'Carbon', term: 72, monthlyPayment: 309, APR: 0.0025, downPayment: 6587 },
  { amountFinanced: 17000, name: 'Nitrogen', term: 36, monthlyPayment: 446, APR: 0.00375, downPayment: 6657 },
  { amountFinanced: 18500, name: 'Oxygen', term: 48, monthlyPayment: 449, APR: 0.00315, downPayment: 5527 },
  { amountFinanced: 29000, name: 'Fluorine', term: 36, monthlyPayment: 430, APR: 0.00385, downPayment: 3879 },
  { amountFinanced: 21150, name: 'Neon', term: 36, monthlyPayment: 432, APR: 0.00305, downPayment: 3328 },
];

@Component({
  selector: 'app-lender-portal',
  templateUrl: './lender-portal.component.html',
  styleUrls: ['../shared.component.scss', './lender-portal.component.scss']
})
export class LenderPortalComponent implements OnInit {

  displayedColumns: string[] = ['name', 'amountFinanced', 'term', 'monthlyPayment', 'APR', 'downPayment', 'action'];
  dataSource = ELEMENT_DATA;

  // tslint:disable-next-line: new-parens
  creationDate: Date = new Date;

  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  // console.log(creationDate);

}
