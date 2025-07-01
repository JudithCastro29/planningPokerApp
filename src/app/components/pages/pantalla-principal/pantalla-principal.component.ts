import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common'; // ✅ necesario para standalone

@Component({
  selector: 'app-pantalla-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css'],
})
export class PantallaPrincipal {
  constructor(private router: Router) {}

  ngOnInit(): void {
    timer(3000).subscribe(() => {
      this.router.navigate(['/crear-partida']);
    });
  }
}
