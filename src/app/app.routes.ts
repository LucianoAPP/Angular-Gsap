import { Routes } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { TypingEffectComponent } from './components/typing/typing.component';
import { EnvelopeComponent } from './components/envelope/envelope.component';
import { FinalDecisionComponent } from './components/final-decision/final-decision.component';
import { CelebrationComponent } from './components/celebration/celebration.component';

export const routes: Routes = [
  { path: '', component: LoadingComponent },
  { path: 'typing', component: TypingEffectComponent },
  { path: 'envelope', component: EnvelopeComponent },
  { path: 'decision', component: FinalDecisionComponent },
  { path: 'celebration', component: CelebrationComponent },
  { path: '**', redirectTo: '' }
];
