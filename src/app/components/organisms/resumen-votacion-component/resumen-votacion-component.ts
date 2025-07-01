import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-resumen-votacion-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './resumen-votacion-component.html',
  styleUrl: './resumen-votacion-component.css',
})
export class ResumenVotacionComponent {
  @Input() votos: Record<string, number> = {};
  @Input() promedio!: string | number;

  cartasOrdenadas(): string[] {
    return Object.keys(this.votos).sort((a, b) => Number(a) - Number(b));
  }
}
