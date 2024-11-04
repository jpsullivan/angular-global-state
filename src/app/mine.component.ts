import { Component } from '@angular/core';
import { requiredRxInput, rxInput } from './shared/util/rx/rx-input';
import { RxComponent } from './shared/util/rx/rx.component';

interface MyComponentState {
  items: string[];
  requiredItems: string[];
}

@Component({
  selector: 'app-my-component',
  standalone: true,
  template: ``,
})
export class MyComponent extends RxComponent<MyComponentState> {
  items$ = rxInput(this.state, 'items', []);

  // Or for required inputs:
  y = requiredRxInput(this.state, 'requiredItems');

  constructor() {
    super();
    console.log('sup');
  }
}
