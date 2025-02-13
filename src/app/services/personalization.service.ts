import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PersonalizationService {
  private details = {
    name: 'Nombre',
    specialDates: ['Primera vez que...', 'Cuando fuimos a...'],
    favoriteMemories: ['...'],
    insideJokes: ['...'],
    specialSongs: ['...']
  };
} 