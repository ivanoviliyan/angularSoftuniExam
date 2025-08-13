import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Managemovies } from './pages/managemovies/managemovies';
import { Movies } from './pages/movies/movies';
import { Mylist } from './pages/mylist/mylist';
import { Register } from './pages/register/register';
import { Singin } from './pages/singin/singin';
import { Editmovie } from './shared/editmovie/editmovie';
import { MovieDetails } from './pages/movie-details/movie-details';
import { guard } from './guards/guard';
import { guest } from './guards/guest';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'movies', component: Movies },
  { path: 'register', canActivate: [guest], component: Register },
  { path: 'sign-in', canActivate: [guest], component: Singin },
  { path: 'movie-details/:id', canActivate: [guard], component: MovieDetails },
  { path: 'my-list', canActivate: [guard], component: Mylist },
  { path: 'edit-movie/:id', canActivate: [guard], component: Editmovie },
  { path: 'manage-movies', canActivate: [guard], component: Managemovies },
];
