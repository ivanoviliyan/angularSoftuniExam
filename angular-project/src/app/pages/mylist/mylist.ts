import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/managemovie.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

interface Movie {
  _id: string;
  title: string;
  director: string;
  releaseYear: string;
  genres: string[];
  image: string;
  duration: string;
  rating?: number;
  desc: string;
  watched: string[];
  _ownerId: string;
  _movieId: string;
  isWatched?: boolean;
}

@Component({
  selector: 'app-mylist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mylist.html',
  styleUrl: './mylist.css',
})
export class Mylist implements OnInit {
  private watchLaterUrl = 'http://localhost:3030/data/watch-later';
  public movies: Movie[] = [];
  public currentUserId: string = '';

  constructor(
    private movieService: MovieService,
    private http: HttpClient,
    private chr: ChangeDetectorRef,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const ownerId = this.auth.getUser('userId');
    if (!ownerId) {
      console.error('User not logged in');
      return;
    }
    this.currentUserId = ownerId;

    this.http.get<Movie[]>(this.watchLaterUrl).subscribe({
      next: (watchLaterMovies) => {
        const filtered = watchLaterMovies.filter((m) => m._ownerId === ownerId);
        const detailedRequests = filtered.map((movie) =>
          this.http.get<Movie>(
            `http://localhost:3030/data/ng-movies/${movie._movieId}`
          )
        );

        forkJoin(detailedRequests).subscribe({
          next: (detailedMovies) => {
            this.movies = detailedMovies.map((movie) => ({
              ...movie,
              isWatched:
                Array.isArray(movie.watched) && movie.watched.includes(ownerId),
            }));
            this.chr.detectChanges();
          },
          error: (err) => {
            console.error('Error loading detailed movie info:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error loading watch-later movies:', err);
      },
    });
  }

  markAsWatched(movie: Movie): void {
    if (!this.currentUserId) {
      console.error('No user ID found!');
      return;
    }

    const movieUrl = `http://localhost:3030/data/ng-movies/${movie._id}`;

    this.http.get<Movie>(movieUrl).subscribe({
      next: (movieData) => {
        const currentWatched = Array.isArray(movieData.watched)
          ? movieData.watched
          : [];

        if (currentWatched.includes(this.currentUserId)) {
          return;
        }

        const updatedWatched = [...currentWatched, this.currentUserId];

        this.http
          .patch(
            movieUrl,
            { watched: updatedWatched },
            {
              headers: this.auth.credits(),
              observe: 'response',
            }
          )
          .subscribe({
            next: () => {
              movie.isWatched = true;
              movie.watched = updatedWatched;
              this.chr.detectChanges();
            },
            error: (error) => {
              console.error('Error updating watched list:', error);
            },
          });
      },
      error: (error) => {
        console.error('Error fetching movie data:', error);
      },
    });
  }

  removeFromList(movie: Movie): void {
    const getUrl = `${this.watchLaterUrl}?where=_movieId%3D%22${movie._id}%22`;

    this.http.get<Movie[]>(getUrl).subscribe({
      next: (response) => {
        if (response.length > 0) {
          const id = response[0]._id;
          const ownerId = response[0]._ownerId;
          const deleteUrl = `${this.watchLaterUrl}/${id}`;
          const patchUrl = `http://localhost:3030/data/ng-movies?where=_ownerId%3D%22${ownerId}%22`;

          this.http.get<any[]>(patchUrl).subscribe({
            next: (movies) => {
              movies.forEach((m) => {
                if (Array.isArray(m.watched) && m.watched.includes(ownerId)) {
                  const updatedWatched: string[] = (
                    m.watched as string[]
                  ).filter((uid: string) => uid !== ownerId);
                  const updateUrl = `http://localhost:3030/data/ng-movies/${m._id}`;

                  this.http
                    .patch(
                      updateUrl,
                      { watched: updatedWatched },
                      {
                        headers: this.auth.credits(),
                      }
                    )
                    .subscribe({
                      next: () =>
                        console.log(
                          `Removed ${ownerId} from watched in movie ${m._id}`
                        ),
                      error: (err) =>
                        console.log(`Error updating movie ${m._id}:`, err),
                    });
                }
              });
            },
            error: (err) =>
              console.log('Error fetching movies for patch:', err),
          });

          this.http
            .delete(deleteUrl, {
              headers: this.auth.credits(),
              observe: 'response',
            })
            .subscribe({
              next: () => {
                this.movies = this.movies.filter((m) => m._id !== movie._id);
                this.chr.detectChanges();
              },
              error: (error) => console.log('Delete error:', error),
            });
        } else {
          console.log('No movie found to remove.');
        }
      },
      error: (error) => console.log('Get error:', error),
    });
  }
}
