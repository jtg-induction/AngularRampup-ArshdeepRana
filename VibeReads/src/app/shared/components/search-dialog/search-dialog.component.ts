import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { environment } from 'environments/environments';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, FormsModule, CommonModule]
})
export class SearchDialogComponent {
  query = '';
  articles: any[] = [];
  isLoading = false;
  hasSearched = false; 

  constructor(
    private dialogRef: MatDialogRef<SearchDialogComponent>,
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.query.trim()) return;

    this.isLoading = true;
    this.hasSearched = true; 

    this.http
      .get<any[]>(`${environment.apiUrl}/articles?author_like=${this.query}`)
      .subscribe({
        next: (res) => {
          this.articles = res;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching articles', err);
          this.isLoading = false;
        }
      });
  }

  goToArticle(id: number) {
    this.dialogRef.close();
    this.router.navigate([`/article/${id}`]);
  }

  close() {
    this.dialogRef.close();
  }
}
