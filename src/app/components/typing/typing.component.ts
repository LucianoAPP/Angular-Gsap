import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

class SVGElement {
  element: Element;

  constructor(element: Element) {
    this.element = element;
  }

  set(attributeName: string, value: string) {
    this.element.setAttribute(attributeName, value);
  }

  style(property: string, value: string) {
    (this.element as any).style[property] = value;
  }
}

@Component({
  selector: 'app-typing-effect',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss']
})
export class TypingEffectComponent implements AfterViewInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('svg') svgRef!: ElementRef;
  @ViewChild('text') textRef!: ElementRef;
  @ViewChild('offscreenText') offscreenTextRef!: ElementRef;
  @ViewChild('input') inputRef!: ElementRef;

  inputControl = new FormControl('');
  private svg!: SVGElement;
  private letters: any[] = [];
  private prompt: string[] = [
    'w', 'i', 'l', 'l', ' ', 
    'y', 'o', 'u', ' ', 
    'b', 'e', '\n',
    'm', 'y', ' ', '\n',
    'v', 'a', 'l', 'e', 'n', '\n',
    't', 'i', 'n', 'e', '?', '\n',
    ' '
  ];
  private runPrompt = true;
  private textSize = 0;
  private textCenter = 0;
  private width = window.innerWidth;
  private height = window.innerHeight;

  private colors = [
    { main: '#FF5D8F', shades: ['#FF87AB', '#FFB1C7', '#FF3373', '#E31B63'] }, // Rosa dulce
    { main: '#FF7E67', shades: ['#FFA08C', '#FFC2B4', '#FF5C42', '#E34F2F'] }, // Coral suave
    { main: '#FF69A6', shades: ['#FF94BF', '#FFBDD8', '#FF408D', '#E31B6D'] }, // Rosa algodón
    { main: '#FF8C94', shades: ['#FFB0B6', '#FFD4D8', '#FF6872', '#E35A63'] }, // Rosa melocotón
    { main: '#FF5E78', shades: ['#FF8A9D', '#FFB7C2', '#FF3253', '#E31B3B'] }, // Rosa sandía
    { main: '#FF9B9B', shades: ['#FFBDBD', '#FFDFDF', '#FF7979', '#E35E5E'] }, // Rosa durazno
    { main: '#FF6B91', shades: ['#FF97B3', '#FFC3D5', '#FF3F6F', '#E31B51'] }  // Rosa atardecer
  ];
  private audio!: HTMLAudioElement;

  constructor(private router: Router, private renderer: Renderer2) { 
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.previousNavigation === null) {
         this.router.navigate(['/']);
        }
  }

  ngAfterViewInit(): void {
    this.audio = this.audioPlayer.nativeElement;
    this.audio.volume = 0.5;
    this.audio.loop = true;
    
    // Intentar reproducir automáticamente
    setTimeout(() => {
      this.playAudio();
    }, 1000);

    this.svg = new SVGElement(this.svgRef.nativeElement);
    this.resizePage();
    window.addEventListener('resize', () => this.resizePage());
    this.inputControl.valueChanges.subscribe((value: any) => {
      this.onInputChange(value);
    });
    this.inputRef.nativeElement.focus();
    this.addPrompt(0);
  }

  private resizePage(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.svg.set('height', this.height.toString());
    this.svg.set('width', this.width.toString());
    this.svg.set('viewBox', `0 0 ${this.width} ${this.height}`);
    this.resizeLetters();
  }

  private resizeLetters(): void {
    const viewportWidth = window.innerWidth;
    
    // Ajustamos el tamaño del texto según el viewport
    if (viewportWidth <= 480) {
      this.textSize = viewportWidth / 10; // Más pequeño en móviles
    } else if (viewportWidth <= 768) {
      this.textSize = viewportWidth / 20; // Tamaño medio en tablets
    } else {
      this.textSize = viewportWidth / 40;
      if (this.textSize > 80) this.textSize = 80;
    }
    
    const text = this.textRef.nativeElement;
    const offscreenText = this.offscreenTextRef.nativeElement;
    
    this.renderer.setStyle(text, 'fontSize', `${this.textSize}px`);
    this.renderer.setStyle(text, 'minHeight', `${this.textSize * 4}px`); // Más espacio vertical
    this.renderer.setStyle(text, 'lineHeight', `${this.textSize * 1.5}px`);
    this.renderer.setStyle(offscreenText, 'fontSize', `${this.textSize}px`);
    this.renderer.setStyle(offscreenText, 'lineHeight', `${this.textSize * 1.5}px`);

    const textRect = text.getBoundingClientRect();
    this.textCenter = textRect.top + textRect.height / 2;
    this.positionLetters();
  }

  private positionLetters(): void {
    this.letters.forEach(letter => {
      const timing = letter.shift ? 0.1 : 0;
      if (letter.onScreen && letter.offScreen) {
        gsap.to(letter.onScreen, {
          x: letter.offScreen.offsetLeft + 'px',
          y: letter.offScreen.offsetTop + 'px', // Añadimos posicionamiento vertical
          duration: timing,
          ease: "power3.inOut"
        });
      }
      letter.shift = true;
    });
  }

  private animateLetterIn(letter: HTMLElement): void {
    const yOffset = (0.5 + Math.random() * 0.5) * this.textSize;
    gsap.fromTo(letter, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out" }
    );
    gsap.to(letter, { y: -yOffset, duration: 0.2, ease: "power3.inOut" });
    gsap.to(letter, { y: 0, duration: 0.2, ease: "power3.inOut", delay: 0.2 });
    
    const rotation = -50 + Math.random() * 100;
    gsap.to(letter, { rotation: rotation, duration: 0.2, ease: "power3.inOut" });
    gsap.to(letter, { rotation: 0, duration: 0.2, ease: "power3.inOut", delay: 0.2 });
  }

  private addDecor(letter: HTMLElement, color: any): void {
    setTimeout(() => {
      const rect = letter.getBoundingClientRect();
      const x0 = letter.offsetLeft + letter.offsetWidth / 2;
      const y0 = this.textCenter - this.textSize * 0.5;
      const shade = color.shades[Math.floor(Math.random() * 4)];
      for (let i = 0; i < 8; i++) this.addTri(x0, y0, shade);
      for (let i = 0; i < 8; i++) this.addCirc(x0, y0);
    }, 150);
  }

  private createSVG(type: string): SVGElement {
    const el = document.createElementNS('http://www.w3.org/2000/svg', type);
    return new SVGElement(el as unknown as Element);
  }

  private addTri(x0: number, y0: number, shade: string): void {
    const tri = this.createSVG('polygon');
    const a = Math.random();
    const a2 = a + (-0.2 + Math.random() * 0.4);
    const r = this.textSize * 0.52;
    const r2 = r + this.textSize * Math.random() * 0.2;
    const x = x0 + r * Math.cos(2 * Math.PI * a);
    const y = y0 + r * Math.sin(2 * Math.PI * a);
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a2);
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a2);
    const triSize = this.textSize * 0.1;
    const scale = 0.3 + Math.random() * 0.7;
    const offset = triSize * scale;
    
    tri.set('points', `0,0 ${triSize * 2},0 ${triSize},${triSize * 2}`);
    tri.style('fill', shade);
    (this.svg.element as any).appendChild(tri.element);
    
    gsap.fromTo(tri.element, 
      {
        rotation: Math.random() * 360,
        scale: scale,
        x: x - offset,
        y: y - offset,
        opacity: 1
      },
      {
        x: x2 - offset,
        y: y2 - offset,
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: () => {
          this.svg.element.removeChild(tri.element);
        }
      }
    );
  }

  private addCirc(x0: number, y0: number): void {
    const circ = this.createSVG('circle');
    const a = Math.random();
    const r = this.textSize * 0.52;
    const r2 = r + this.textSize;
    const x = x0 + r * Math.cos(2 * Math.PI * a);
    const y = y0 + r * Math.sin(2 * Math.PI * a);
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a);
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a);
    const circSize = this.textSize * 0.05 * Math.random();
    
    circ.set('r', circSize.toString());
    circ.style('fill', '#eee');
    (this.svg.element as any).appendChild(circ.element);
    
    gsap.fromTo(circ.element,
      {
        x: x - circSize,
        y: y - circSize,
        opacity: 1
      },
      {
        x: x2 - circSize,
        y: y2 - circSize,
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: () => {
          this.svg.element.removeChild(circ.element);
        }
      }
    );
  }

  private addLetter(char: string, i: number): void {
    const letter = this.renderer.createElement('span');
    const oLetter = this.renderer.createElement('span');
    
    if (char === '\n') {
      this.renderer.setProperty(letter, 'innerHTML', '<br>');
      this.renderer.setProperty(oLetter, 'innerHTML', '<br>');
    } else {
      this.renderer.setProperty(letter, 'innerHTML', char);
      this.renderer.setProperty(oLetter, 'innerHTML', char);
    }
    
    this.renderer.appendChild(this.textRef.nativeElement, letter);
    const color = this.colors[i % this.colors.length];
    if (char !== '\n') {
      this.renderer.setStyle(letter, 'color', color.main);
    }
    
    this.renderer.appendChild(this.offscreenTextRef.nativeElement, oLetter);
    this.letters[i] = { offScreen: oLetter, onScreen: letter, char: char };
    
    if (char !== '\n') {
      this.animateLetterIn(letter);
      this.addDecor(oLetter, color);
    }
  }

  private addLetters(value: string[]): void {
    value.forEach((char, i) => {
      if (this.letters[i] && this.letters[i].char !== char) {
        this.letters[i].onScreen.innerHTML = char;
        this.letters[i].offScreen.innerHTML = char;
        this.letters[i].char = char;
      }
      if (this.letters[i] === undefined) {
        this.addLetter(char, i);
      }
    });
  }

  private animateLetterOut(letter: any, i: number): void {
    gsap.to(letter.onScreen, {
      scale: 0,
      opacity: 0,
      duration: 0.1,
      ease: "power2.in",
      onComplete: () => {
        if (this.offscreenTextRef?.nativeElement && this.textRef?.nativeElement) {
          this.renderer.removeChild(this.offscreenTextRef.nativeElement, letter.offScreen);
          this.renderer.removeChild(this.textRef.nativeElement, letter.onScreen);
          this.positionLetters();
        }
      }
    });
    this.letters.splice(i, 1);
  }

  private removeLetters(value: string[]): void {
    for (let i = this.letters.length - 1; i >= 0; i--) {
      const letter = this.letters[i];
      if (value[i] === undefined) {
        this.animateLetterOut(letter, i);
      }
    }
  }

  private onInputChange(value: any): void {
    const valueArray = value.split('');
    this.addLetters(valueArray);
    this.removeLetters(valueArray);
    this.resizeLetters();
  }

  private addPrompt(i: number): void {
    setTimeout(() => {
      if (this.runPrompt && this.prompt[i]) {
        this.inputControl.setValue(this.inputControl.value + this.prompt[i]);
        this.addPrompt(i + 1);
      }
    }, 300);
  }

   playAudio(): void {
    if (this.audio) {
      // Forzar la carga del audio
      this.audio.load();
      
      // Intentar reproducir con manejo de promesa
      const playPromise = this.audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            console.log('Audio reproduciendo correctamente');
          })
          .catch(error => {
            console.log('Error reproduciendo audio:', error);
            // Intentar reproducir de nuevo después de la interacción del usuario
            document.addEventListener('click', () => {
              this.audio.play();
            }, { once: true });
          });
      }
    }
  }

  // Método para detener el audio cuando el componente se destruye
  ngOnDestroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}