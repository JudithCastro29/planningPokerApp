export interface PartidaState {
  nombre: string;
}

export const initialPartidaState: PartidaState = {
  nombre: localStorage.getItem('nombre-partida') || '',
};
