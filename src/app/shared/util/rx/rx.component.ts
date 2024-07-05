import { inject } from '@angular/core';
import { GLOBAL_RX_STATE } from '../../../app.state';
import { trackById, trackByIndex } from '../track-by/track-by';
import { RxDirective } from './rx.directive';

export abstract class RxComponent<
  T extends object = {}
> extends RxDirective<T> {
  readonly globalState = inject(GLOBAL_RX_STATE);
  readonly trackById = trackById;
  readonly trackByIndex = trackByIndex;
}
