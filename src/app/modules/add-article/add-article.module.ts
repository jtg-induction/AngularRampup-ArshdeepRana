import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddArticleComponent } from "./add-article.component";
import { AddArticleRoutingModule } from "./add-article-routing.module";

import { HeaderComponent } from "@shared/components/header/header.component";
import { ArticleFormComponent } from "@shared/components/article-form/article-form.component";

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
