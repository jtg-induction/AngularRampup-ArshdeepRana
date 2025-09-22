import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
    @Input() id!: number;
    @Input() title = '';
    @Input() author = '';
    @Input() description = '';
    @Input() tags: string[] = [];

    tagColors: string[] = [];

    private readonly colors: string[] = [
        '#FF6B6B',
        '#6BCB77',
        '#4D96FF',
        '#FFD93D',
        '#FF9F1C',
        '#9D4EDD',
        '#00B8A9',
    ];

    constructor(private router: Router) { }

    ngOnInit() {
        this.tagColors = this.tags.slice(0, 3).map((_, index) => this.getColor(index));
    }

    private getColor(index: number): string {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    goToDetails() {
        this.router.navigate(['/articles', this.id]);
    }
}
