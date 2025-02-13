import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements AfterViewInit {

  constructor(){
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    const cardsContainer = document.getElementById('cardsContainer');
    const cards = gsap.utils.toArray('.card');

    // Animación de desplazamiento horizontal
    gsap.to(cardsContainer, {
      x: () => -(cardsContainer!.clientWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '#cardsWrapper',
        start: 'top top',
        end: () => `+=${cardsContainer!.clientWidth}`,
        pin: true,
        scrub: 0.5,
        snap: 1 / (cards.length - 1),
        invalidateOnRefresh: true,
      },
    });
  }

}
