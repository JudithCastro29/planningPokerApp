import { UsuarioEnMesa } from '../../models/usuario.model';

const partida = localStorage.getItem('nombre-partida') || '';
const CLAVE_USUARIOS = `usuarios-mesa-${partida}`;
const CLAVE_USUARIO_ACTUAL = 'usuario';

export interface UsuariosState {
  usuarios: UsuarioEnMesa[];
  usuarioActual: UsuarioEnMesa | null;
}

export const initialUsuariosState: UsuariosState = {
  usuarios: JSON.parse(localStorage.getItem(CLAVE_USUARIOS) || '[]'),
  usuarioActual: JSON.parse(
    localStorage.getItem(CLAVE_USUARIO_ACTUAL) || 'null'
  ),
};
