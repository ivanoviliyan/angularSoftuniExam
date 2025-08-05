import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public baseURL = 'http://localhost:3030/data/ng-movies';

  constructor(private http: HttpClient, private auth: AuthService) {}

  public credits() {
    const accessToken = this.auth.getUser('accessToken');
    const headers = new HttpHeaders({
      'X-Authorization': accessToken || '',
    });

    return headers;
  }

  createMovie(data: any) {
    console.log(data);
    return this.http.post(this.baseURL, data, {
      headers: this.credits(),
      observe: 'response',
    });
  }

  searchMovieByCriteria(category: string, query: string) {
    let url = '';
    category.toLowerCase() === 'genre'
      ? (url = `${this.baseURL}?where=genres%3D%22${query}%22`)
      : (url = `${this.baseURL}?where=${category}%3D%22${query}%22`);
    return this.http.get(url, {
      headers: this.credits(),
      observe: 'response',
    });
  }

  loadAllMovies() {
    return this.http.get(this.baseURL, {
      headers: this.credits(),
      observe: 'response',
    });
  }

  onDelete(id: any) {
    return this.http.delete(`${this.baseURL}/${id}`, {
      headers: this.credits(),
      observe: 'response',
    });
  }
}
