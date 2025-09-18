import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { environment } from "environments/environments";

import { ArticleFormComponent } from "@shared/components/article-form/article-form.component";
import { HeaderComponent } from "@shared/components/header/header.component";
import { Article } from '@shared/models';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ArticleFormComponent]
})
export class EditArticleComponent implements OnInit {
  articleData?: Article;
  errorMessage = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Article>(`${environment.apiUrl}/articles/${id}`).subscribe({
        next: (res) => this.articleData = res,
        error: () => this.errorMessage = "Failed to load article"
      });
    }
  }

  handleUpdate(formValue: Partial<Article>) {
    if (!this.articleData) return;

    const updatedArticle: Article = {
      ...this.articleData,
      ...formValue,
    };

    this.http.put(`${environment.apiUrl}/articles/${this.articleData.id}`, updatedArticle).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.errorMessage = "Could not update article. Please try again"
    });
  }
}
