import { MovieService } from '../../pages/managemovies/managemovie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-movie-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMovie();
    this.cd.detectChanges();
  }

  formData = {
    id: '',
    title: '',
    director: '',
    releaseYear: '',
    genres: [] as string[],
    image: '',
    duration: '',
    desc: '',
  };

  loadMovie() {
    const movieId = this.route.snapshot.paramMap.get('id');
    const url = `${this.movieService.baseURL}/${movieId}`;

    this.http
      .get(url, {
        headers: this.movieService.credits(),
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          const data: any = response.body;
          // console.log('Movie data loaded:', data);
          this.formData = {
            id: data?._id || '',
            title: data?.title || '',
            director: data?.director || '',
            releaseYear: data?.releaseYear?.toString() || '',
            genres: data?.genres || [],
            image: data?.image || '',
            duration: data?.duration || '',
            desc: data?.desc || '',
          };
          this.cd.detectChanges();

          this.checkIfMovieAlreadyAdded();
        },
        error: (error) => {
          console.log('Load error:', error);
        },
      });
  }

  private watchLaterUrl = `http://localhost:3030/data/watch-later`;
  isAdded: boolean = false;

  checkIfMovieAlreadyAdded() {
    const query = `_ownerId="${this.auth.getUser('userId')}" AND _movieId="${
      this.formData.id
    }"`;
    const url = `${this.watchLaterUrl}?where=${encodeURIComponent(query)}`;

    this.http
      .get(url, {
        headers: this.movieService.credits(),
        observe: 'response',
      })
      .subscribe({
        next: (response: any) => {
          const data = response.body;
          this.isAdded = data.length > 0;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.log('Error checking if movie already added:', error);
        },
      });
  }

  addToWatchLaterList(
    id: string,
    image: string,
    title: string,
    director: string
  ) {
    const data = { _movieId: id, image, title, director };

    if (!this.isAdded) {
      this.http
        .post(this.watchLaterUrl, data, {
          headers: this.movieService.credits(),
          observe: 'response',
        })
        .subscribe({
          next: (response: any) => {
            console.log(this.isAdded);
            this.isAdded = true;
            this.cd.detectChanges();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
