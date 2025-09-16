import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
        { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
        { path: '**', redirectTo: '/auth/signup' }
];
