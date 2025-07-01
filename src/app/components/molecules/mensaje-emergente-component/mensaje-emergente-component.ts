import { Component, inject, computed } from '@angular/core';
import { MensajeEmergenteService } from '../../../services/mensaje-emergente-service/mensaje-emergente-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mensaje-emergente-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './mensaje-emergente-component.html',
  styleUrl: './mensaje-emergente-component.css',
})
export class MensajeEmergenteComponent {
  private servicio = inject(MensajeEmergenteService);

  mensaje = computed(() => this.servicio.mensajeActual());
  visible = computed(() => this.servicio.estaVisible());
}
