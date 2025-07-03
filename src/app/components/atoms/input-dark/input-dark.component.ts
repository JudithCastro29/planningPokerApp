import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  AbstractControl,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-input-dark',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-dark.component.html',
  styleUrl: './input-dark.component.css',
})
export class InputDarkComponent {
  @Input() control!: FormControl;

  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';

  @Input() inputId?: string;
  @Input() labelText?: string;
}
