import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environments';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthResponse, User } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  public isLoggedIn = false;

  constructor(private http: HttpClient) { }

  register(payload: { username: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post(`${this.apiUrl}/register`, payload).pipe(
      tap((res: AuthResponse) => {
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);
        }
      })
    );
  }

  login(payload: { email: string, password: string }): Observable<AuthResponse> {

    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((res: AuthResponse) => {
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);
        }
      })
    )
  }
}
