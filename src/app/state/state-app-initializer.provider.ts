import { APP_INITIALIZER } from '@angular/core';
import { take } from 'rxjs';
import { PreferencesService } from '../shared/services/preferences/preferences.service';
import { RouterState } from './router/router.state';

/**
 * Uses `APP_INITIALIZER` and an init method in data services to run data fetching
 * on app bootstrap instead of component initialization for tigher performance (LCP, TTI).
 */
export function withGlobalStateInitializer() {
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: (
        routerState: RouterState,
        preferencesService: PreferencesService
      ) => {
        return (): void => {
          // user prefs prefetch
          preferencesService
            .getUserPreferencesCached()
            .pipe(take(1))
            .subscribe();
          // initial route prefetch
          routerState.routerParams$
            .pipe(take(1))
            .subscribe(({ layout, identifier }) => {
              // someSpecificState.initialize({ entityId: identifier })
            });
        };
      },
      deps: [RouterState, PreferencesService],
      multi: true,
    },
  ];
}
