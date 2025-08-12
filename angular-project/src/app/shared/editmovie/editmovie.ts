import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { URLs } from '../../services/urls';
import { Movie } from '../../pages/types/types';

@Component({
  selector: 'app-editmovie',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editmovie.html',
  styleUrl: './editmovie.css',
})
export class Editmovie {
  allGenres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance'];

  formData = {
    title: '',
    director: '',
    releaseYear: '',
    genres: [] as string[],
    image: '',
    duration: '',
    desc: '',
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private router: Router,
    private auth: AuthService,
    private URLs: URLs
  ) {}

  ngOnInit() {
    this.loadMovie();
  }

  loadMovie() {
    const movieId = this.route.snapshot.paramMap.get('id');
    const url = `${this.URLs.moviesURL}/${movieId}`;

    this.http
      .get(url, {
        headers: this.auth.credits(),
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          const data = response.body as Movie | null;
          if (data) {
            this.formData = {
              title: data.title || '',
              director: data.director || '',
              releaseYear: data.releaseYear?.toString() || '',
              genres: data.genres || [],
              image: data.image || '',
              duration: data.duration || '',
              desc: data.desc || '',
            };
            this.cd.detectChanges();
          } else {
            console.log('No movie data found.');
          }
        },
        error: (error) => {
          console.log('Load error:', error);
        },
      });
  }

  toggleGenre(event: Event, genre: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.formData.genres.includes(genre)) {
        this.formData.genres.push(genre);
      }
    } else {
      this.formData.genres = this.formData.genres.filter((g) => g !== genre);
    }
  }

  saveMovie() {
    const movieId = this.route.snapshot.paramMap.get('id');
    const url = `${this.URLs.moviesURL}/${movieId}`;

    this.http
      .put(url, this.formData, {
        headers: this.auth.credits(),
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          this.router.navigate(['manage-movies']);
        },
        error: (error) => {
          console.log('Update failed:', error);
        },
      });
  }
}
