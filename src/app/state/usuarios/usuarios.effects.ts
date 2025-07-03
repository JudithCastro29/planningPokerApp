import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import {
  agregarUsuario,
  actualizarCarta,
  actualizarModo,
  actualizarUsuarios,
  delegarPropietario,
  reiniciarCartas,
} from './usuario.actions';
import { UsuarioEnMesa } from '../../models/usuario.model';

@Injectable()
export class UsuariosEffects {
  guardarUsuario$;
  guardarUsuariosLista$;
  actualizarCartaUsuario$;
  actualizarModoUsuario$;
  delegarPropietario$;
  reiniciarCartas$;

  constructor(private actions$: Actions) {
    // guardar usuario actual en localStorage
    this.guardarUsuario$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(agregarUsuario),
          tap(({ usuario }) => {
            localStorage.setItem('usuario', JSON.stringify(usuario));
          })
        ),
      { dispatch: false }
    );

    // guardar lista de usuarios en localStorage
    this.guardarUsuariosLista$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(actualizarUsuarios),
          tap(({ usuarios }) => {
            localStorage.setItem('usuarios-mesa', JSON.stringify(usuarios));
          })
        ),
      { dispatch: false }
    );

    // actualizar carta del usuario actual en localStorage
    this.actualizarCartaUsuario$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(actualizarCarta),
          tap(({ nombre, carta }) => {
            const raw = localStorage.getItem('usuario');
            if (raw) {
              const actual: UsuarioEnMesa = JSON.parse(raw);
              if (actual.nombre === nombre) {
                const actualizado = { ...actual, carta };
                localStorage.setItem('usuario', JSON.stringify(actualizado));
              }
            }
          })
        ),
      { dispatch: false }
    );

    // actualizar modo del usuario actual en localStorage
    this.actualizarModoUsuario$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(actualizarModo),
          tap(({ nombre, modo }) => {
            const raw = localStorage.getItem('usuario');
            if (raw) {
              const actual: UsuarioEnMesa = JSON.parse(raw);
              if (actual.nombre === nombre) {
                const actualizado = { ...actual, modo };
                localStorage.setItem('usuario', JSON.stringify(actualizado));
              }
            }
          })
        ),
      { dispatch: false }
    );

    // delegar propietario: actualiza lista y usuario actual en localStorage
    this.delegarPropietario$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(delegarPropietario),
          tap(({ actual, nuevo }) => {
            const rawUsuarios = localStorage.getItem('usuarios-mesa');
            if (rawUsuarios) {
              const usuarios: UsuarioEnMesa[] = JSON.parse(rawUsuarios);
              const actualIndex = usuarios.findIndex(
                (u) => u.nombre === actual
              );
              const nuevoIndex = usuarios.findIndex((u) => u.nombre === nuevo);
              if (actualIndex >= 0) usuarios[actualIndex].rol = 'jugador';
              if (nuevoIndex >= 0) usuarios[nuevoIndex].rol = 'propietario';
              localStorage.setItem('usuarios-mesa', JSON.stringify(usuarios));
            }

            const rawUsuarioActual = localStorage.getItem('usuario');
            if (rawUsuarioActual) {
              const actualUsuario: UsuarioEnMesa = JSON.parse(rawUsuarioActual);
              if (actualUsuario.nombre === actual) {
                actualUsuario.rol = 'jugador';
                localStorage.setItem('usuario', JSON.stringify(actualUsuario));
              }
              if (actualUsuario.nombre === nuevo) {
                actualUsuario.rol = 'propietario';
                localStorage.setItem('usuario', JSON.stringify(actualUsuario));
              }
            }
          })
        ),
      { dispatch: false }
    );

    // reiniciar cartas limpia la carta de cada jugador
    this.reiniciarCartas$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(reiniciarCartas),
          tap(() => {
            const raw = localStorage.getItem('usuarios-mesa');
            if (raw) {
              const usuarios: UsuarioEnMesa[] = JSON.parse(raw);
              const actualizados = usuarios.map((u) => ({ ...u, carta: '' }));
              localStorage.setItem(
                'usuarios-mesa',
                JSON.stringify(actualizados)
              );
            }

            const rawActual = localStorage.getItem('usuario');
            if (rawActual) {
              const usuarioActual: UsuarioEnMesa = JSON.parse(rawActual);
              usuarioActual.carta = '';
              localStorage.setItem('usuario', JSON.stringify(usuarioActual));
            }
          })
        ),
      { dispatch: false }
    );
  }
}
