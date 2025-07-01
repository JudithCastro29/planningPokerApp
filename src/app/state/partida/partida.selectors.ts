import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PartidaState } from './partida.state';

export const selectPartidaState =
  createFeatureSelector<PartidaState>('partida');

export const selectNombrePartida = createSelector(
  selectPartidaState,
  (state) => state.nombre
);
