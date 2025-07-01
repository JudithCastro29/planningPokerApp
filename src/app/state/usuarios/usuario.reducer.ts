import { createReducer, on } from '@ngrx/store';
import { initialUsuariosState } from './usuario.state';
import {
  agregarUsuario,
  actualizarCarta,
  actualizarModo,
  reiniciarCartas,
  delegarPropietario,
  actualizarUsuarios,
  reiniciarUsuarios,
  reiniciarCartasUsuarios,
} from './usuario.actions';
import { UsuarioEnMesa, RolUsuario } from '../../models/usuario.model';

function getClaveUsuarios(partida: string) {
  return `usuarios-mesa-${partida}`;
}
const CLAVE_USUARIO_ACTUAL = 'usuario';

function guardarUsuarios(usuarios: UsuarioEnMesa[], partida: string) {
  localStorage.setItem(getClaveUsuarios(partida), JSON.stringify(usuarios));
}

function guardarUsuarioActual(usuario: UsuarioEnMesa) {
  localStorage.setItem(CLAVE_USUARIO_ACTUAL, JSON.stringify(usuario));
}

function limpiarUsuarios(partida: string) {
  localStorage.removeItem(getClaveUsuarios(partida));
}

function limpiarUsuarioActual() {
  localStorage.removeItem(CLAVE_USUARIO_ACTUAL);
}

export const usuarioReducer = createReducer(
  initialUsuariosState,

  on(agregarUsuario, (state, { usuario }) => {
    const enPartida = state.usuarios.filter(
      (u) => u.partida === usuario.partida
    );
    const tienePropietario = enPartida.some((u) => u.rol === 'propietario');

    // ✅ Forzar tipo literal para 'rol'
    const rol: RolUsuario = !tienePropietario
      ? 'propietario'
      : usuario.rol === 'propietario'
      ? 'propietario'
      : 'jugador';

    const usuarioFinal: UsuarioEnMesa = {
      ...usuario,
      rol,
    };

    const actualizados = [...state.usuarios, usuarioFinal];
    guardarUsuarios(actualizados, usuario.partida);
    guardarUsuarioActual(usuarioFinal);

    return {
      usuarios: actualizados,
      usuarioActual: usuarioFinal,
    };
  }),

  on(actualizarCarta, (state, { nombre, carta }) => {
    const actualizados = state.usuarios.map((u) =>
      u.nombre === nombre ? { ...u, carta } : u
    );
    const usuarioActualizado =
      actualizados.find((u) => u.nombre === nombre) ?? null;
    const nuevoUsuarioActual =
      usuarioActualizado?.nombre === state.usuarioActual?.nombre
        ? usuarioActualizado
        : state.usuarioActual ?? null;

    if (nuevoUsuarioActual) guardarUsuarioActual(nuevoUsuarioActual);
    if (nuevoUsuarioActual?.partida)
      guardarUsuarios(actualizados, nuevoUsuarioActual.partida);

    return {
      ...state,
      usuarios: actualizados,
      usuarioActual: nuevoUsuarioActual,
    };
  }),

  on(actualizarModo, (state, { nombre, modo }) => {
    const actualizados = state.usuarios.map((u) =>
      u.nombre === nombre ? { ...u, modo } : u
    );
    const usuarioActualizado =
      actualizados.find((u) => u.nombre === nombre) ?? null;
    const nuevoUsuarioActual =
      usuarioActualizado?.nombre === state.usuarioActual?.nombre
        ? usuarioActualizado
        : state.usuarioActual ?? null;

    if (nuevoUsuarioActual) guardarUsuarioActual(nuevoUsuarioActual);
    if (nuevoUsuarioActual?.partida)
      guardarUsuarios(actualizados, nuevoUsuarioActual.partida);

    return {
      ...state,
      usuarios: actualizados,
      usuarioActual: nuevoUsuarioActual,
    };
  }),

  on(reiniciarCartas, (state) => {
    const actualizados = state.usuarios.map((u) => ({ ...u, carta: '' }));
    const nuevoUsuarioActual = state.usuarioActual
      ? { ...state.usuarioActual, carta: '' }
      : null;

    if (nuevoUsuarioActual) guardarUsuarioActual(nuevoUsuarioActual);
    if (nuevoUsuarioActual?.partida)
      guardarUsuarios(actualizados, nuevoUsuarioActual.partida);

    return {
      ...state,
      usuarios: actualizados,
      usuarioActual: nuevoUsuarioActual,
    };
  }),

  on(delegarPropietario, (state, { actual, nuevo }) => {
    const actualizados = state.usuarios.map((u) => {
      if (u.nombre === actual) return { ...u, rol: 'jugador' as const }; // ✅
      if (u.nombre === nuevo) return { ...u, rol: 'propietario' as const }; // ✅
      return u;
    });

    let nuevoUsuarioActual = state.usuarioActual ?? null;
    if (nuevoUsuarioActual?.nombre === actual) {
      nuevoUsuarioActual = { ...nuevoUsuarioActual, rol: 'jugador' as const }; // ✅
    } else if (nuevoUsuarioActual?.nombre === nuevo) {
      nuevoUsuarioActual = {
        ...nuevoUsuarioActual,
        rol: 'propietario' as const,
      }; // ✅
    }

    if (nuevoUsuarioActual) guardarUsuarioActual(nuevoUsuarioActual);
    if (nuevoUsuarioActual?.partida)
      guardarUsuarios(actualizados, nuevoUsuarioActual.partida);

    return {
      ...state,
      usuarios: actualizados,
      usuarioActual: nuevoUsuarioActual,
    };
  }),

  on(actualizarUsuarios, (state, { usuarios }) => {
    const partida = localStorage.getItem('nombre-partida') || '';
    guardarUsuarios(usuarios, partida);

    const usuarioActualEncontrado =
      usuarios.find((u) => u.nombre === state.usuarioActual?.nombre) ?? null;

    if (usuarioActualEncontrado) guardarUsuarioActual(usuarioActualEncontrado);

    return {
      ...state,
      usuarios,
      usuarioActual: usuarioActualEncontrado,
    };
  }),

  on(reiniciarCartasUsuarios, (state, { nombrePartida }) => {
    const usuariosActualizados = state.usuarios.map((u) =>
      u.partida === nombrePartida ? { ...u, carta: '' } : u
    );

    const usuarioActualActualizado =
      state.usuarioActual?.partida === nombrePartida
        ? { ...state.usuarioActual, carta: '' }
        : state.usuarioActual;

    guardarUsuarios(usuariosActualizados, nombrePartida);
    if (usuarioActualActualizado)
      guardarUsuarioActual(usuarioActualActualizado);

    return {
      ...state,
      usuarios: usuariosActualizados,
      usuarioActual: usuarioActualActualizado,
    };
  }),

  on(reiniciarUsuarios, () => {
    const partida = localStorage.getItem('nombre-partida') || '';
    limpiarUsuarios(partida);
    limpiarUsuarioActual();

    return {
      usuarios: [],
      usuarioActual: null,
    };
  })
);
