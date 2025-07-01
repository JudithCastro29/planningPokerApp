export type RolUsuario = 'jugador' | 'espectador' | 'propietario';
export type ModoUsuario = 'jugador' | 'espectador';

export interface UsuarioEnMesa {
  nombre: string;
  modo: ModoUsuario;
  rol: RolUsuario;
  partida: string;
  carta?: string;
}
