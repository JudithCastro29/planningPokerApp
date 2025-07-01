import { createReducer, on } from '@ngrx/store';
import { establecerNombrePartida } from './partida.actions';
import { PartidaState, initialPartidaState } from './partida.state';

export const partidaReducer = createReducer(
  initialPartidaState,

  on(establecerNombrePartida, (state, { nombre }) => {
    localStorage.setItem('nombre-partida', nombre); // sincronizar localStorage
    return {
      ...state,
      nombre,
    };
  })
);
