import { Routes } from '@angular/router';

import { AddArticleComponent } from '@modules/add-article/add-article.component';
import { DashboardComponent } from '@modules/dashboard/dashboard.component';
import { EditArticleComponent } from '@modules/edit-article/edit-article.component';

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
        { path: 'add', component: AddArticleComponent, canActivate: [AuthGuard]},
        { path: 'edit/:id', component: EditArticleComponent },

        {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard]
        },

        { path: '**', redirectTo: '/auth/login' }
];
