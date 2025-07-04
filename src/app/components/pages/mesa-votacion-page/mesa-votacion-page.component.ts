import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../../state/app.reducers';
import {
  selectCartas,
  selectCartasReveladas,
  selectResumenVisible,
  selectModoCartas,
} from '../../../state/cartas/cartas.selectors';
import {
  establecerCartas,
  revelarCartas,
  reiniciarCartas,
  mostrarResumen,
  ocultarResumen,
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
import { calcularResumenVotacion } from '../../../utils/calculos-votacion';
import { reiniciarCartasUsuarios } from '../../../state/cartas/cartas.actions';

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
export class MesaVotacionPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(Store<AppState>);
  private mensajeEmergenteService = inject(MensajeEmergenteService);

  nombrePartida: string = '';
  mostrarModal = signal(true);
  mostrarInvitarModal = signal(false);
  mostrarAdminModal = signal(false);
  mensajeTodosHanVotado = false;
  reiniciarSeleccion = Date.now();

  //selectores NgRx
  cartas$ = this.store.select(selectCartas);
  cartasReveladas$ = this.store.select(selectCartasReveladas);
  mostrarResumen$ = this.store.select(selectResumenVisible);
  usuarioActual$ = this.store.select(selectUsuarioActual);

  usuarios$ = signal<UsuarioEnMesa[]>([]);
  usuariosSnapshot: UsuarioEnMesa[] = [];
  usuarioActualSnapshot: UsuarioEnMesa | null = null;
  mostrarResumen = signal(false);
  animandoConteo = signal(false);
  modoCartas: 'numeros' | 'letras' = 'numeros';
  cartasListas = signal(false);

  promedioVotacion = computed(() =>
    calcularResumenVotacion(this.usuarios$(), this.modoCartas)
  );
  votosPorCarta = computed(() => contarVotosPorCarta(this.usuarios$()));

  private subscriptions = new Subscription();

  ngOnInit(): void {
    //obtiene nombre de la partida
    this.route.params.subscribe((params) => {
      this.nombrePartida = params['nombrePartida'] || '';
      localStorage.setItem('nombre-partida', this.nombrePartida);

      // si no hay cartas para esta partida las genera
      this.store.dispatch(
        generarCartasSiNoExisten({ nombrePartida: this.nombrePartida })
      );

      //cartas listas
      this.cartas$.subscribe((cartas) => {
        if (cartas.length > 0) {
          this.cartasListas.set(true);
        }
      });

      // carga modo
      const modoGuardado = localStorage.getItem(
        `modo-cartas-${this.nombrePartida}`
      ) as 'numeros' | 'letras' | null;
      if (modoGuardado) {
        this.modoCartas = modoGuardado;
      } else {
        this.modoCartas = 'numeros';
      }

      // Cargar cartas desde localStorage si existen
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

      // Cargar estado de cartasReveladas desde localStorage
      const reveladasGuardadas = localStorage.getItem(
        `cartas-reveladas:${this.nombrePartida}`
      );
      if (reveladasGuardadas) {
        try {
          const reveladas = JSON.parse(reveladasGuardadas);
          if (reveladas) {
            this.store.dispatch(revelarCartas());
          }
        } catch (e) {
          console.error(
            'Error al cargar cartasReveladas desde localStorage:',
            e
          );
        }
      }

      // suscribirse a usuarios de la partida
      const usuariosSub = this.store
        .select(selectUsuariosEnPartidaPorNombre(this.nombrePartida))
        .subscribe((usuarios) => {
          this.usuariosSnapshot = usuarios;
          this.usuarios$.set(usuarios);
          console.log('Usuarios en mesa actualizados:', this.usuariosSnapshot);
          const actualizado = usuarios.find(
            (u) => u.nombre === this.usuarioActualSnapshot?.nombre
          );
          if (actualizado) {
            this.usuarioActualSnapshot = actualizado;
          }

          const todosHanVotado = usuarios
            .filter((u) => u.modo === 'jugador' || u.rol === 'propietario')
            .every((u) => u.carta && u.carta !== '');

          if (
            usuarios.length > 0 &&
            todosHanVotado &&
            !this.mensajeTodosHanVotado
          ) {
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
      this.subscriptions.add(usuariosSub);
    });

    // Suscribirse a usuarioActual
    const usuarioActualSub = this.usuarioActual$.subscribe((usuario) => {
      this.usuarioActualSnapshot = usuario;
    });
    this.subscriptions.add(usuarioActualSub);

    // Sincronizar cartasReveladas con localStorage
    const cartasReveladasSub = this.cartasReveladas$.subscribe((reveladas) => {
      localStorage.setItem(
        `cartas-reveladas:${this.nombrePartida}`,
        JSON.stringify(reveladas)
      );
    });
    const mostrarResumenSub = this.mostrarResumen$.subscribe((valor) => {
      this.mostrarResumen.set(valor);
    });
    this.subscriptions.add(mostrarResumenSub);

    // Escuchar eventos storage para sincronización entre pestañas
    window.addEventListener('storage', this.onStorageEvent.bind(this));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    window.removeEventListener('storage', this.onStorageEvent.bind(this));
  }

  private ultimoConteo = 0;

  private onStorageEvent(event: StorageEvent) {
    if (!event.key) return;
    if (event.key === 'reiniciar-seleccion:' + this.nombrePartida) {
      const nuevoValor = Number(event.newValue) || Date.now();
      if (nuevoValor !== this.reiniciarSeleccion) {
        this.reiniciarSeleccion = nuevoValor;

        //ejecuta el reinicio también en esta pestaña
        this.store.dispatch(
          reiniciarCartas({ nombrePartida: this.nombrePartida })
        );

        this.mensajeTodosHanVotado = false;
        localStorage.removeItem('todos-han-votado:' + this.nombrePartida);
        localStorage.setItem(`cartas-reveladas:${this.nombrePartida}`, 'false');
      }
      // cartas reveladas
    } else if (event.key === `cartas-reveladas:${this.nombrePartida}`) {
      try {
        const reveladas = JSON.parse(event.newValue ?? 'false');
        if (reveladas) {
          this.store.dispatch(revelarCartas());
        } else {
        }
      } catch (e) {
        console.error('Error parseando cartasReveladas en storage event', e);
      } //si todos han votado pasa esto, se cuentan los votos
    } else if (event.key === `contar-votos:${this.nombrePartida}`) {
      const timestamp = Number(event.newValue);
      if (!timestamp || timestamp === this.ultimoConteo) return;
      this.ultimoConteo = timestamp;
      this.activarAnimacionYResumen(timestamp);
    }
  }

  //se agrega un nuevo usuario al store
  guardarUsuario({ nombre, modo }: { nombre: string; modo: string }) {
    console.log('[guardarUsuario] llamado con', nombre, modo);

    const yaExiste = this.usuariosSnapshot.some((u) => u.nombre === nombre);
    if (yaExiste) {
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

  //el jugador selecciono una carta
  manejarCartaSeleccionada(carta: string) {
    const usuario = this.usuarioActualSnapshot;
    if (!usuario) return;

    if (usuario.modo === 'jugador' || usuario.rol === 'propietario') {
      this.store.dispatch(actualizarCarta({ nombre: usuario.nombre, carta }));
      this.mensajeEmergenteService.mostrar(`${usuario.nombre} eligió su carta`);
    }
  }

  //

  revelarCartas() {
    this.store.dispatch(revelarCartas());
  }

  // reinicar tanto votos como cartas
  reiniciarPartida() {
    this.store.dispatch(reiniciarCartas({ nombrePartida: this.nombrePartida }));
    this.store.dispatch(
      reiniciarCartasUsuarios({ nombrePartida: this.nombrePartida })
    );

    this.reiniciarSeleccion = Date.now();
    localStorage.setItem(
      'reiniciar-seleccion:' + this.nombrePartida,
      this.reiniciarSeleccion.toString()
    );

    this.mensajeTodosHanVotado = false;
    localStorage.removeItem('todos-han-votado:' + this.nombrePartida);
    localStorage.setItem(`cartas-reveladas:${this.nombrePartida}`, 'false');
  }

  //contar votos, lleva a la animacion y el resumen
  contarVotos() {
    const timestamp = Date.now();
    localStorage.setItem(
      `contar-votos:${this.nombrePartida}`,
      timestamp.toString()
    );

    this.activarAnimacionYResumen(timestamp);
  }
  // animación + resumen
  private activarAnimacionYResumen(timestamp: number) {
    this.animandoConteo.set(true);

    setTimeout(() => {
      this.store.dispatch(mostrarResumen());
      this.animandoConteo.set(false);
    }, 3000);
  }

  //cambiar entre espectador o jugador
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

  //conteo lleva a mostrar resumen
  animandoConteo$ = this.mostrarResumen$;
}
