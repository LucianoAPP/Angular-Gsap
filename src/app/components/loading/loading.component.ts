import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  count = 0;
  percentWidth = 0;
  heartLeft = -3.2;
  progressInterval: any;
  showButton = false;
  buttonScaled = false;
  textBoxScaled = false;
  textBoxHidden = false;
  percentComplete = false;
  cursorVisible = false;
  currentMessage: string = '';
  private messages: string[] = [
    "Loading all my love for you... 💝",
    "Collecting special moments... 💫", 
    "Preparing a surprise with love... 🎁",
    "Counting my heartbeats... 💓",
    "Measuring the infinity of my love... ∞",
    "Sending a thousand virtual kisses... 😘",
    "Creating memories together... 📷",
    "Calculating our happiness... ✨",
    "Processing digital hugs... 🤗",
    "Generating smiles for you... 😊"
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.startProgress();
    this.updateLoadingMessage();
  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  startProgress() {
    this.progressInterval = setInterval(() => {
      if (this.count === 100 && this.percentWidth === 100) {
        this.completeLoading();
      } else {
        this.updateProgress();
      }
    }, 100);
  }

  private completeLoading() {
    clearInterval(this.progressInterval);
    this.percentComplete = true;
    this.animateCompletion();
  }

  private updateProgress() {
    if (this.count === 10) {
      this.animateHeart(1);
    }
    if (this.count === 60) {
      this.animateHeart(2);
    }
    this.count += 1;
    this.percentWidth += 1;
    this.heartLeft += 0.968;
  }

  private animateCompletion() {
    this.animateHeart(3);
    
    setTimeout(() => this.textBoxScaled = true, 200);
    setTimeout(() => this.textBoxHidden = true, 400);
    
    setTimeout(() => {
      this.router.navigate(['/envelope']);
    }, 1000);
  }

  private animateHeart(itemNumber: number) {
    const heartItem = document.querySelector(`.heartItem.item${itemNumber}`);
    if (heartItem) {
      heartItem.setAttribute('style', 'animation: 1s heartScale forwards');
    }
  }

  private updateLoadingMessage() {
    const updateMessage = () => {
      if (this.count < 100) {
        this.currentMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
      }
    };
    
    updateMessage();
    setInterval(updateMessage, 2000); // Cambiar mensaje cada 2 segundos
  }
}