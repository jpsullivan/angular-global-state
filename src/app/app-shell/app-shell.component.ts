import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RxLet } from '@rx-angular/template/let';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RxLet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  public sidebarOpen = signal(false);
}
