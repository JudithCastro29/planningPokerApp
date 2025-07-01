import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { establecerNombrePartida } from './partida.actions';

@Injectable({ providedIn: 'root' })
export class PartidaStorageSyncService {
  constructor(private store: Store<AppState>) {
    window.addEventListener('storage', this.sincronizarDesdeStorage.bind(this));
  }

  sincronizarDesdeStorage(event: StorageEvent) {
    if (event.key === 'nombre-partida') {
      const nuevoNombre = event.newValue || '';
      this.store.dispatch(establecerNombrePartida({ nombre: nuevoNombre }));
    }
  }
}
