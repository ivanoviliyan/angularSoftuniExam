import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLs } from './urls';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../types/types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeServices {
  constructor(
    private http: HttpClient,
    private URLs: URLs,
    private router: Router
  ) {}

  getLatestMovies(): Observable<Movie[]> {
    const url = `${this.URLs.moviesURL}?sortBy=_createdOn%20desc&pageSize=3`;

    return this.http.get(url, {
      observe: 'response',
    }).pipe(
      map((response) => (response.body as Movie[]) || [])
    );
  }

  onClick(movieId: string): void {
    const id = movieId;
    this.router.navigate([`movie-details/${id}`]);
  }

  getRandomMovie(): Observable<Movie> {
    return this.http
      .get(this.URLs.moviesURL, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const movies: Movie[] = (response.body as Movie[]) || [];
          if (movies.length === 0) {
            throw new Error('No movies found');
          }
          return movies[Math.floor(Math.random() * movies.length)];
        })
      );
  }
}
