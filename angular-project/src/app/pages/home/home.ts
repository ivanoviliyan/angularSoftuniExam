import { Component, OnInit } from '@angular/core';
import { HomeServices } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Movie } from '../types/types';

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

  loadLatestMovies() {
    this.hs.getLatestMovies().subscribe((response: any) => {
      console.log(response.body);
      this.movies = response.body || [];
      this.cdr.detectChanges();
    });
  }

  details(movieId: string) {
    this.hs.onClick(movieId);
  }

  loadStreaming() {
    this.hs.getRandomMovie().subscribe((movie) => {
      if (movie) {
        this.streamedMovie = movie;
        this.cdr.detectChanges();
      }
    });
  }
}
