import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ArticleFormComponent } from "@shared/components/article-form/article-form.component";
import { HeaderComponent } from "@shared/components/header/header.component";

import { AddArticleRoutingModule } from "./add-article-routing.module";
import { AddArticleComponent } from "./add-article.component";


@NgModule({
    declarations: [AddArticleComponent],
    imports: [
        CommonModule,
        AddArticleRoutingModule,
        HeaderComponent,
        ArticleFormComponent,
    ],
})
export class AddArticleModule { }
