import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-boton-admin-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-admin-component.html',
  styleUrl: './boton-admin-component.css',
})
export class BotonAdminComponent {
  @Input() disabled = false;
}
