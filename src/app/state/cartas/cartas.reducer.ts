import { createReducer, on } from '@ngrx/store';
import * as CartasActions from './cartas.actions';
import { CartasState, initialCartasState } from './cartas.state';

function generarCartasAleatorias(modo: CartasState['modoCartas']): string[] {
  if (modo === 'letras') {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const mezcladas = letras.sort(() => Math.random() - 0.5);
    return mezcladas.slice(0, 10);
  } else {
    const set = new Set<number>();
    while (set.size < 10) {
      set.add(Math.floor(Math.random() * 99) + 1);
    }
    return Array.from(set).map((n) => n.toString());
  }
}

export const cartasReducer = createReducer(
  initialCartasState,

  on(CartasActions.establecerNombrePartidaCartas, (state, { nombre }) => {
    localStorage.setItem('nombre-partida-cartas', nombre);
    return {
      ...state,
      nombrePartida: nombre,
    };
  }),

  on(CartasActions.establecerModoCartas, (state, { modo }) => {
    localStorage.setItem('modo-cartas', modo);
    // Al cambiar modo, generamos nuevas cartas
    const nuevasCartas = generarCartasAleatorias(modo);
    localStorage.setItem(
      `cartas-${state.nombrePartida}`,
      JSON.stringify(nuevasCartas)
    );
    return {
      ...state,
      modoCartas: modo,
      cartas: nuevasCartas,
    };
  }),

  on(CartasActions.establecerCartas, (state, { cartas }) => {
    localStorage.setItem(
      `cartas-${state.nombrePartida}`,
      JSON.stringify(cartas)
    );
    return {
      ...state,
      cartas,
    };
  }),

  on(CartasActions.revelarCartas, (state) => {
    localStorage.setItem(`cartas-reveladas-${state.nombrePartida}`, 'true');
    return {
      ...state,
      cartasReveladas: true,
    };
  }),

  on(CartasActions.mostrarResumen, (state) => {
    localStorage.setItem(`resumen-visible-${state.nombrePartida}`, 'true');
    return {
      ...state,
      resumenVisible: true,
    };
  }),

  on(CartasActions.reiniciarCartas, (state) => {
    const nuevasCartas = generarCartasAleatorias(state.modoCartas);
    localStorage.setItem(
      `cartas-${state.nombrePartida}`,
      JSON.stringify(nuevasCartas)
    );
    localStorage.removeItem(`cartas-reveladas-${state.nombrePartida}`);
    localStorage.removeItem(`resumen-visible-${state.nombrePartida}`);
    return {
      ...state,
      cartas: nuevasCartas,
      cartasReveladas: false,
      resumenVisible: false,
    };
  }),

  on(CartasActions.reiniciarEstado, (state) => {
    localStorage.removeItem(`cartas-reveladas-${state.nombrePartida}`);
    localStorage.removeItem(`resumen-visible-${state.nombrePartida}`);
    return {
      ...state,
      cartasReveladas: false,
      resumenVisible: false,
    };
  })
);
