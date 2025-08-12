import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { URLs } from './urls';
import { User } from '../pages/types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private URLs: URLs
  ) {}

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedIn.asObservable();

  saveUser(user: User) {
    localStorage.setItem('username', user.username);
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('userId', user._id);
    this.loggedIn.next(true);
  }

  getUser(prop: string) {
    const item = localStorage.getItem(prop);
    return item ? item : null;
  }

  clearUser() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout(): void {
    const accessToken = this.getUser('accessToken');
    this.clearUser();
    this.loggedIn.next(false);
    this.router.navigate(['/']);

    const headers = new HttpHeaders({
      'X-Authorization': accessToken || '',
    });

    this.http
      .get(this.URLs.logoutURL, {
        headers,
        observe: 'response',
      })
      .subscribe({
        next: () => {
        },
        error: (error) => {
          console.log('Logout failed:', error);
        },
      });
  }

  public credits() {
    const accessToken = this.getUser('accessToken');
    const headers = new HttpHeaders({
      'X-Authorization': accessToken || '',
      'X-Admin': accessToken || '',
    });

    return headers;
  }
}
