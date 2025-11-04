import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environments';
import { ArticleFilters } from '@shared/services/filter.service';

@Component({
    selector: 'app-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrls: ['./filter-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, FormsModule, CommonModule]
})
export class FilterDialogComponent implements OnInit {
    startDate = '';
    endDate = '';
    selectedTags: string[] = [];
    availableTags: string[] = [];

    constructor(
        private dialogRef: MatDialogRef<FilterDialogComponent>,
        private http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: ArticleFilters
    ) { }

    ngOnInit(): void {
        if (this.data) {
            this.startDate = this.data.startDate || '';
            this.endDate = this.data.endDate || '';
            this.selectedTags = this.data.tags || [];
        }

        this.http.get<any[]>(`${environment.apiUrl}/articles`).subscribe({
            next: (articles) => {
                const tags = articles.flatMap(a => a.tags || []);
                this.availableTags = [...new Set(tags)];
            },
            error: (err) => console.error('Error fetching tags', err)
        });
    }

    toggleTag(tag: string) {
        if (this.selectedTags.includes(tag)) {
            this.selectedTags = this.selectedTags.filter(t => t !== tag);
        } else {
            this.selectedTags.push(tag);
        }
    }

    applyFilters() {
        this.dialogRef.close({
            startDate: this.startDate,
            endDate: this.endDate,
            tags: this.selectedTags
        });
    }

    clearFilters() {
        this.startDate = '';
        this.endDate = '';
        this.selectedTags = [];
    }

    close() {
        this.dialogRef.close();
    }
}
