import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FibonacciService {
  fetchFibonacci(count = 100): number[] {
    return this.generateFibonacci(count);
  }

  private generateFibonacci(count: number): number[] {
    const sequence = [0, 1];
    for (let i = 2; i < count; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
  }
}
