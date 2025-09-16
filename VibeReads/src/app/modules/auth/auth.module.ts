import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'signup', pathMatch: 'full' }
    ])
  ]
})
export class AuthModule {}
