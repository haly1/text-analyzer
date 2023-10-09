import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import Formatter from 'json-formatter-js';

@Directive({
  selector: '[appJsonFormatter]'
})
export class JsonFormatterDirective implements OnChanges {
  @Input() json: any = {};
  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(): void {
    const formatter = new Formatter(this.json);
    this.elementRef.nativeElement.appendChild(formatter.render());
  }
}
