import { SIGNAL } from '@angular/core/primitives/signals';
import {
  RX_INPUT_NODE,
  RxInputNode,
  RxInputOptions,
  RxInputSignal,
} from './rx-input-types';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

export const RX_INPUT_SIGNAL = Symbol('RX_INPUT_SIGNAL');
export const REQUIRED_UNSET = Symbol('REQUIRED_UNSET');

/**
 * Creates an input signal node with proper typing and validation.
 * Internal function used by rxInput.
 */
export function createRxInputSignal<T>(
  initialValue: T,
  options?: RxInputOptions<T>
): RxInputSignal<T> {
  const node: RxInputNode<T> = Object.create(RX_INPUT_NODE);
  node.value = initialValue;
  node.transform = options?.transform;

  if (ngDevMode) {
    node.debugName = options?.debugName;
  }

  function inputSignal() {
    if (node.value === REQUIRED_UNSET) {
      throw new Error(
        ngDevMode
          ? `Input ${
              node.debugName || 'unknown'
            } is required but no value is available yet.`
          : ''
      );
    }
    return node.value;
  }

  // Add signal branding
  (inputSignal as any)[SIGNAL] = node;
  (inputSignal as any)[RX_INPUT_SIGNAL] = true;

  if (ngDevMode) {
    inputSignal.toString = () =>
      `[RxInput Signal${node.debugName ? `: ${node.debugName}` : ''}: ${
        node.value
      }]`;
  }

  return inputSignal as RxInputSignal<T>;
}

// Type guard for RxInputSignal
export function isRxInputSignal(
  value: unknown
): value is RxInputSignal<unknown> {
  return (
    !!value && typeof value === 'function' && !!(value as any)[RX_INPUT_SIGNAL]
  );
}
