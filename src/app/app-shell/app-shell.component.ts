import { Component, inject } from '@angular/core';
import { RxState } from '@rx-angular/state';

interface AppShellState {
  sidebarOpen: boolean;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  private readonly state = inject<RxState<AppShellState>>(RxState);

  readonly viewState$ = this.state.select();
}
