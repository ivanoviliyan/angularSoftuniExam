import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { URLs } from './urls';
import { Observable, map } from 'rxjs';
import { Movie, WatchListEntry } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private URLs: URLs
  ) {}

  loadMovie(movieId: string): Observable<any> {
    const url = `${this.URLs.moviesURL}/${movieId}`;
    return this.http.get<Movie>(url, { headers: this.auth.credits() }).pipe(
      map((data) => ({
        id: data?._id || '',
        title: data?.title || '',
        director: data?.director || '',
        releaseYear: data?.releaseYear?.toString() || '',
        genres: data?.genres || [],
        image: data?.image || '',
        duration: data?.duration?.toString() || '',
        desc: data?.desc || '',
        watched: data?.watched || [],
      }))
    );
  }

  checkIfMovieAlreadyAdded(movieId: string): Observable<boolean> {
    const query = `_ownerId="${this.auth.getUser(
      'userId'
    )}" AND _movieId="${movieId}"`;
    const url = `${this.URLs.watchLaterURL}?where=${encodeURIComponent(query)}`;

    return this.http.get<WatchListEntry[]>(url, { headers: this.auth.credits() }).pipe(
      map((data) => data.length > 0)
    );
  }

  addToWatchLaterList(
    id: string,
    image: string,
    title: string,
    director: string
  ): Observable<WatchListEntry> {
    const data = {
      _movieId: id,
      image,
      title,
      director,
      _ownerId: this.auth.getUser('userId'),
    };

    return this.http.post<WatchListEntry>(this.URLs.watchLaterURL, data, {
      headers: this.auth.credits(),
    });
  }
  
}