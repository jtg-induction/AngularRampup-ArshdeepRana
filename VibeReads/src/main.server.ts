import { bootstrapApplication } from '@angular/platform-browser';

import { config } from '@core/app.config.server';
import { AppComponent } from '@core/components/app.component';

export const  bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
