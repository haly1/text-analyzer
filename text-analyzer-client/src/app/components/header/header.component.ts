import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isOfflineModeActive: boolean = false;
  @Input() title: string = '';
  @Output() modeChange: EventEmitter<boolean> = new EventEmitter();

  emitChange(event: MatSlideToggleChange) {
    this.modeChange.emit(event.checked);
  }
}
