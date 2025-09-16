import { Routes } from '@angular/router';

import { DashboardComponent } from '@modules/dashboard/dashboard.component';
import { ArticleDetailsComponent } from '@shared/components/article-details/article-details.component';
import { AuthGuard } from '@shared/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
        { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
        { path: '', redirectTo: '/auth/login', pathMatch: 'full'},

        { path: 'article/:id', component: ArticleDetailsComponent, canActivate: [AuthGuard] },


        {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard]
        },

        { path: '**', redirectTo: '/auth/login' }
];
