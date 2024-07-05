import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'ct-not-found',
  template: ` <div class="not-found-container">
    <h1 class="title">Page not found</h1>
  </div>`,
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundPageComponent {}
