import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ArticleCardComponent } from '@shared/components/article-card/article-card.component';

@NgModule({
    declarations: [DashboardComponent, ArticleCardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatIconModule,
        HeaderComponent,
    ],
})
export class DashboardModule { }
