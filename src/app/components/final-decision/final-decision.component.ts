import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-final-decision',
  template: `
    <div class="decision-container">
      <h2>¿Quieres ser mi San Valentín?</h2>
      <div class="buttons">
        <button (click)="onYes()" class="yes-btn">¡Sí!</button>
        <button #noBtn (mouseenter)="moveButton($event)" class="no-btn">No</button>
      </div>
    </div>
  `
})
export class FinalDecisionComponent {
  constructor(private router: Router) {}

  onYes(): void {
    this.router.navigate(['/celebration']);
  }

  // Botón "No" que se mueve cuando el mouse se acerca
  moveButton(event: MouseEvent): void {
    const btn = event.target as HTMLElement;
    btn.style.position = 'absolute';
    btn.style.left = `${Math.random() * 80}%`;
    btn.style.top = `${Math.random() * 80}%`;
  }
} 