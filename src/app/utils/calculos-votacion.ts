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

export function calcularResumenVotacion(
  usuarios: UsuarioEnMesa[],
  modoCartas: 'numeros' | 'letras'
): string {
  const jugadores = usuarios.filter((u) => u.modo === 'jugador' && u.carta);

  if (modoCartas === 'letras') {
    const frecuencia: Record<string, number> = {};
    for (const u of jugadores) {
      const carta = u.carta!;
      frecuencia[carta] = (frecuencia[carta] || 0) + 1;
    }

    const masVotada = Object.entries(frecuencia).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    return masVotada ?? '-';
  } else {
    const valores = jugadores
      .map((u) => Number(u.carta))
      .filter((n) => !isNaN(n));
    if (valores.length === 0) return '-';
    const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
    return promedio.toFixed(1);
  }
}
