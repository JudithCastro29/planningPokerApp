import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidacionInputComponent } from '../../molecules/validacion-input/validacion-input.component';
import { validarNombre } from '../../../utils/validador-nombre';
import { SelectorModoVisualizacionComponent } from '../../molecules/selector-modo-visualizacion/selector-modo-visualizacion.component';
import { ButtonDarkComponent } from '../../atoms/button-dark/button-dark.component';
import { InputDarkComponent } from '../../atoms/input-dark/input-dark.component';
import { selectUsuariosEnPartidaPorNombre } from '../../../state/usuarios/usuario.selectors';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.reducers';
import {
  agregarUsuario,
  actualizarModo,
} from '../../../state/usuarios/usuario.actions';
import { UsuarioEnMesa } from '../../../models/usuario.model';

@Component({
  selector: 'app-formulario-crear-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ValidacionInputComponent,
    SelectorModoVisualizacionComponent,
    ButtonDarkComponent,
    ReactiveFormsModule,
    InputDarkComponent,
  ],
  templateUrl: './formulario-crear-usuario.component.html',
  styleUrls: ['./formulario-crear-usuario.component.css'],
})
export class FormularioCrearUsuarioComponent implements OnInit {
  @Input() nombrePartida: string = '';
  @Output() cerrar = new EventEmitter<void>();
  @Output() usuarioCreado = new EventEmitter<{
    nombre: string;
    modo: string;
  }>();

  form = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      validarNombre,
    ]),
    modoVisualizacion: new FormControl('', Validators.required),
  });

  get nombreControl(): FormControl {
    return this.form.get('nombre') as FormControl;
  }

  get modoControl(): FormControl {
    return this.form.get('modoVisualizacion') as FormControl;
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.modoControl.valueChanges.subscribe((modo) => {
      const nombre = this.nombreControl.value;
      if (nombre && modo) {
        this.store.dispatch(
          actualizarModo({
            nombre,
            modo: modo as 'jugador' | 'espectador',
          })
        );
      }
    });
  }

  crearUsuario() {
    if (this.form.valid) {
      const datos = this.form.value;
      const usuario: UsuarioEnMesa = {
        nombre: datos.nombre!,
        modo: datos.modoVisualizacion! as 'jugador' | 'espectador',
        rol: 'jugador',
        partida: this.nombrePartida,
      };

      this.store.dispatch(agregarUsuario({ usuario }));

      this.usuarioCreado.emit({
        nombre: datos.nombre!,
        modo: datos.modoVisualizacion!,
      });
      this.cerrar.emit();
      this.form.reset();
    }
  }
}
