import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  jokeForm = new FormGroup<JokeForm>({
    name: new FormControl('', {
      validators: (control) =>
        control.value && control.value.length >= 2 ? null : { minlength: true },
    }),
    phone: new FormControl('', {
      validators: (control) =>
        /^\d{10}$/.test(control.value || '') ? null : { invalidPhone: true },
    }),
  });

  fibonacciSequence: number[] = [];
  savedEntries: Entry[] = [];

  ngOnInit() {
    this.fibonacciSequence = this.generateFibonacci(100);
  }

  private generateFibonacci(count: number): number[] {
    const sequence = [0, 1];
    for (let i = 2; i < count; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
  }

  async onSubmit() {
    // length of current savedEntries array is equal to  index of new entry.
    const fibonacciBool = this.fibonacciSequence.includes(
      this.savedEntries.length
    );
    let randomJoke = '';
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      randomJoke = data.value;
      this.savedEntries.push({
        ...this.jokeForm.value,
        isFibonacci: fibonacciBool,
        randomJoke: randomJoke,
      } as Entry);
      this.jokeForm.reset();
    } catch (error) {
      console.error('Error fetching joke:', error);
      this.jokeForm.reset();
    }
  }
}

interface JokeForm {
  name: FormControl<string | null>;
  phone: FormControl<string | null>;
}

interface Entry {
  name: string;
  phone: string;
  isFibonacci: boolean;
  randomJoke: string;
}
