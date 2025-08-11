import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class URLs {
  public moviesURL = 'http://localhost:3030/data/ng-movies';
  public watchLaterURL = 'http://localhost:3030/data/watch-later';
  public loginURL = 'http://localhost:3030/users/login';
  public registerURL = 'http://localhost:3030/users/register';
  public logoutURL = 'http://localhost:3030/users/logout';
}