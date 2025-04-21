import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ReactiveFormsModule],
})

// enable save button only when data is valid
export class AppComponent {
  jokeForm = new FormGroup<JokeForm>({
    name: new FormControl(''),
    phone: new FormControl(),
  });

  onSubmit() {
    // save data
    // clear form entries
    //
  }
}

interface JokeForm {
  name: FormControl<string | null>;
  phone: FormControl<number>;
}
