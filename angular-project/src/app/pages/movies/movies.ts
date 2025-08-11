import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../../services/managemovie.service';
import { CommonModule } from '@angular/common';
import { Searchbox } from '../../shared/searchbox/searchbox';
import { Router } from '@angular/router';

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

  public movies: any[] = [];

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.moviesService.loadAllMovies().subscribe({
      next: (response) => {
        if (response.status === 200) {
          const result: any = response.body || response;
          if (result && Array.isArray(result)) {
            this.movies = [...result];
            console.log(this.movies);
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

  handleSearch(event: { category: string; query: string }) {
    this.moviesService
      .searchMovieByCriteria(event.category, event.query)
      .subscribe(
        (response: any) => {
          if (!event.category || !event.query) {
            this.onLoad();
            this.cdr.detectChanges();
          }

          const result: any = response.body || response;
          if (result && Array.isArray(result)) {
            this.cdr.detectChanges();
            this.movies = [...result];
          } else {
            this.movies = [];
          }
          this.cdr.detectChanges();
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  details(id: string) {
    this.router.navigate([`movie-details/${id}`]);
  }
}
