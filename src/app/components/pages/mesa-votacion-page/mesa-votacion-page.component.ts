import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../../state/app.reducers';
import {
  selectCartas,
  selectCartasReveladas,
  selectResumenVisible,
} from '../../../state/cartas/cartas.selectors';
import {
  establecerCartas,
  revelarCartas,
  reiniciarCartas,
  mostrarResumen,
} from '../../../state/cartas/cartas.actions';
import {
  selectUsuariosEnPartidaPorNombre,
  selectUsuarioActual,
} from '../../../state/usuarios/usuario.selectors';
import {
  actualizarCarta,
  actualizarModo,
  agregarUsuario,
} from '../../../state/usuarios/usuario.actions';

import { UsuarioEnMesa } from '../../../models/usuario.model';

import { CrearUsuarioModalComponent } from '../../organisms/crear-usuario-modal-component/crear-usuario-modal-component';
import { InvitarJugadoresModalComponent } from '../../organisms/invitar-jugadores-modal-component/invitar-jugadores-modal-component';
import { MesaVotacionTemplateComponent } from '../../templates/mesa-votacion-template/mesa-votacion-template.component';
import { AdminModalControlsComponent } from '../../organisms/admin-modal-controls-component/admin-modal-controls-component';
import { MensajeEmergenteComponent } from '../../molecules/mensaje-emergente-component/mensaje-emergente-component';

import {
  calcularPromedioVotacion,
  contarVotosPorCarta,
} from '../../../utils/calculos-votacion';
import { MensajeEmergenteService } from '../../../services/mensaje-emergente-service/mensaje-emergente-service';
import { generarCartasSiNoExisten } from '../../../state/cartas/cartas.actions';
@Component({
  selector: 'app-mesa-votacion-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CrearUsuarioModalComponent,
    InvitarJugadoresModalComponent,
    MesaVotacionTemplateComponent,
    AdminModalControlsComponent,
    MensajeEmergenteComponent,
  ],
  templateUrl: './mesa-votacion-page.component.html',
  styleUrls: ['./mesa-votacion-page.component.css'],
})
export class MesaVotacionPage implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store<AppState>);
  private mensajeEmergenteService = inject(MensajeEmergenteService);

  nombrePartida: string = '';
  mostrarModal = signal(true);
  mostrarInvitarModal = signal(false);
  mostrarAdminModal = signal(false);
  mensajeTodosHanVotado = false;
  reiniciarSeleccion = Date.now();

  cartas$ = this.store.select(selectCartas);
  cartasReveladas$ = this.store.select(selectCartasReveladas);
  mostrarResumen$ = this.store.select(selectResumenVisible);
  usuarioActual$ = this.store.select(selectUsuarioActual);

  usuarios$ = signal<UsuarioEnMesa[]>([]);
  usuariosSnapshot: UsuarioEnMesa[] = [];
  usuarioActualSnapshot: UsuarioEnMesa | null = null;

  promedioVotacion = computed(() =>
    calcularPromedioVotacion(this.usuariosSnapshot)
  );

  votosPorCarta = computed(() => contarVotosPorCarta(this.usuariosSnapshot));

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.nombrePartida = params['nombrePartida'] || '';
      localStorage.setItem('nombre-partida', this.nombrePartida);

      this.store.dispatch(
        generarCartasSiNoExisten({ nombrePartida: this.nombrePartida })
      );
      // ✅ Cargar cartas desde localStorage si existen
      const cartasGuardadas = localStorage.getItem(
        `cartas-${this.nombrePartida}`
      );
      if (cartasGuardadas) {
        try {
          const cartas = JSON.parse(cartasGuardadas);
          this.store.dispatch(establecerCartas({ cartas }));
        } catch (e) {
          console.error('Error al cargar cartas desde localStorage:', e);
        }
      }

      // 🔁 Escuchar usuarios de la partida
      this.store
        .select(selectUsuariosEnPartidaPorNombre(this.nombrePartida))
        .subscribe((usuarios) => {
          this.usuariosSnapshot = usuarios;
          this.usuarios$.set(usuarios);

          const actualizado = usuarios.find(
            (u) => u.nombre === this.usuarioActualSnapshot?.nombre
          );
          if (actualizado) {
            this.usuarioActualSnapshot = actualizado;
          }

          const todosHanVotado = usuarios
            .filter((u) => u.modo === 'jugador' || u.rol === 'propietario')
            .every((u) => u.carta && u.carta !== '');

          if (todosHanVotado && !this.mensajeTodosHanVotado) {
            this.mensajeTodosHanVotado = true;
            localStorage.setItem(
              'todos-han-votado:' + this.nombrePartida,
              'true'
            );
            this.mensajeEmergenteService.mostrar(
              'Todos los jugadores han votado'
            );
          }
        });
    });

    this.usuarioActual$.subscribe((usuario) => {
      this.usuarioActualSnapshot = usuario;
    });

    window.addEventListener('storage', (event) => {
      if (
        event.key === 'reiniciar-seleccion:' + this.nombrePartida &&
        Number(event.newValue) !== this.reiniciarSeleccion
      ) {
        this.reiniciarSeleccion = Number(event.newValue) || Date.now();
      }
    });
  }
  guardarUsuario({ nombre, modo }: { nombre: string; modo: string }) {
    console.log('[guardarUsuario] llamado con', nombre, modo);

    const yaExiste = this.usuariosSnapshot.some((u) => u.nombre === nombre);
    if (yaExiste) {
      this.mensajeEmergenteService.mostrar('Ese nombre ya está en uso');
      return;
    }

    const yaHayUsuarios = this.usuariosSnapshot.length > 0;

    const usuarioCompleto: UsuarioEnMesa = {
      nombre,
      modo: modo as 'jugador' | 'espectador',
      rol: yaHayUsuarios ? 'jugador' : 'propietario',
      partida: this.nombrePartida,
    };

    this.store.dispatch(agregarUsuario({ usuario: usuarioCompleto }));

    console.log('[guardarUsuario] cerrando modal...');
    this.mostrarModal.set(false);
  }

  manejarCartaSeleccionada(carta: string) {
    const usuario = this.usuarioActualSnapshot;
    if (!usuario) return;

    if (usuario.modo === 'jugador' || usuario.rol === 'propietario') {
      this.store.dispatch(actualizarCarta({ nombre: usuario.nombre, carta }));
      this.mensajeEmergenteService.mostrar(`${usuario.nombre} eligió su carta`);
    }
  }

  revelarCartas() {
    this.store.dispatch(revelarCartas());
  }

  reiniciarPartida() {
    this.store.dispatch(reiniciarCartas());
    this.reiniciarSeleccion = Date.now();
    localStorage.setItem(
      'reiniciar-seleccion:' + this.nombrePartida,
      this.reiniciarSeleccion.toString()
    );
    this.mensajeTodosHanVotado = false;
    localStorage.removeItem('todos-han-votado:' + this.nombrePartida);
  }

  contarVotos() {
    this.store.dispatch(mostrarResumen());
  }

  onCambiarModo() {
    const usuario = this.usuarioActualSnapshot;
    if (!usuario) return;
    const nuevoModo = usuario.modo === 'jugador' ? 'espectador' : 'jugador';
    this.store.dispatch(
      actualizarModo({ nombre: usuario.nombre, modo: nuevoModo })
    );
  }

  get inicialesPropietario(): string {
    const propietario = this.usuariosSnapshot.find(
      (u) => u.rol === 'propietario'
    );
    return propietario?.nombre?.slice(0, 2).toUpperCase() ?? '';
  }

  get todosHanVotado(): boolean {
    return this.usuariosSnapshot
      .filter((u) => u.modo === 'jugador' || u.rol === 'propietario')
      .every((u) => u.carta && u.carta !== '');
  }

  get mostrarBotonRevelar(): boolean {
    let reveladas = false;
    this.cartasReveladas$.subscribe((c) => (reveladas = c)).unsubscribe();
    return (
      this.todosHanVotado &&
      !reveladas &&
      this.usuarioActualSnapshot?.rol === 'propietario'
    );
  }

  get usuarioActual(): UsuarioEnMesa | null {
    return this.usuarioActualSnapshot;
  }

  get usuariosEnMesa(): UsuarioEnMesa[] {
    return this.usuariosSnapshot;
  }

  get cartasDisponibles(): string[] {
    let cartas: string[] = [];
    this.cartas$.subscribe((c) => (cartas = c)).unsubscribe();
    return cartas;
  }

  get cartasReveladas(): boolean {
    let reveladas = false;
    this.cartasReveladas$.subscribe((c) => (reveladas = c)).unsubscribe();
    return reveladas;
  }

  get mostrarResumen(): boolean {
    let mostrar = false;
    this.mostrarResumen$.subscribe((m) => (mostrar = m)).unsubscribe();
    return mostrar;
  }

  get animandoConteo(): boolean {
    return this.mostrarResumen;
  }
}
