import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  @Output() sideNavClickedEvent = new EventEmitter();
  constructor() { }

  sideNavClicked(msg: string): void {
    this.sideNavClickedEvent.emit();
  }
}
