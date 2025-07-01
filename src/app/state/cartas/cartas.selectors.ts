import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartasState } from './cartas.state';

export const selectCartasState = createFeatureSelector<CartasState>('cartas');

export const selectCartas = createSelector(
  selectCartasState,
  (state) => state.cartas
);

export const selectModoCartas = createSelector(
  selectCartasState,
  (state) => state.modoCartas
);

export const selectCartasReveladas = createSelector(
  selectCartasState,
  (state) => state.cartasReveladas
);

export const selectResumenVisible = createSelector(
  selectCartasState,
  (state) => state.resumenVisible
);

export const selectNombrePartidaCartas = createSelector(
  selectCartasState,
  (state) => state.nombrePartida
);
