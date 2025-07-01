import { UsuarioEnMesa } from '../models/usuario.model';
export function calcularPromedioVotacion(
  usuarios: UsuarioEnMesa[]
): number | null {
  const jugadores = usuarios.filter(
    (u) => u.modo === 'jugador' && u.carta && !isNaN(Number(u.carta))
  );
  const valores = jugadores.map((u) => Number(u.carta));
  if (valores.length === 0) return null;
  const suma = valores.reduce((acc, val) => acc + val, 0);
  return +(suma / valores.length).toFixed(2);
}
export function contarVotosPorCarta(
  usuarios: UsuarioEnMesa[]
): Record<string, number> {
  const votos: Record<string, number> = {};
  for (const u of usuarios) {
    if (u.modo === 'jugador' && u.carta) {
      votos[u.carta] = (votos[u.carta] || 0) + 1;
    }
  }
  return votos;
}
