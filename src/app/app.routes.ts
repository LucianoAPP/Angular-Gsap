import { Routes } from '@angular/router';
import { EnvelopeComponent } from './components/envelope/envelope.component';
import { TypingEffectComponent } from './components/typing/typing.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ScrollTextComponent } from './components/scroll-text/scroll-text.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CardsComponent } from './components/cards/cards.component';
import { FinalDecisionComponent } from './components/final-decision/final-decision.component';
import { CelebrationComponent } from './components/celebration/celebration.component';

export const routes: Routes = [
  { path: '', component: LoadingComponent },
  { path: 'envelope', component: EnvelopeComponent },
  { path: 'typing', component: TypingEffectComponent },
  { path: 'message', component: ScrollTextComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'final', component: FinalDecisionComponent },
  { path: 'celebration', component: CelebrationComponent },
  { path: '**', redirectTo: '' }
];
