import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  standalone: true, 
  imports: [CommonModule]
})
export class ArticleCardComponent {
  @Input() id!: number;
  @Input() title = '';
  @Input() author = '';
  @Input() description = '';
  @Input() tags: string[] = [];

  tagColors: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.tagColors = this.tags.slice(0, 3).map(() => this.getRandomColor());
  }

  private getRandomColor(): string {
    const colors = [
      '#FF6B6B', '#6BCB77', '#4D96FF',
      '#FFD93D', '#FF9F1C', '#9D4EDD', '#00B8A9',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }


  goToDetails() {
    this.router.navigate(['/article', this.id]);
  }
}

