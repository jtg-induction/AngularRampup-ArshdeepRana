import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "environments/environments";
import { jwtDecode } from "jwt-decode";

import { Article, User } from "@shared/models";

@Component({
    selector: "app-add-article",
    templateUrl: "./add-article.component.html",
})
export class AddArticleComponent {
    errorMessage = "";

    constructor(private http: HttpClient, private router: Router) { }

    handleSubmit(article: Partial<Article>) {
        const token = localStorage.getItem("token");
        if (!token) {
            this.errorMessage = "You must be logged in to add an article.";
            return;
        }

        const decodedToken: { sub: string } = jwtDecode(token);
        const userId = decodedToken.sub;

        this.http.get<User>(`${environment.apiUrl}/users/${userId}`).subscribe({
            next: (res) => {
                const newArticle: Article = {
                    ...article,
                    id: 0,
                    author: res.username,
                    date: new Date().toISOString(),
                } as Article;

                this.http.post(`${environment.apiUrl}/articles`, newArticle).subscribe({
                    next: () => this.router.navigate(["/dashboard"]),
                    error: () =>
                        (this.errorMessage = "Could not add article. Please try again."),
                });
            },
            error: () =>
                (this.errorMessage = "Failed to fetch user info. Please try again."),
        });
    }
}
