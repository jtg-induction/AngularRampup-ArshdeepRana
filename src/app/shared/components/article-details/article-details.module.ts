import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ArticleDetailsRoutingModule } from './article-details-routing.module';
import { ArticleDetailsComponent } from './article-details.component';
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
