import { rxState } from '@rx-angular/state';
import { isObservable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class RxDirective<T extends object = never> {
  protected readonly state = rxState<T>();
  private readonly pendingBindings: Array<
    (state: ReturnType<typeof rxState<T>>) => void
  > = [];

  constructor() {
    // Handle any pending bindings from field initialization
    queueMicrotask(() => {
      this.pendingBindings.forEach((bind) => bind(this.state));
      this.pendingBindings.length = 0;
    });
  }

  protected addBinding(
    binding: (state: ReturnType<typeof rxState<T>>) => void
  ) {
    this.pendingBindings.push(binding);
  }

  readonly state$ = this.state.select();

  protected setState(state: Partial<T> | Observable<Partial<T>>) {
    if (isObservable(state)) {
      this.state.connect(state);
    } else {
      this.state.set(state);
    }
  }

  protected setProperty(
    key: keyof T,
    value: T[keyof T] | Observable<T[keyof T]>
  ) {
    if (isObservable(value)) {
      this.state.connect(
        value.pipe(map((emission) => ({ [key]: emission } as any)))
      );
    } else {
      this.state.set({ [key]: value } as any);
    }
  }

  protected get = this.state.get;
  protected set = this.state.set;
  protected connect = this.state.connect;
  protected select = this.state.select;
  protected computed = this.state.computed;
  protected computedFrom = this.state.computedFrom;
  protected signal = this.state.signal;

  // ngOnChanges() {
  //   console.count('ng-on-changes-' + Math.floor(Date.now() / 5000));
  // }
}
