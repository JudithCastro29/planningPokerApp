export function calcularEstiloJugadorRectangular(
  index: number,
  total: number,
  nombreJugador: string,
  esPropietario: boolean,
  jugadores: { nombre: string; rol: string }[]
): { [key: string]: string } {
  const posicionesFijas = [
    // ARRIBA
    { top: '-50px', left: '50%', transform: 'translate(-50%, -100%)' }, // 0
    { top: '-50px', left: '20%', transform: 'translate(-50%, -100%)' }, // 1
    { top: '-50px', left: '80%', transform: 'translate(-50%, -100%)' }, // 2

    // DERECHA
    {
      top: '50%',
      left: 'calc(100% + 150px)',
      transform: 'translate(-100%, -50%)',
    }, // 3

    // ABAJO derecha
    { top: 'calc(100% + 50px)', left: '80%', transform: 'translate(-50%, 0%)' }, // 4

    // CENTRO ABAJO → propietario
    { top: 'calc(100% + 50px)', left: '50%', transform: 'translate(-50%, 0%)' }, // 5

    // ABAJO izquierda
    { top: 'calc(100% + 50px)', left: '20%', transform: 'translate(-50%, 0%)' }, // 6

    // IZQUIERDA
    { top: '50%', left: '-150px', transform: 'translate(0%, -50%)' }, // 7
  ];

  if (esPropietario) {
    return {
      position: 'absolute',
      ...posicionesFijas[5],
    };
  }

  const jugadoresSinPropietario = jugadores.filter(
    (j) => j.rol !== 'propietario'
  );

  const indexSinPropietario = jugadoresSinPropietario.findIndex(
    (j) => j.nombre === nombreJugador
  );

  const indexFinal =
    indexSinPropietario >= 5 ? indexSinPropietario + 1 : indexSinPropietario;

  if (indexFinal >= posicionesFijas.length) {
    return {
      position: 'absolute',
      top: '0%',
      left: '100%',
      transform: 'translate(-50%, -50%)',
    };
  }

  return {
    position: 'absolute',
    ...posicionesFijas[indexFinal],
  };
}
