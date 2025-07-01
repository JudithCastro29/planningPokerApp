import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { validarNombre } from '../../../utils/validador-nombre';
import { ButtonDarkComponent } from '../../atoms/button-dark/button-dark.component';
import { InputDarkComponent } from '../../atoms/input-dark/input-dark.component';
import { ValidacionInputComponent } from '../../molecules/validacion-input/validacion-input.component';

@Component({
  selector: 'app-formulario-crear-partida',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonDarkComponent,
    InputDarkComponent,
    ValidacionInputComponent,
  ],
  templateUrl: './formulario-crear-partida.component.html',
  styleUrl: './formulario-crear-partida.component.css',
})
export class FormularioCrearPartidaComponent {
  @Output() partidaCreada = new EventEmitter<string>();
  form = new FormGroup({
    nombrePartida: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      validarNombre,
    ]),
  });
  get nombrePartidaControl(): FormControl {
    return this.form.get('nombrePartida') as FormControl;
  }
  crearPartida() {
    if (this.form.valid) {
      const nombre = this.form.value.nombrePartida!;
      this.partidaCreada.emit(nombre);
    }
  }
}
