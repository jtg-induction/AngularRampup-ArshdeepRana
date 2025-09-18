import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ArticleFormComponent implements OnInit, OnChanges {
  @Input() initialData: any = null;
  @Input() submitLabel = "Publish";
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(20)]],
      tags: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.form.patchValue({
        title: this.initialData.title || '',
        description: this.initialData.description || '',
        body: this.initialData.body || '',
        tags: this.initialData.tags ? this.initialData.tags.join(', ') : ''
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = {
      title: this.f['title'].value,
      description: this.f['description'].value,
      body: this.f['body'].value,
      tags: this.f['tags'].value
        ? this.f['tags'].value.split(',').map((t: string) => t.trim())
        : []
    };

    this.formSubmit.emit(formValue);
  }
}
