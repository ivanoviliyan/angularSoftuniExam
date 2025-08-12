import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Movie } from '../pages/types/types';

@Injectable({
  providedIn: 'root',
})
export class MylistService {
  private watchLaterUrl = 'http://localhost:3030/data/watch-later';
  private moviesUrl = 'http://localhost:3030/data/ng-movies';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getWatchLaterMovies(ownerId: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.watchLaterUrl).pipe(
      map((watchLaterMovies) =>
        watchLaterMovies.filter((m) => m._ownerId === ownerId)
      ),
      switchMap((filtered) => {
        const detailedRequests = filtered.map((movie) =>
          this.http.get<Movie>(`${this.moviesUrl}/${movie._movieId}`)
        );
        return forkJoin(detailedRequests);
      }),
      map((detailedMovies) => {
        return detailedMovies.map((movie) => ({
          ...movie,
          isWatched:
            Array.isArray(movie.watched) && movie.watched.includes(ownerId),
        }));
      })
    );
  }
  markAsWatched(movie: Movie, currentUserId: string): Observable<any> {
    const movieUrl = `${this.moviesUrl}/${movie._id}`;
    return this.http.get<Movie>(movieUrl).pipe(
      switchMap((movieData) => {
        const currentWatched: string[] = Array.isArray(movieData.watched)
          ? movieData.watched
          : [];
        if (currentWatched.includes(currentUserId)) {
          return [];
        }
        const updatedWatched = [...currentWatched, currentUserId];
        return this.http.patch<Movie>(
          movieUrl,
          { watched: updatedWatched },
          { headers: this.auth.credits(), observe: 'response' }
        );
      })
    );
  }

  removeFromList(movie: Movie): Observable<any> {
    const getUrl = `${this.watchLaterUrl}?where=_movieId%3D%22${movie._id}%22`;

    return this.http.get<Movie[]>(getUrl).pipe(
      switchMap((response) => {
        if (response.length === 0) {
          throw new Error('No movie found to remove.');
        }
        const id = response[0]._id;
        const ownerId = response[0]._ownerId;
        const deleteUrl = `${this.watchLaterUrl}/${id}`;
        const patchUrl = `${this.moviesUrl}?where=_ownerId%3D%22${ownerId}%22`;

        return this.http.get<any[]>(patchUrl).pipe(
          switchMap((movies) => {
            const patchRequests = movies
              .filter(
                (m) => Array.isArray(m.watched) && m.watched.includes(ownerId)
              )
              .map((m) => {
                const updatedWatched: string[] = m.watched.filter(
                  (uid: string) => uid !== ownerId
                );
                return this.http.patch(
                  `${this.moviesUrl}/${m._id}`,
                  { watched: updatedWatched },
                  { headers: this.auth.credits() }
                );
              });

            return forkJoin(patchRequests).pipe(
              switchMap(() =>
                this.http.delete(deleteUrl, {
                  headers: this.auth.credits(),
                  observe: 'response',
                })
              )
            );
          })
        );
      })
    );
  }
}
