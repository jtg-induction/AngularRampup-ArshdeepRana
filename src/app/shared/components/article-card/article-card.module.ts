import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArticleCardComponent } from './article-card.component';

@NgModule({
    declarations: [ArticleCardComponent],
    imports: [CommonModule],
    exports: [ArticleCardComponent]
})
export class ArticleCardModule { }
