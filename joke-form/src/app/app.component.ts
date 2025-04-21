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

  savedEntries: Entry[] = [];

  onSubmit() {
    // save data
    // clear form entries
    //

    console.log('on submit', this.jokeForm);
  }
}

interface JokeForm {
  name: FormControl<string | null>;
  phone: FormControl<string | null>;
}

interface Entry {
  name: string;
  phone: string;
}
