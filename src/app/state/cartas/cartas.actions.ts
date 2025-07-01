import { createAction, props } from '@ngrx/store';
import { ModoCartas } from './cartas.state';

// 🧩 Establecer nombre de la partida asociada a las cartas
export const establecerNombrePartidaCartas = createAction(
  '[Cartas] Establecer Nombre Partida',
  props<{ nombre: string }>()
);

// 🎴 Establecer modo de las cartas (fibonacci, etc.)
export const establecerModoCartas = createAction(
  '[Cartas] Establecer Modo Cartas',
  props<{ modo: ModoCartas }>()
);

// 🃏 Establecer la lista completa de cartas
export const establecerCartas = createAction(
  '[Cartas] Establecer Cartas',
  props<{ cartas: string[] }>()
);

// 👉 Usuario selecciona una carta
export const seleccionarCarta = createAction(
  '[Cartas] Seleccionar Carta',
  props<{ nombreUsuario: string; carta: string }>()
);

// 🔄 Si no hay cartas, generarlas automáticamente
export const generarCartasSiNoExisten = createAction(
  '[Cartas] Generar Cartas Si No Existen',
  props<{ nombrePartida: string }>()
);

// 🕵️ Revelar todas las cartas
export const revelarCartas = createAction('[Cartas] Revelar Cartas');

// 📊 Mostrar resumen de votación
export const mostrarResumen = createAction('[Cartas] Mostrar Resumen');

// 🧹 Reiniciar todas las cartas (quitar selección)
export const reiniciarCartas = createAction('[Cartas] Reiniciar Cartas');

// 🔁 Reiniciar todo el estado de cartas
export const reiniciarEstado = createAction('[Cartas] Reiniciar Estado');
