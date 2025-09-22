import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from 'app/app.component';

import { SharedModule } from '@shared/shared.module';

import { appRoutes, AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})

export class AppModule { }
