import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { AppShellComponent } from './app-shell/app-shell.component';
import { MyComponent } from './mine.component';

@Component({
  selector: 'app-root',
  template: `
    <app-shell *rxLet="[]">
      <app-my-component [items]="items" />
      <router-outlet></router-outlet>
    </app-shell>
  `,
  standalone: true,
  imports: [AppShellComponent, MyComponent, RouterOutlet, RxLet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  items = ['hi'];
}
