import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { UsuarioEnMesa } from '../../models/usuario.model';
export const selectUsuariosState = (state: AppState) => state.usuarios;

// 🔄 Devuelve todos los usuarios sin filtrar
export const selectTodosLosUsuarios = createSelector(
  selectUsuariosState,
  (state) => state.usuarios
);

// ✅ Devuelve los usuarios de una partida específica

export const selectUsuariosEnPartidaPorNombre = (nombrePartida: string) =>
  createSelector(selectUsuariosState, (state): UsuarioEnMesa[] =>
    state.usuarios.filter((u: UsuarioEnMesa) => u.partida === nombrePartida)
  );

// ✅ Devuelve el usuario actual
export const selectUsuarioActual = createSelector(
  selectUsuariosState,
  (state) => state.usuarioActual
);

// ✅ Devuelve un usuario por nombre dentro de una partida específica
export const selectUsuarioPorNombre = (nombre: string, partida: string) =>
  createSelector(selectUsuariosState, (state) =>
    state.usuarios.find((u) => u.nombre === nombre && u.partida === partida)
  );
