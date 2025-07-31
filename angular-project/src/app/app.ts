import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './shared/navigation/navigation';
import { Footer } from './shared/footer/footer';
import { Home } from './pages/home/home';
import { Tvshows } from './pages/tvshows/tvshows';
import { Movies } from './pages/movies/movies';
import { Mylist } from './pages/mylist/mylist';
import { Singin } from './pages/singin/singin';
import { Register } from './pages/register/register';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navigation,
    Footer,
    Home,
    Tvshows,
    Movies,
    Mylist,
    Singin,
    Register,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-project');
}
