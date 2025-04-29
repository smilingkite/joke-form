import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { first } from 'rxjs';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JokeService } from './joke.service';
import { FibonacciService } from './fibonacci.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private jokeService = inject(JokeService);
  private fibonacciService = inject(FibonacciService);

  jokeForm = new FormGroup<JokeForm>({
    name: new FormControl('', {
      validators: [Validators.minLength(2), Validators.required],
    }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.pattern('[0-9]{10}')],
    }),
  });

  fibonacciSequence = this.fibonacciService.fibonnaciSequence.asReadonly();
  savedEntries: Entry[] = [];

  async onSubmit() {
    // length of current savedEntries array is equal to  index of new entry.
    const fibonacciBool = this.fibonacciSequence().includes(
      this.savedEntries.length
    );

    this.jokeService
      .fetchJokes()
      .pipe(first())
      .subscribe((randomJoke) => {
        this.savedEntries.push({
          ...this.jokeForm.value,
          isFibonacci: fibonacciBool,
          randomJoke: randomJoke,
        } as Entry);
        this.jokeForm.reset();
      });
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
