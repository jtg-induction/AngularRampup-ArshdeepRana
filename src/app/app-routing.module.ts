import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@shared/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule),
    },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'articles/:id',
        loadChildren: () =>
            import('./shared/components/article-details/article-details.module').then((m) => m.ArticleDetailsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'add',
        loadChildren: () =>
            import('./modules/add-article/add-article.module').then((m) => m.AddArticleModule),
        canActivate: [AuthGuard]
    },
    {
        path: "edit",
        loadChildren: () =>
            import("./modules/edit-article/edit-article.module").then((m) => m.EditArticleModule),
        canActivate: [AuthGuard],
    }
    ,
    { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
