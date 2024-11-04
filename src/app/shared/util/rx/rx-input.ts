import {
  assertInInjectionContext,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { rxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import {
  createRxInputSignal,
  REQUIRED_UNSET,
  RX_INPUT_SIGNAL,
} from './rx-input-signal';
import { RxInputNode, RxInputOptions } from './rx-input-types';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

/**
 * Creates an input signal that integrates with RxState.
 * Must be called in injection context (constructor or field initializer).
 *
 * @example
 * ```ts
 * export class MyComponent {
 *   private state = rxState<{ count: number }>();
 *
 *   // Basic input with initial value
 *   [count, count$] = rxInput(this.state, 'count', 0);
 *
 *   // Input with transform
 *   [value, value$] = rxInput(this.state, 'value', '', {
 *     transform: (v: string) => v.trim()
 *   });
 * }
 * ```
 */
export function rxInput<
  TState extends object,
  TKey extends keyof TState,
  TValue extends TState[TKey]
>(
  state: ReturnType<typeof rxState<TState>>,
  stateProperty: TKey,
  initialValue?: TValue,
  options: RxInputOptions<TValue> = {}
  // ): readonly [Signal<TValue>, Observable<TState[TKey]>] {
): Observable<TState[TKey]> {
  if (ngDevMode) {
    try {
      assertInInjectionContext(rxInput);
    } catch {
      throw new Error(
        'rxInput must be called from an injection context (constructor or field initializer)'
      );
    }
  }

  const destroyRef = inject(DestroyRef);
  const debugName = options.debugName || String(stateProperty);

  // Create the input signal
  const inputSignal = createRxInputSignal(initialValue as TValue, {
    ...options,
    debugName,
  });
  const node = (inputSignal as any)[RX_INPUT_SIGNAL] as RxInputNode<TValue>;

  // Set up effect to sync state changes back to input
  effect(
    () => {
      const stateValue = state.get(stateProperty);
      if (stateValue !== node.value) {
        node.value = stateValue as TValue;
      }
    },
    { allowSignalWrites: true }
  );

  // Get observable from state
  const stateObservable = state.select(stateProperty);

  // Define property descriptor for input binding
  const propertyKey = options.alias || stateProperty;

  if (ngDevMode) {
    // Check if property is already defined
    if (
      Object.getOwnPropertyDescriptor(state.constructor.prototype, propertyKey)
    ) {
      throw new Error(
        `Input property '${String(propertyKey)}' is already defined`
      );
    }
  }

  Object.defineProperty(state.constructor.prototype, propertyKey, {
    get(): TValue {
      return node.value;
    },
    set(value: TValue): void {
      const newValue = node.transform ? node.transform(value) : value;
      node.value = newValue;
      state.set({ [stateProperty]: newValue } as Partial<TState>);
    },
    configurable: true,
    enumerable: true,
  });

  // Clean up on destroy
  destroyRef.onDestroy(() => {
    // Any necessary cleanup
  });

  // return [inputSignal as Signal<TValue>, stateObservable] as const;
  return stateObservable;
}

/**
 * Creates a required input signal that integrates with RxState.
 * Similar to rxInput but enforces that the input must be provided.
 *
 * @example
 * ```ts
 * export class MyComponent {
 *   private state = rxState<{ required: string }>();
 *
 *   // Required input that must be provided by parent
 *   [required, required$] = requiredRxInput(this.state, 'required');
 * }
 * ```
 */
export function requiredRxInput<
  TState extends object,
  TKey extends keyof TState,
  TValue extends TState[TKey]
>(
  state: ReturnType<typeof rxState<TState>>,
  stateProperty: TKey,
  options: Omit<RxInputOptions<TValue>, 'required'> = {}
  // ): readonly [Signal<TValue>, Observable<TState[TKey]>] {
): Observable<TState[TKey]> {
  return rxInput(state, stateProperty, REQUIRED_UNSET as unknown as TValue, {
    ...options,
  });
}
