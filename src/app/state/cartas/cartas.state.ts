export type ModoCartas = 'numeros' | 'letras';

export interface CartasState {
  cartas: string[];
  modoCartas: ModoCartas;
  cartasReveladas: boolean;
  resumenVisible: boolean;
  nombrePartida: string;
}

export const initialCartasState: CartasState = {
  cartas: [],
  modoCartas: 'numeros',
  cartasReveladas: false,
  resumenVisible: false,
  nombrePartida: '',
};
