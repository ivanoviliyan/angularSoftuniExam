import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../managemovies/managemovie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  constructor(
    private moviesService: MovieService,
    private cdr: ChangeDetectorRef
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
}
