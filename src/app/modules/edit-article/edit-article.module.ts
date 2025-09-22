import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EditArticleComponent } from "./edit-article.component";
import { EditArticleRoutingModule } from "./edit-article-routing.module";

import { HeaderComponent } from "@shared/components/header/header.component";
import { ArticleFormComponent } from "@shared/components/article-form/article-form.component";

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
