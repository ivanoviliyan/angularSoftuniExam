import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/managemovie.service';
import { Searchbox } from '../../shared/searchbox/searchbox';
import { InputErrorMessage } from '../../shared/input-error-message/input-error-message';
import { Router } from '@angular/router';
import { Movie, FormData } from '../../types/types';

@Component({
  selector: 'app-managemovies',
  standalone: true,
  imports: [FormsModule, CommonModule, Searchbox, InputErrorMessage],
  templateUrl: './managemovies.html',
  styleUrl: './managemovies.css',
})
export class Managemovies implements OnInit {
  @ViewChild('movieForm') movieForm!: NgForm;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  searchQuery = '';
  selectedField = 'title';
  movies: Movie[] = [];

  ngOnInit(): void {
    this.onLoad();
  }

  handleSearch(event: { category: string; query: string }): void {
    this.movieService
      .searchMovieByCriteria(event.category, event.query)
      .subscribe({
        next: (response) => {
          const result: Movie[] = (response.body as Movie[]) || [];
          this.movies = Array.isArray(result) ? [...result] : [];
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log('Error:', error);
        },
      });
  }

  allGenres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance'];
  submitted = false;

  formData: FormData = {
    id: '',
    title: '',
    director: '',
    releaseYear: '',
    genres: [],
    image: '',
    duration: '',
    desc: '',
    watched: [],
  };

  onGenreChange(event: Event): void {
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

  onSubmit(): void {
    this.submitted = true;

    if (this.formData.genres.length === 0) {
      return;
    }

    this.movieService.createMovie(this.formData).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.movieForm.resetForm();
          this.onLoad();
        }
      },
      error: (error) => {
        console.log('Not OK', error);
      },
    });
  }

  onLoad(): void {
    this.movieService.loadAllMovies().subscribe({
      next: (response) => {
        if (response.status === 200) {
          const result = (response.body as Movie[]) || [];
          if (Array.isArray(result)) {
            this.movies = [...result];
          } else {
            this.movies = [];
          }
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEdit(id: string): void {
    this.router.navigate(['edit-movie', id]);
  }

  onDelete(id: string): void {
    this.movieService.onDelete(id).subscribe({
      next: () => {
        this.onLoad();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getImageUrl(movie: Movie): string {
    return movie.image?.trim() ? movie.image : 'https://placehold.co/600x400';
  }
}
