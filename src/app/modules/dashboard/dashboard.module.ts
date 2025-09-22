import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ArticleCardComponent } from '@shared/components/article-card/article-card.component';
import { HeaderComponent } from '@shared/components/header/header.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';



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
