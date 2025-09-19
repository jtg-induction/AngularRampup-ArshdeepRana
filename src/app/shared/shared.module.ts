import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [CommonModule, RouterModule, HeaderComponent],
  exports: [HeaderComponent]
})
export class SharedModule { }
