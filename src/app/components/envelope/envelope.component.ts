import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CardsComponent } from '../cards/cards.component';
import { ScrollTextComponent } from '../scroll-text/scroll-text.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { TypingEffectComponent } from '../typing/typing.component';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CardsComponent, ScrollTextComponent, TimelineComponent, TypingEffectComponent],
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent {
  isOpen = false; // Estado del sobre
  @Output() outputOpen = new EventEmitter<boolean>();

  constructor(private router: Router) {
    // Opcional: Verificar si viene del loading
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.previousNavigation === null) {
      // Si no viene de ninguna navegación previa, redirigir al loading
      this.router.navigate(['/']);
    }
  }

  // Método para abrir el sobre
  openEnvelope(): void {
    this.isOpen = true;
    setTimeout(() => {
      this.outputOpen.emit(true)
      this.router.navigate(['/typing']);
    }, 5000);
  }

  // Método para cerrar el sobre
  resetEnvelope(): void {
    this.isOpen = false;
  }
}
