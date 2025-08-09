import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { URLs } from './urls';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private URLs: URLs
  ) {}

  createMovie(data: any) {
    console.log(data);
    return this.http.post(this.URLs.moviesURL, data, {
      headers: this.auth.credits(),
      observe: 'response',
    });
  }

  searchMovieByCriteria(category: string, query: string) {
    let url = '';
    category.toLowerCase() === 'genre'
      ? (url = `${this.URLs.moviesURL}?where=genres%3D%22${query}%22`)
      : (url = `${this.URLs.moviesURL}?where=${category}%3D%22${query}%22`);
    return this.http.get(url, {
      headers: this.auth.credits(),
      observe: 'response',
    });
  }

  loadAllMovies() {
    return this.http.get(this.URLs.moviesURL, {
      headers: this.auth.credits(),
      observe: 'response',
    });
  }

  onDelete(id: any) {
    return this.http.delete(`${this.URLs.moviesURL}/${id}`, {
      headers: this.auth.credits(),
      observe: 'response',
    });
  }
}
