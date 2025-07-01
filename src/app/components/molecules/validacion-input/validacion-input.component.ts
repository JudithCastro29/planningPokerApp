import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-validacion-input',
  imports: [CommonModule],
  templateUrl: './validacion-input.component.html',
  styleUrl: './validacion-input.component.css',
})
export class ValidacionInputComponent {
  @Input() control!: FormControl;

  get mostrarError(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }
}
