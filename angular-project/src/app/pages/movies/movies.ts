import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../../services/managemovie.service';
import { CommonModule } from '@angular/common';
import { Searchbox } from '../../shared/searchbox/searchbox';
import { Router } from '@angular/router';
import { Movie } from '../types/types';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, Searchbox],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  constructor(
    private moviesService: MovieService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public movies: Movie[] = [];

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.moviesService.loadAllMovies().subscribe({
      next: (response) => {
        if (response.status === 200) {
          const result: Movie[] = (response.body as Movie[]) || [];
          if (result && Array.isArray(result)) {
            this.movies = [...result];
            this.cdr.detectChanges();
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

  handleSearch(event: { category: string; query: string }): void {
    this.moviesService
      .searchMovieByCriteria(event.category, event.query)
      .subscribe({
        next: (response) => {
          const result: Movie[] = (response.body as Movie[]) || [];
          this.movies = Array.isArray(result) ? [...result] : [];
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  details(id: string) {
    this.router.navigate([`movie-details/${id}`]);
  }
}
