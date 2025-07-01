import { ActionReducerMap } from '@ngrx/store';
import { UsuariosState } from './usuarios/usuario.state';
import { usuarioReducer } from './usuarios/usuario.reducer';
import { partidaReducer } from './partida/partida.reducer';
import { PartidaState } from './partida/partida.state';
import { cartasReducer } from './cartas/cartas.reducer';
import { CartasState } from './cartas/cartas.state';

export interface AppState {
  usuarios: UsuariosState;
  partida: PartidaState;
  cartas: CartasState;
}

export const appReducer: ActionReducerMap<AppState> = {
  usuarios: usuarioReducer,
  partida: partidaReducer,
  cartas: cartasReducer,
};
