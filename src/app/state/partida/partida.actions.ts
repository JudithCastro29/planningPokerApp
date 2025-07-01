import { createAction, props } from '@ngrx/store';

export const establecerNombrePartida = createAction(
  '[Partida] Establecer Nombre',
  props<{ nombre: string }>()
);
