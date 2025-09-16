import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environments';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, HeaderComponent,],
  standalone: true,
})
export class ArticleDetailsComponent implements OnInit {
  article?: Article;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  isExpanded = false;

  toggleDescription(event: Event) {
        event.stopPropagation();
        this.isExpanded = !this.isExpanded;
    }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Article>(`${environment.apiUrl}/articles/${id}`).subscribe({
        next: (data) => this.article = data,
        error: (err) => console.error('Error fetching article details:', err)
      });
    }
  }
}
