import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuariosStorageSyncService } from './state/usuarios/usuarios-storage-sync.service';
import { CartasStorageSyncService } from './state/cartas/cartas-storage-sync.service';
import { PartidaStorageSyncService } from './state/partida/partida-storage-sync.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'planningpoker.app';
  constructor(
    private usuariosSync: UsuariosStorageSyncService,
    private cartasSync: CartasStorageSyncService,
    private partidaSync: PartidaStorageSyncService
  ) {}
}
