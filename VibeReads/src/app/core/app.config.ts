import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { appRoutes } from '../app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideClientHydration(),
    importProvidersFrom(HttpClientModule, ReactiveFormsModule)
  ],
  
};
