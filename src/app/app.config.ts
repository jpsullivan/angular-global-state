import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { routes } from './app.routes';
import { AppState, GLOBAL_RX_STATE } from './app.state';
import { withGlobalStateInitializer } from './state/state-app-initializer.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: GLOBAL_RX_STATE,
      useFactory: () => new RxState<AppState>(),
    },

    /**
     * Fetch data visible in viewport on app bootstrap instead of component init.
     * Greatly improves performance on LCP, TTI
     */
    withGlobalStateInitializer(),

    /**
     * **Perf Tip for TBT (Total blocking time):**
     * Chunk app bootstrap over APP_INITIALIZER to manage bundle sizes.
     */
    {
      provide: APP_INITIALIZER,
      useFactory: () => (): Promise<void> =>
        new Promise<void>((resolve) => {
          setTimeout(() => resolve());
        }),
      deps: [],
      multi: true,
    },
  ],
};
