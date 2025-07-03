export function calcularEstiloJugadorRectangular(
  index: number,
  total: number,
  nombreJugador: string,
  esPropietario: boolean
): { [key: string]: string } {
  const posicionesFijas = [
    // ARRIBA
    { top: '-50px', left: '15%', transform: 'translate(-50%, -100%)' },
    { top: '-50px', left: '50%', transform: 'translate(-50%, -100%)' },
    { top: '-50px', left: '85%', transform: 'translate(-50%, -100%)' },

    // DERECHA
    {
      top: '50%',
      left: 'calc(100% + 150px)',
      transform: 'translate(-100%, -50%)',
    },

    // ABAJO derecha
    { top: 'calc(100% + 50px)', left: '85%', transform: 'translate(-50%, 0%)' },

    // CENTRO ABAJO → propietario
    { top: 'calc(100% + 50px)', left: '50%', transform: 'translate(-50%, 0%)' },

    // ABAJO izquierda
    { top: 'calc(100% + 50px)', left: '15%', transform: 'translate(-50%, 0%)' },

    // IZQUIERDA
    { top: '50%', left: '-150px', transform: 'translate(0%, -50%)' },
  ];

  const indexFinal = esPropietario ? 5 : index >= 5 ? index + 1 : index;

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
