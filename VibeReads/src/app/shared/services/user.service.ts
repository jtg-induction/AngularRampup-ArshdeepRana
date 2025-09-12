import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environments';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl =  environment.apiUrl;

  constructor(private http: HttpClient) {}

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`).pipe(
      map(users => users.length === 0)
    );
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users.length === 0)
    );
  }
}
