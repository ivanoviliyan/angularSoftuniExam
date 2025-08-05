import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Managemovies } from './pages/managemovies/managemovies';
import { Movies } from './pages/movies/movies';
import { Mylist } from './pages/mylist/mylist';
import { Register } from './pages/register/register';
import { Singin } from './pages/singin/singin';
import { Editmovie } from './shared/editmovie/editmovie';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'manage-movies', component: Managemovies },
  { path: 'movies', component: Movies },
  { path: 'my-list', component: Mylist },
  { path: 'register', component: Register },
  { path: 'sign-in', component: Singin },
  { path: 'edit-movie/:id', component: Editmovie },
];
