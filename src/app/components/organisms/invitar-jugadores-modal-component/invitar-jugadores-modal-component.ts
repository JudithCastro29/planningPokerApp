import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDarkComponent } from '../../atoms/button-dark/button-dark.component';
@Component({
  selector: 'app-invitar-jugadores-modal-component',
  standalone: true,
  imports: [CommonModule, ButtonDarkComponent],
  templateUrl: './invitar-jugadores-modal-component.html',
  styleUrl: './invitar-jugadores-modal-component.css',
})
export class InvitarJugadoresModalComponent {
  @Input() partida = '';
  @Output() cerrar = new EventEmitter<void>();

  copiarEnlace(): void {
    const url = `${window.location.origin}/mesa-votacion/${this.partida}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Enlace copiado al portapapeles!');
    });
  }
  cerrarModal(): void {
    this.cerrar.emit();
  }
  obtenerLink(): string {
    return `${window.location.origin}/mesa-votacion/${this.partida}`;
  }
}
