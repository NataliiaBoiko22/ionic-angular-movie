import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenreSelectionService {

  constructor() { }
  private selectedGenreSubject = new BehaviorSubject<string>('All');
  selectedGenre$: Observable<string> = this.selectedGenreSubject.asObservable();

  setSelectedGenre(genre: string) {
    console.log("GenreSelectionService setSelectedGenre", genre );
    this.selectedGenreSubject.next(genre);
  }
}
