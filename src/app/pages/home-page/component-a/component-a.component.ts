import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Task } from '../../../app.state';
import { RxComponent } from '../../../shared/util/rx/rx.component';

@Component({
  selector: 'app-component-a',
  standalone: true,
  imports: [],
  templateUrl: './component-a.component.html',
  styleUrl: './component-a.component.scss',
})
export class ComponentAComponent extends RxComponent {
  constructor() {
    super();

    const tasks: Task[] = [
      {
        id: 1,
        label: 'The first task',
        done: false,
      },
      {
        id: 2,
        label: 'The second task',
        done: false,
      },
      {
        id: 3,
        label: 'The last task',
        done: false,
      },
    ];

    setTimeout(() => {
      this.globalState.connect('tasks', of(tasks));
    }, 3000);
  }
}
