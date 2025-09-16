import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ArticleCardComponent } from '@shared/components/article-card/article-card.component';
import { environment } from 'environments/environments';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FilterService, ArticleFilters } from '@shared/services/filter.service';
import { Subscription } from 'rxjs';

interface Article {
  id: number;
  title: string;
  author: string;
  description: string;
  tags: string[];
  date?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [HeaderComponent, ArticleCardComponent, CommonModule, MatIconModule],
  standalone: true
})
export class DashboardComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  totalArticles = 0;
  currentPage = 1;
  pageSize = 6;
  filters: ArticleFilters = {};
  private sub!: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['pageNumber'] || 1;
      this.loadArticles();
    });

    this.sub = this.filterService.filters$.subscribe(f => {
      this.filters = f;
      this.currentPage = 1; 
      this.updateUrl();
      this.loadArticles();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  loadArticles(): void {
    let query = `_page=${this.currentPage}&_limit=${this.pageSize}`;

    if (this.filters.startDate) query += `&date_gte=${this.filters.startDate}`;
    if (this.filters.endDate) query += `&date_lte=${this.filters.endDate}`;
    if (this.filters.tags && this.filters.tags.length > 0) {
      this.filters.tags.forEach(tag => (query += `&tags_like=${tag}`));
    }

    this.http.get<Article[]>(`${environment.apiUrl}/articles?${query}`, { observe: 'response' }).subscribe({
      next: (response: HttpResponse<Article[]>) => {
        this.totalArticles = +(response.headers.get('X-Total-Count') || 0);
        this.articles = response.body || [];
      },
      error: err => console.error('Failed to fetch articles:', err)
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateUrl();
      this.loadArticles();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateUrl();
      this.loadArticles();
    }
  }

  updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pageNumber: this.currentPage },
      queryParamsHandling: 'merge'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get totalPages(): number {
    return Math.ceil(this.totalArticles / this.pageSize);
  }
}
