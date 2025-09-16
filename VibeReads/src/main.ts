import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from '@core/app.config';
import { AppComponent } from '@core/components/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
