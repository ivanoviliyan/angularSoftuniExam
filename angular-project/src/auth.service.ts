import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  saveUser(user: any) {
    localStorage.setItem('username', user.username);
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('userId', user._id);
  }

  getUser(prop: string) {
    const user = localStorage.getItem(prop);
    return user ? JSON.parse(user) : null;
  }

  clearUser() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
