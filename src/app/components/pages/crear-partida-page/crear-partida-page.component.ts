import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormularioCrearPartidaComponent } from '../../organisms/formulario-crear-partida/formulario-crear-partida.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.reducers';
import { reiniciarUsuarios } from '../../../state/usuarios/usuario.actions';

import { reiniciarEstado as reiniciarCartasEstado } from '../../../state/cartas/cartas.actions';
import { establecerNombrePartida } from '../../../state/partida/partida.actions';

@Component({
  selector: 'app-crear-partida-page',
  standalone: true,
  imports: [CommonModule, FormularioCrearPartidaComponent],
  templateUrl: './crear-partida-page.component.html',
  styleUrl: './crear-partida-page.component.css',
})
export class CrearPartidaPageComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    // limpia estado de usuarios y cartas cuando se recarga la pagina
    this.store.dispatch(reiniciarUsuarios());

    this.store.dispatch(reiniciarCartasEstado());
  }

  onPartidaCreada(nombrePartida: string): void {
    // guardar nombre de partida en el store global
    this.store.dispatch(establecerNombrePartida({ nombre: nombrePartida }));

    // redirigir a la mesa
    this.router.navigate(['/mesa-votacion', nombrePartida]);
  }
}
