import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from '@core/app.config';
import { AppComponent } from '@core/components/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
