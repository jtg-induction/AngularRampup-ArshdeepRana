import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ArticleDetailsComponent } from './article-details.component';
import { ArticleDetailsRoutingModule } from './article-details-routing.module';
import { HeaderComponent } from '../header/header.component';

@NgModule({
    declarations: [ArticleDetailsComponent],
    imports: [
        CommonModule,
        MatIconModule,
        HeaderComponent,
        ArticleDetailsRoutingModule,
    ],
})
export class ArticleDetailsModule { }
