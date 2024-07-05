import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { select, selectSlice } from '@rx-angular/state/selections';
import { Observable, filter, map, startWith } from 'rxjs';
import { RouterParams } from './router.model';

export const fallbackRouteToDefault = (route: string) =>
  route !== '/' ? route : 'list/all';

/**
 * This service maintains the router state and repopulates it to its subscriber.
 */
@Injectable({
  providedIn: 'root',
})
export class RouterState extends RxState<RouterParams> {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private _routerParams$: Observable<RouterParams> = this.router.events.pipe(
    select(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith('anyValue'),
      map(() => {
        // This is a naive way to reduce scripting of router service :)
        // Obviously the params relay on routing structure heavily and could be done more dynamically
        const [layout, identifier] = fallbackRouteToDefault(
          new URL(
            this.document.location.href,
            /* On SSR pre-render the location data are relative paths instead of valid absolute URLs, that's why we need to construct a new URL, with explicit origin (substituted by mock if pre-rendering) and then only consume pathname as our routing location */
            this.document.location.origin || 'http://mock.domain'
          ).pathname
        )
          .split('/')
          .slice(-2);

        return { layout, identifier };
      }),
      // emits if all values are given and set. (filters out undefined values and will not emit if one is undefined)
      selectSlice(['layout', 'identifier'])
    )
  ) as unknown as Observable<RouterParams>;
  routerParams$ = this.select();

  constructor() {
    super();
    this.connect(this._routerParams$);
  }
}
