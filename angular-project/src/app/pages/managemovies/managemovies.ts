import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from './managemovie.service';
import { Searchbox } from '../../shared/searchbox/searchbox';
import { InputErrorMessage } from '../../shared/input-error-message/input-error-message';

interface FormData {
  title: string;
  director: string;
  releaseYear: string;
  genres: string[];
  image: string;
  duration: string;
}

interface Movie {
  title: string;
  director: string;
  releaseYear: string;
  genres: string[];
  image: string;
  duration: string;
  rating?: number;
}

@Component({
  selector: 'app-managemovies',
  standalone: true,
  imports: [FormsModule, CommonModule, Searchbox, InputErrorMessage],
  templateUrl: './managemovies.html',
  styleUrl: './managemovies.css',
})
export class Managemovies {
  @ViewChild('movieForm') movieForm!: NgForm;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  searchQuery = '';
  selectedField = 'title';
  movies: Movie[] = [];

  handleSearch(event: { category: string; query: string }) {
    this.movieService
      .searchMovieByCriteria(event.category, event.query)
      .subscribe(
        (response) => {
          const result: any = response.body || response;
          if (result && Array.isArray(result)) {
            this.movies = [...result];
          } else {
            this.movies = [];
          }
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  allGenres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance'];
  submitted = false;

  formData: FormData = {
    title: '',
    director: '',
    releaseYear: '',
    genres: [],
    image: '',
    duration: '',
  };


  valueCheck(value: any): boolean {
    return value ? true : false;
  }

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

  onSubmit() {
    const validData = Object.values(this.formData).every(
      (value) => this.valueCheck(value) === true
    );

    if (!validData) return;

    this.submitted = true;

    if (this.formData.genres.length === 0) {
      return;
    }

    this.movieService.createMovie(this.formData).subscribe({
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
