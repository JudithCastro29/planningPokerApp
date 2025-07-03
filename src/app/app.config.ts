import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appReducer } from './state/app.reducers';
import { CartasEffects } from './state/cartas/cartas.effects';
import { UsuariosEffects } from './state/usuarios/usuarios.effects';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appReducer),
    provideAnimations(),

    provideEffects(CartasEffects, UsuariosEffects),
  ],
};
