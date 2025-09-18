import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

import { AuthService } from '@shared/services'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
    const token = localStorage.getItem("token");

    if (!token) {
        this.router.navigate(['/login']);
        return false;
    }

    try {
        const decoded: any = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp && decoded.exp > now) {
        return true;  // Token is valid
        } else {
        this.router.navigate(['/login']);
        return false; // Token is expired
        }
    } catch {
        this.router.navigate(['/login']);
        return false; // Token is invalid
    }
    }
}
