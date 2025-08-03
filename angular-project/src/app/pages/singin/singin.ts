import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth.service';

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
    private auth: AuthService
  ) {}

  email = '';
  password = '';

  onSubmit() {
    const userData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:3030/users/login', userData).subscribe({
      next: (response: any) => {
        console.log('OK', response);
        this.auth.saveUser(response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Not OK', error);
      },
    });
  }
}
