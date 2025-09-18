import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { FilterService } from '@shared/services/filter.service';

import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private filterService: FilterService
  ) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  openSearchDialog() {
    this.dialog.open(SearchDialogComponent, {
      width: '500px',
      disableClose: true
    });
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((filters) => {
      if (filters) {
        this.filterService.setFilters(filters);
      }
    });
  }
}
