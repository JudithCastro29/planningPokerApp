import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MensajeEmergenteService {
  private mensaje = signal('');
  private visible = signal(false);

  mensajeActual = computed(() => this.mensaje());
  estaVisible = computed(() => this.visible());

  mostrar(mensaje: string, duracion: number = 3000) {
    this.mensaje.set(mensaje);
    this.visible.set(true);

    setTimeout(() => {
      this.visible.set(false);
    }, duracion);
  }
}
