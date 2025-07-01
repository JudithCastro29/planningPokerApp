import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './components/pages/pantalla-principal/pantalla-principal.component'
      ).then((m) => m.PantallaPrincipal),
  },
  {
    path: 'crear-partida',
    loadComponent: () =>
      import(
        './components/pages/crear-partida-page/crear-partida-page.component'
      ).then((m) => m.CrearPartidaPageComponent),
  },
  {
    path: 'mesa-votacion/:nombrePartida',
    loadComponent: () =>
      import(
        './components/pages/mesa-votacion-page/mesa-votacion-page.component'
      ).then((m) => m.MesaVotacionPage),
  },
];
