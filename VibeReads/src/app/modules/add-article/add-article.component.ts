import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "environments/environments";
import { jwtDecode } from "jwt-decode";

import { ArticleFormComponent } from "@shared/components/article-form/article-form.component";
import { HeaderComponent } from "@shared/components/header/header.component";
import { Article } from "@shared/models";

@Component({
  selector: 'app-add-article',
  templateUrl : './add-article.component.html',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ArticleFormComponent]
})
export class AddArticleComponent {
  errorMessage = "";

  constructor(private http: HttpClient, private router: Router) {}

  handleSubmit(article: Article) {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.sub;

    this.http.get(`${environment.apiUrl}/users/${userId}`).subscribe({
      next: (res: any) => {
        article.author = res.username;
        article.date = new Date().toISOString();

        this.http.post(`${environment.apiUrl}/articles`, article).subscribe({
          next: () => this.router.navigate(['/dashboard']),
          error: () => this.errorMessage = "Could not add article. Please try again"
        });
      },
      error: () => this.errorMessage = "Failed to fetch username. Please try again"
    });
  }
}
