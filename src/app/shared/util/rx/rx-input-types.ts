import { Signal } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { Observable } from 'rxjs';

// Symbols for type branding and internal use
export const RX_INPUT_SIGNAL_BRAND = Symbol('RX_INPUT_SIGNAL_BRAND');
export const REQUIRED_UNSET = Symbol('REQUIRED_UNSET');

export type RxInputSource<T> = Observable<T> | T;

export type RxInputOptions<T> = {
  alias?: string;
  transform?: (value: T) => T;
  debugName?: string;
};

export interface RxInputNode<T> {
  // Current value of the input
  value: T;
  // Transform function to be applied on input changes
  transform?: (value: T) => T;
  // Debug name for devtools
  debugName?: string;
}

export const RX_INPUT_NODE: RxInputNode<unknown> = {
  value: undefined,
  transform: undefined,
};

// Define the return type with proper generic typing
export type RxInputReturn<T> = readonly [Signal<T>, Observable<T>];

// Type to ensure our input signal has the same shape as Angular's
export interface RxInputSignal<T> extends Signal<T> {
  [SIGNAL]: RxInputNode<T>;
  [RX_INPUT_SIGNAL_BRAND]: true;
}
