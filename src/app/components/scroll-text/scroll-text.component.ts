import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-scroll-text',
  standalone: true,
  imports: [],
  templateUrl: './scroll-text.component.html',
  styleUrl: './scroll-text.component.scss'
})
export class ScrollTextComponent implements AfterViewInit {

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    const letters = gsap.utils.toArray<HTMLElement>('.letter'); // Seleccionamos las letras individuales

    gsap.fromTo(
      letters,
      {
        x: (i) => (i % 2 === 0 ? -100 : 100), // Alterna entre desplazamiento a la izquierda y derecha
        opacity: 0,
      },
      {
        x: 0, // Se mueven hacia su posición original
        opacity: 1, // Se hacen visibles
        duration: 1,
        stagger: 0.05, // Retraso entre letras
        scrollTrigger: {
          trigger: '.text-container', // El contenedor principal
          start: 'top 80%', // Inicia cuando el contenedor entra en la vista
          end: 'top 30%', // Termina a medida que avanza el scroll
          scrub: true, // Sincronización suave con el scroll
        },
      }
    );
  }
}
