import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimelineComponent } from './components/timeline/timeline.component';
import { EnvelopeComponent } from './components/envelope/envelope.component';
import { CardsComponent } from './components/cards/cards.component';
import { ScrollTextComponent } from './components/scroll-text/scroll-text.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TimelineComponent, EnvelopeComponent, CardsComponent, ScrollTextComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    // Aquí puedes agregar animaciones personalizadas si lo deseas
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'San Valetin - 28';
  isLoading = true; // Control del loader
  showContent = false; // Control de la carta y contenido principal
  ngOnInit(): void {
    // gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    // Simulación de carga (puedes usar una API real o lógica personalizada)
    setTimeout(() => {
      this.isLoading = false;
      this.animateCard();
    }, 3000); // Duración del loading
  }

  // Animación inicial de la carta
  animateCard(): void {
    gsap.from('.card', {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: 'power2.out',
    });
  }

  // Animación al hacer clic en la carta
  onCardClick(event: boolean): void {
    gsap.to('.card', {
      rotateY: 180,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        this.showContent = true; // Mostrar contenido principal
      },
    });
  }


}
