import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../auth.service';


@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private baseURL = 'http://localhost:3030/data/angular-movies';

  constructor(private http: HttpClient, private auth: AuthService) {}

  credits() {
    const accessToken = this.auth.getUser('accessToken');
    const headers = new HttpHeaders({
      'X-Authorization': accessToken || '',
    });

    return headers;
  }

  createMovie(data: any) {
    return this.http.post(this.baseURL, data, {
      headers: this.credits(),
      observe: 'response',
    });
  }

  searchMovieByCriteria(category: string, query: string) {
    const url = `${this.baseURL}?where=${category}%3D%22${query}%22`;
    return this.http.get(url, {
      headers: this.credits(),
      observe: 'response',
    });
  }
}
