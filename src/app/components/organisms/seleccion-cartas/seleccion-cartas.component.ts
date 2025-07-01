import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.reducers';
import { seleccionarCarta } from '../../../state/cartas/cartas.actions';
import { UsuarioEnMesa } from '../../../models/usuario.model';

@Component({
  selector: 'app-seleccion-cartas-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-cartas.component.html',
  styleUrls: ['./seleccion-cartas.component.css'],
})
export class SeleccionCartasComponent implements OnInit {
  @Input() cartas: string[] = [];
  @Input() usuarioActual!: UsuarioEnMesa;
  @Input() modoUsuario!: string;
  @Input() reiniciarSeleccion = 0;
  @Output() cartaSeleccionada = new EventEmitter<string>();

  cartaSeleccionadaLocal: string | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // reset selección local si se reinicia desde fuera
    this.cartaSeleccionadaLocal = null;
  }

  elegirCarta(carta: string) {
    if (!this.usuarioActual) return;
    if (
      this.usuarioActual.modo !== 'jugador' &&
      this.usuarioActual.rol !== 'propietario'
    )
      return;
    if (this.cartaSeleccionadaLocal) return;

    this.cartaSeleccionadaLocal = carta;

    // Despacho local solo si lo necesitas
    this.store.dispatch(
      seleccionarCarta({ nombreUsuario: this.usuarioActual.nombre, carta })
    );

    // Emitimos hacia el padre
    this.cartaSeleccionada.emit(carta);
  }
}
