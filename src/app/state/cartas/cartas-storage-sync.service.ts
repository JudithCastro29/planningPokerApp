import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import {
  establecerCartas,
  revelarCartas,
  mostrarResumen,
} from './cartas.actions';

@Injectable({ providedIn: 'root' })
export class CartasStorageSyncService {
  constructor(private store: Store<AppState>) {
    window.addEventListener('storage', this.sincronizarDesdeStorage.bind(this));
  }

  sincronizarDesdeStorage(event: StorageEvent) {
    const partida = localStorage.getItem('nombre-partida') || '';
    if (!partida) return;

    // 🔁 Sincronizar cartas disponibles
    if (event.key === `cartas-${partida}` && event.newValue) {
      try {
        const cartas = JSON.parse(event.newValue);
        if (Array.isArray(cartas)) {
          this.store.dispatch(establecerCartas({ cartas }));
        }
      } catch (e) {
        console.error('Error al sincronizar cartas:', e);
      }
    }

    // 🔁 Sincronizar estado de cartas reveladas
    if (
      event.key === `cartas-reveladas-${partida}` &&
      event.newValue === 'true'
    ) {
      this.store.dispatch(revelarCartas());
    }

    // 🔁 Sincronizar visibilidad del resumen
    if (
      event.key === `resumen-visible-${partida}` &&
      event.newValue === 'true'
    ) {
      this.store.dispatch(mostrarResumen());
    }
  }
}
