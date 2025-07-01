import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-selector-modo-visualizacion',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './selector-modo-visualizacion.component.html',
  styleUrls: ['./selector-modo-visualizacion.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorModoVisualizacionComponent),
      multi: true,
    },
  ],
})
export class SelectorModoVisualizacionComponent
  implements ControlValueAccessor
{
  modos: ('jugador' | 'espectador')[] = ['jugador', 'espectador'];
  value: 'jugador' | 'espectador' = 'jugador';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: 'jugador' | 'espectador'): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  seleccionar(modo: 'jugador' | 'espectador') {
    this.value = modo;
    this.onChange(modo);
    this.onTouched();
  }
}
