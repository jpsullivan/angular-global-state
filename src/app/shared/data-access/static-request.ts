import { Connectable, Observable, publishReplay } from 'rxjs';

/**
 * Used for single requests which needs to be fetched only one time
 * where afterwards it is enough to replay.
 *
 * Useful for things like app configs, languages, menu items, etc.
 * @param fn
 */
export function staticRequest<T, O = T>(
  fn: () => Observable<T>
): () => Observable<O> {
  let _g: Observable<O>;
  return () => {
    if (!_g) {
      _g = fn().pipe(publishReplay(1)) as unknown as Connectable<O>;
      (_g as Connectable<O>).connect();
    }

    return _g;
  };
}
