import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  generarCartasSiNoExisten,
  establecerCartas,
  reiniciarCartas,
} from './cartas.actions';
import { AppState } from '../app.reducers';

@Injectable()
export class CartasEffects {
  generarCartasSiNoExisten$;
  reiniciarCartas$;

  constructor(private actions$: Actions, private store: Store<AppState>) {
    console.log('CartasEffects inicializado');

    this.generarCartasSiNoExisten$ = createEffect(() =>
      this._generarCartasSiNoExisten()
    );
    this.reiniciarCartas$ = createEffect(() => this._reiniciarCartas());
  }

  private _generarCartasSiNoExisten() {
    return this.actions$.pipe(
      ofType(generarCartasSiNoExisten),
      map(({ nombrePartida }) => {
        const clave = `cartas-${nombrePartida}`;
        const cartasLocal = localStorage.getItem(clave);

        let cartas: string[];
        if (!cartasLocal) {
          cartas = this.generarCartasAleatorias();
          localStorage.setItem(clave, JSON.stringify(cartas));
        } else {
          cartas = JSON.parse(cartasLocal);
        }

        return establecerCartas({ cartas });
      })
    );
  }

  private _reiniciarCartas() {
    return this.actions$.pipe(
      ofType(reiniciarCartas),
      map(() => {
        const nombrePartida = localStorage.getItem('nombre-partida') || '';
        const clave = `cartas-${nombrePartida}`;
        const nuevasCartas = this.generarCartasAleatorias();

        localStorage.setItem(clave, JSON.stringify(nuevasCartas));
        localStorage.removeItem(`cartas-reveladas-${nombrePartida}`);
        localStorage.removeItem(`resumen-visible-${nombrePartida}`);

        return establecerCartas({ cartas: nuevasCartas });
      })
    );
  }

  private generarCartasAleatorias(): string[] {
    const set = new Set<number>();
    while (set.size < 10) {
      set.add(Math.floor(Math.random() * 99) + 1);
    }
    return Array.from(set).map((n) => n.toString());
  }
}
