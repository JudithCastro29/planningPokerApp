import { createAction, props } from '@ngrx/store';
import { UsuarioEnMesa } from '../../models/usuario.model';

export const agregarUsuario = createAction(
  '[Usuarios] Agregar Usuario',
  props<{ usuario: UsuarioEnMesa }>()
);

export const actualizarCarta = createAction(
  '[Usuarios] Actualizar Carta',
  props<{ nombre: string; carta: string }>()
);

export const actualizarModo = createAction(
  '[Usuarios] Actualizar Modo',
  props<{ nombre: string; modo: 'jugador' | 'espectador' }>()
);

export const reiniciarCartas = createAction('[Usuarios] Reiniciar Cartas');

export const delegarPropietario = createAction(
  '[Usuarios] Delegar Propietario',
  props<{ actual: string; nuevo: string }>()
);

export const actualizarUsuarios = createAction(
  '[Usuarios] Actualizar Usuarios',
  props<{ usuarios: UsuarioEnMesa[] }>()
);

export const reiniciarUsuarios = createAction('[Usuarios] Reiniciar Usuarios');

export const setModoCartas = createAction(
  '[Cartas] Set Modo Cartas',
  props<{ modo: 'numeros' | 'letras' }>()
);

export const reiniciarCartasUsuarios = createAction(
  '[Usuarios] Reiniciar cartas de los jugadores',
  props<{ nombrePartida: string }>()
);

export const eliminarUsuario = createAction(
  '[Usuario] Eliminar Usuario',
  props<{ nombre: string; partida: string }>()
);
