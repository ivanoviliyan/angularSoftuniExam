import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';

interface FormData {
  title: string;
  director: string;
  releaseYear: string;
  genres: string[];
  image: string;
  duration: string;
}

@Component({
  selector: 'app-managemovies',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './managemovies.html',
  styleUrl: './managemovies.css',
})
export class Managemovies {
  @ViewChild('movieForm') movieForm!: NgForm;
  genresList = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance'];

  formData: FormData = {
    title: '',
    director: '',
    releaseYear: '',
    genres: [],
    image: '',
    duration: '',
  };

  onGenreChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      if (!this.formData.genres.includes(value)) {
        this.formData.genres.push(value);
      }
    } else {
      this.formData.genres = this.formData.genres.filter((g) => g !== value);
    }
  }

  constructor(private http: HttpClient, private auth: AuthService) {}

  valueCheck(value: any): boolean {
    return value ? true : false;
  }

  onSubmit() {
    const validData = Object.values(this.formData).every(
      (value) => this.valueCheck(value) === true
    );

    if (!validData) return;

    const accessToken = this.auth.getUser('accessToken');

    const headers = new HttpHeaders({
      'X-Authorization': accessToken || '',
    });

    this.http
      .post('http://localhost:3030/data/movies', this.formData, {
        headers: headers,
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.movieForm.resetForm();
          }
        },
        error: (error) => {
          console.log('Not OK', error);
        },
      });
  }
}
