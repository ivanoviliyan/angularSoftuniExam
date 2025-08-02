import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './shared/navigation/navigation';
import { Footer } from './shared/footer/footer';
import { Home } from './pages/home/home';
import { Movies } from './pages/movies/movies';
import { Mylist } from './pages/mylist/mylist';
import { Singin } from './pages/singin/singin';
import { Register } from './pages/register/register';
import { About } from './pages/about/about';
import { Managemovies } from './pages/managemovies/managemovies';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navigation,
    Footer,
    Home,
    Movies,
    Mylist,
    Singin,
    Register,
    About,
    Managemovies
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-project');
}
