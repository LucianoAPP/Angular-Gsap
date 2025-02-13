import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
  song?: {
    title: string;
    url: string;
  };
}

const events: TimelineEvent[] = [
  {
    date: 'Cuando nos conocimos',
    title: 'Primer encuentro',
    description: '...',
    song: {
      title: 'Nuestra canción',
      url: 'spotify:track:xxx'
    }
  },
  // Más eventos especiales...
];

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    gsap.utils.toArray('.timeline-item').forEach((item: any) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    });
  }
}
