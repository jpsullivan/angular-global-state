import { Component } from '@angular/core';
import { selectSlice } from '@rx-angular/state/selections';
import { map } from 'rxjs/operators';
import { RxComponent } from '../../shared/util/rx/rx.component';
import { ComponentAComponent } from './component-a/component-a.component';
import { ComponentBComponent } from './component-b/component-b.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ComponentAComponent, ComponentBComponent],
  template: `
    <app-component-a />
    <app-component-b [tasks]="tasks$" />
  `,
  styleUrl: './home-page.component.scss',
})
export default class HomePageComponent extends RxComponent {
  readonly tasks$ = this.globalState.select(
    selectSlice(['tasks']),
    map(({ tasks }) => tasks)
  );
}
