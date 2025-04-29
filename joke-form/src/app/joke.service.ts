import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  fetchJokes(): Observable<string> {
    return new Observable<string>((observer) => {
      fetch('https://api.chucknorris.io/jokes/random')
        .then((response) => response.json())
        .then((data) => {
          observer.next(data.value);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching joke:', error);
          observer.error(error);
        });
    });
  }
}
