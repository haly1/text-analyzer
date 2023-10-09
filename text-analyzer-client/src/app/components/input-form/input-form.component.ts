import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent {
  @Output() formSubmit: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup = new FormGroup({
    textToAnalyze: new FormControl('', Validators.required),
    mode: new FormControl('both')
  });

  submitForm(): void {
    this.formSubmit.emit(this.form.value);
  }
}
