import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Movie } from '../types/types';
import { MylistService } from '../../services/mylist.service';

@Component({
  selector: 'app-mylist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mylist.html',
  styleUrl: './mylist.css',
})
export class Mylist implements OnInit {
  public movies: Movie[] = [];
  public currentUserId: string = '';

  constructor(
    private mylistService: MylistService,
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

    this.mylistService.getWatchLaterMovies(ownerId).subscribe({
      next: (movies: Movie[]): void => {
        this.movies = movies;
        this.chr.detectChanges();
      },
      error: (err: any): void => {
        console.error('Error loading watch-later movies:', err);
      },
    });
  }

  markAsWatched(movie: Movie): void {
    this.mylistService.markAsWatched(movie, this.currentUserId).subscribe({
      next: (): void => {
        movie.isWatched = true;
        movie.watched = [...(movie.watched || []), this.currentUserId];
        this.chr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error updating watched list:', error);
      },
    });
  }

  removeFromList(movie: Movie): void {
    this.mylistService.removeFromList(movie).subscribe({
      next: (): void => {
        this.movies = this.movies.filter((m: Movie) => m._id !== movie._id);
        this.chr.detectChanges();
      },
      error: (err: any): void => console.error('Error removing movie:', err),
    });
  }
}
