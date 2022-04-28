import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pii-consent',
  templateUrl: './pii-consent.component.html',
  styleUrls: ['./pii-consent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PiiConsentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
