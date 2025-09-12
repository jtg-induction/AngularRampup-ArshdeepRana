import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./pages/auth/auth.module').then(m => m.AuthModule)
    },
        { path: '', redirectTo: '/auth/signup', pathMatch: 'full' },
        { path: '**', redirectTo: '/auth/signup' }
];
