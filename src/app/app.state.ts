import { InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';

export interface Task {
  id: number;
  label: string;
  done: boolean;
}

/**
 * Represents the global application state that caches data
 * used throughout the entire app.
 */
export interface AppState {
  tasks: Task[];
}

/**
 * An injection token to be used to inject an instance of `RxState<AppState>`
 * into a component. This is registered at the `AppModule` level so that components
 * all throughout the app can access global state contents.
 */
export const GLOBAL_RX_STATE = new InjectionToken<RxState<AppState>>(
  'GLOBAL_RX_STATE'
);
