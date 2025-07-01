import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-button-dark',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-dark.component.html',
  styleUrl: './button-dark.component.css',
})
export class ButtonDarkComponent {
  @Input() tipo: 'button' | 'submit' | 'reset' = 'button';
  @Input() texto: string = 'Boton';
  @Input() deshabilitado: boolean = false;
  @Input() disabled = false;
  @Input() control!: AbstractControl;
  @Output() accion = new EventEmitter<void>();

  onClick() {
    if (!this.deshabilitado) {
      this.accion.emit();
    }
  }
}
