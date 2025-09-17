import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export interface ArticleFilters {
  startDate?: string;
  endDate?: string;
  tags?: string[];
}

@Injectable({ providedIn: 'root' })
export class FilterService {
  private filtersSubject = new BehaviorSubject<ArticleFilters>({});
  filters$ = this.filtersSubject.asObservable();

  setFilters(filters: ArticleFilters) {
    this.filtersSubject.next(filters);
  }
}
