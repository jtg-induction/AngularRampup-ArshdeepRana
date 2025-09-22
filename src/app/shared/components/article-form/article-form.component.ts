import { CommonModule } from "@angular/common";
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";

import { Article } from "@shared/models";

@Component({
    selector: "app-article-form",
    templateUrl: "./article-form.component.html",
    styleUrls: ["./article-form.component.scss"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
})
export class ArticleFormComponent implements OnInit, OnChanges {
    @Input() initialData?: Partial<Article> | null = null;
    @Input() submitLabel = "Publish";
    @Output() formSubmit = new EventEmitter<Partial<Article>>();

    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ["", [Validators.required, Validators.minLength(5)]],
            description: ["", [Validators.required, Validators.minLength(10)]],
            body: ["", [Validators.required, Validators.minLength(20)]],
            tags: [""],
        });

        if (this.initialData) {
            this.patchForm(this.initialData);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["initialData"] && this.initialData && this.form) {
            this.patchForm(this.initialData);
        }
    }

    private patchForm(data: Partial<Article>): void {
        this.form.patchValue({
            title: data.title || "",
            description: data.description || "",
            body: data.body || "",
            tags: data.tags ? data.tags.join(", ") : "",
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const formValue: Partial<Article> = {
            title: this.f["title"].value,
            description: this.f["description"].value,
            body: this.f["body"].value,
            tags: this.f["tags"].value
                ? this.f["tags"].value.split(",").map((t: string) => t.trim())
                : [],
        };

        this.formSubmit.emit(formValue);
    }
}
