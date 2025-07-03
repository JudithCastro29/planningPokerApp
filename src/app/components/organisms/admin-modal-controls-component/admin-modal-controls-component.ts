import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UsuarioEnMesa } from '../../../models/usuario.model';
import { AppState } from '../../../state/app.reducers';
import { delegarPropietario } from '../../../state/usuarios/usuario.actions';

import { ButtonDarkComponent } from '../../atoms/button-dark/button-dark.component';

import { establecerModoCartas } from '../../../state/cartas/cartas.actions';

@Component({
  selector: 'app-admin-modal-controls-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonDarkComponent],
  templateUrl: './admin-modal-controls-component.html',
  styleUrl: './admin-modal-controls-component.css',
})
export class AdminModalControlsComponent implements OnChanges {
  @Input() usuarioActual!: UsuarioEnMesa;
  @Input() jugadores: UsuarioEnMesa[] = [];
  @Input() nombrePartida: string = '';
  @Input() cartasReveladas: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() cambiarModoUsuario = new EventEmitter<void>();
  @Input() modoActualCartas: 'numeros' | 'letras' = 'numeros';

  jugadorSeleccionado: string = '';
  modoCartas: 'numeros' | 'letras' = 'numeros';

  private store = inject(Store<AppState>);

  delegarRol() {
    if (!this.jugadorSeleccionado) return;

    this.store.dispatch(
      delegarPropietario({
        actual: this.usuarioActual.nombre,
        nuevo: this.jugadorSeleccionado,
      })
    );

    this.cerrarModal();
  }

  cambiarModoCartas() {
    console.log('[Modo seleccionado]', this.modoCartas);

    if (this.cartasReveladas) {
      alert('Debes reiniciar la partida para cambiar el modo de puntaje');
      return;
    }

    this.store.dispatch(
      establecerModoCartas({
        modo: this.modoCartas,
        nombrePartida: this.nombrePartida,
      })
    );
  }

  emitirCambioModo() {
    this.cambiarModoUsuario.emit();
  }

  cerrarModal() {
    this.cerrar.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modoActualCartas']) {
      this.modoCartas = this.modoActualCartas;
    }
  }
}
