import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private http = inject(HttpClient);
  fetchJokes() {
    return this.http
      .get<{ value: string }>('https://api.chucknorris.io/jokes/random')
      .pipe(
        switchMap((data) => {
          return of(data.value);
        }),
        catchError((error) => {
          console.error('Error fetching joke:', error);
          return of(`Error: ${error.message}`);
        })
      );
  }
}
