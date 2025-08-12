import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { URLs } from '../../services/urls';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(
    private http: HttpClient,
    private router: Router,
    private URLs: URLs
  ) {}

  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.http.post(this.URLs.registerURL, userData).subscribe({
      next: () => {
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.log('Not OK', error);
      },
    });
  }
}
