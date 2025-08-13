import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { URLs } from './urls';
import { Movie, FormData } from '../types/types';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private URLs: URLs
  ) {}

  createMovie(data: FormData) {
    return this.http.post(this.URLs.moviesURL, data, {
      headers: this.auth.credits(),
      observe: 'response',
    });
  }

  searchMovieByCriteria(category: string, query: string) {
    const whereQuery = encodeURIComponent(`${category} LIKE "${query}"`);
    const url = `${this.URLs.moviesURL}?where=${whereQuery}`;

    return this.http.get(url, {
      headers: this.auth.credits(),
      observe: 'response',
    });
  }

  loadAllMovies() {
    return this.http.get(this.URLs.moviesURL, {
      observe: 'response',
    });
  }

  onDelete(id: string) {
    return this.http.delete(`${this.URLs.moviesURL}/${id}`, {
      headers: this.auth.credits(),
      observe: 'response',
    });
  }
}
