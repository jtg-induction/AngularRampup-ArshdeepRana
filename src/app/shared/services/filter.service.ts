import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

export interface ArticleFilters {
    startDate?: string;
    endDate?: string;
    tags?: string[];
}

@Injectable({ providedIn: 'root' })
export class FilterService {
    private filtersSubject = new BehaviorSubject<ArticleFilters>({});
    filters$ = this.filtersSubject.asObservable();

    constructor(private router: Router, private route: ActivatedRoute) { }

    setFilters(filters: ArticleFilters) {
        this.filtersSubject.next(filters);

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                startDate: filters.startDate || null,
                endDate: filters.endDate || null,
                tags: filters.tags?.length ? filters.tags.join(',') : null,
            },
            queryParamsHandling: 'merge',
        });
    }

    loadFiltersFromUrl() {
        const params = this.route.snapshot.queryParams;
        const filters: ArticleFilters = {
            startDate: params['startDate'] || undefined,
            endDate: params['endDate'] || undefined,
            tags: params['tags'] ? params['tags'].split(',') : [],
        };
        this.filtersSubject.next(filters);
    }
}
