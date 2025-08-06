import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MovieService } from '../managemovies/managemovie.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';
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
  watched: string[]; // userId-та, които са гледали филма
  _ownerId: string;
  _movieId: string;
  isWatched?: boolean; // за UI затъмняване
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
        // Масив от Observable, които зареждат допълнителната информация
        const detailedRequests = filtered.map((movie) =>
          this.http.get<Movie>(
            `http://localhost:3030/data/ng-movies/${movie._movieId}`
          )
        );

        console.log(detailedRequests)

        // Изпълняваме всички заяви едновременно
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
          // Вече е маркиран като гледан, не правим нищо
          return;
        }

        const updatedWatched = [...currentWatched, this.currentUserId];

        this.http
          .patch(
            movieUrl,
            { watched: updatedWatched },
            {
              headers: this.movieService.credits(),
              observe: 'response',
            }
          )
          .subscribe({
            next: () => {
              // Обновяваме локалния обект
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
}
