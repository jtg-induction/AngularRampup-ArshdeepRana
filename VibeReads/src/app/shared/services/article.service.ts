import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environments';

@Injectable({ providedIn: 'root' })
export class ArticleService {

  constructor(private http: HttpClient) {}

  getArticles(filters?: { startDate?: string; endDate?: string; tags?: string[] }): Observable<any[]> {
    let params: string[] = [];

    if (filters?.startDate) {
      params.push(`date_gte=${filters.startDate}`);
    }
    if (filters?.endDate) {
      params.push(`date_lte=${filters.endDate}`);
    }
    if (filters?.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => params.push(`tags_like=${tag}`));
    }

    const query = params.length ? `?${params.join('&')}` : '';
    return this.http.get<any[]>(`${environment.apiUrl}/articles${query}`);
  }
}
