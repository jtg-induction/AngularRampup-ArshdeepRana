import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ArticleFormComponent } from "@shared/components/article-form/article-form.component";
import { HeaderComponent } from "@shared/components/header/header.component";

import { EditArticleRoutingModule } from "./edit-article-routing.module";
import { EditArticleComponent } from "./edit-article.component";


@NgModule({
    declarations: [EditArticleComponent],
    imports: [
        CommonModule,
        EditArticleRoutingModule,
        HeaderComponent,
        ArticleFormComponent,
    ],
})
export class EditArticleModule { }
