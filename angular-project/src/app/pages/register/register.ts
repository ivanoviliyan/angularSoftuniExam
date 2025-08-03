import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private http: HttpClient, private router: Router) {}

  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.log('Passwords are not the same!');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    console.log(userData);

    this.http.post('http://localhost:3030/users/register', userData).subscribe({
      next: (response) => {
        console.log('OK', response);
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.log('Not OK', error);
      },
    });
  }
}
