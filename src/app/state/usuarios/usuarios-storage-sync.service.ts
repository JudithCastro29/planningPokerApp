import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { actualizarUsuarios } from './usuario.actions';
import { UsuarioEnMesa } from '../../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuariosStorageSyncService {
  constructor(private store: Store<AppState>) {
    window.addEventListener('storage', (event) => {
      const partida = localStorage.getItem('nombre-partida') || '';
      const CLAVE_USUARIOS = `usuarios-mesa-${partida}`;

      if (event.key === CLAVE_USUARIOS) {
        const raw = event.newValue;
        if (!raw) return;

        try {
          const usuarios: UsuarioEnMesa[] = JSON.parse(raw);
          this.store.dispatch(actualizarUsuarios({ usuarios }));
        } catch (error) {
          console.error('Error al parsear usuarios del localStorage', error);
        }
      }
    });
  }
}
