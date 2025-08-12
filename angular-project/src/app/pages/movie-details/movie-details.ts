import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieDetailsService } from '../../services/movie-details.service';
import { ActivatedRoute } from '@angular/router';
import { FormData } from '../types/types';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.css'],
})
export class MovieDetails implements OnInit {
  formData: FormData = {
    id: '',
    title: '',
    director: '',
    releaseYear: '',
    genres: [] as string[],
    image: '',
    duration: '',
    desc: '',
    watched: [],
  };

  isAdded = false;

  constructor(
    private mds: MovieDetailsService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (!movieId) {
      return;
    }

    this.mds.loadMovie(movieId).subscribe((movie) => {
      this.formData = movie;
      this.mds.checkIfMovieAlreadyAdded(movie.id).subscribe((added) => {
        this.isAdded = added;
        this.cd.detectChanges();
      });
    });
  }

  addToWatchLaterList(): void {
    if (!this.isAdded) {
      this.mds
        .addToWatchLaterList(
          this.formData.id,
          this.formData.image,
          this.formData.title,
          this.formData.director
        )
        .subscribe({
          next: () => {
            this.isAdded = true;
            this.cd.detectChanges();
          },
          error: (err) => console.log(err),
        });
    }
  }
}
