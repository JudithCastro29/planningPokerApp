import { createAction, props } from '@ngrx/store';
import { ModoCartas } from './cartas.state';

// establecer nombre de la partida asociada a las cartas
export const establecerNombrePartidaCartas = createAction(
  '[Cartas] Establecer Nombre Partida',
  props<{ nombre: string }>()
);

// establecer modo de las cartas
export const establecerModoCartas = createAction(
  '[Cartas] Establecer Modo Cartas',
  props<{ modo: ModoCartas; nombrePartida: string }>()
);

// establecer la lista completa de cartas
export const establecerCartas = createAction(
  '[Cartas] Establecer Cartas',
  props<{ cartas: string[] }>()
);

// usuario selecciona una carta
export const seleccionarCarta = createAction(
  '[Cartas] Seleccionar Carta',
  props<{ nombreUsuario: string; carta: string }>()
);

// si no hay cartas se generan automáticamente
export const generarCartasSiNoExisten = createAction(
  '[Cartas] Generar Cartas Si No Existen',
  props<{ nombrePartida: string }>()
);

// revelar todas las cartas
export const revelarCartas = createAction('[Cartas] Revelar Cartas');

// mostrar resumen de votación
export const mostrarResumen = createAction('[Cartas] Mostrar Resumen');

// reiniciar todas las cartas (quitar selección)
export const reiniciarCartas = createAction(
  '[Cartas] Reiniciar Cartas',
  props<{ nombrePartida: string }>()
);

// reiniciar todo el estado de cartas
export const reiniciarEstado = createAction('[Cartas] Reiniciar Estado');

//oculktar resumen
export const ocultarResumen = createAction('[Cartas] Ocultar Resumen');

export const reiniciarCartasUsuarios = createAction(
  '[Usuarios] Reiniciar cartas de los jugadores',
  props<{ nombrePartida: string }>()
);
