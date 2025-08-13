import { Component, OnInit } from '@angular/core';
import { HomeServices } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Movie } from '../../types/types';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private hs: HomeServices, private cdr: ChangeDetectorRef) {}

  movies: Movie[] = [];
  streamedMovie!: Movie;

  ngOnInit(): void {
    this.loadLatestMovies();
    this.loadStreaming();
  }

  loadLatestMovies(): void {
    this.hs.getLatestMovies().subscribe((response) => {
      this.movies = (response as Movie[]) || [];
      this.cdr.detectChanges();
    });
  }

  details(movieId: string): void {
    this.hs.onClick(movieId);
  }

  loadStreaming(): void {
    this.hs.getRandomMovie().subscribe((movie) => {
      if (movie) {
        this.streamedMovie = movie;
        this.cdr.detectChanges();
      }
    });
  }
}