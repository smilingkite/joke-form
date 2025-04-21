import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  constructor() {}

  async fetchJokes(): Promise<any> {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error('Error fetching joke:', error);
      return '';
    }
  }
}
