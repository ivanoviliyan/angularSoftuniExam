import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { URLs } from '../../services/urls';
import { User } from '../types/types';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './singin.html',
  styleUrl: './singin.css',
})
export class Singin {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private URLs: URLs
  ) {}

  email = '';
  password = '';

  onSubmit() {
    const userData = {
      email: this.email,
      password: this.password,
    };

    this.http.post<User>(this.URLs.loginURL, userData).subscribe({
      next: (response: User) => {
        this.auth.saveUser(response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
