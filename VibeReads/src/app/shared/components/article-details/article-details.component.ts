import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'environments/environments';
import { jwtDecode } from "jwt-decode";

import { HeaderComponent } from '../header/header.component';


interface Article {
  id: number;
  title: string;
  author: string;
  description: string;
  tags: string[];
  body: string;
}

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  imports: [CommonModule, HeaderComponent, MatIconModule],
  standalone: true,
})
export class ArticleDetailsComponent implements OnInit {
  article?: Article;
  currentUsername = "";

  isExpanded = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  toggleDescription(event: Event) {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const userId = decoded?.sub;

        if (userId) {
          this.http.get<{ username: string }>(`${environment.apiUrl}/users/${userId}`).subscribe({
            next: (res) => this.currentUsername = res.username,
            error: (err) => console.error("Failed to fetch username:", err)
          });
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Article>(`${environment.apiUrl}/articles/${id}`).subscribe({
        next: (data) => this.article = data,
        error: (err) => console.error('Error fetching article details:', err)
      });
    }
  }

  goToEdit() {
  if (this.article) {
    this.router.navigate(['/edit', this.article.id]);
  }
}
}
