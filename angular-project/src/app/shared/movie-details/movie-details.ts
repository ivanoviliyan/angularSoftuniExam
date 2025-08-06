import { MovieService } from '../../pages/managemovies/managemovie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadMovie();
    this.cd.detectChanges();
  }

  formData = {
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
    console.log('Loading movie with id:', movieId);
    const url = `${this.movieService.baseURL}/${movieId}`;

    this.http
      .get(url, {
        headers: this.movieService.credits(),
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          const data: any = response.body;
          console.log('Movie data loaded:', data);
          this.formData = {
            title: data?.title || '',
            director: data?.director || '',
            releaseYear: data?.releaseYear?.toString() || '',
            genres: data?.genres || [],
            image: data?.image || '',
            duration: data?.duration || '',
            desc: data?.desc || '',
          };
          this.cd.detectChanges();
        },
        error: (error) => {
          console.log('Load error:', error);
        },
      });
  }
}
