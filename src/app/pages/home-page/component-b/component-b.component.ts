import { Component, Input } from '@angular/core';
import { selectSlice } from '@rx-angular/state/selections';
import { RxLet } from '@rx-angular/template/let';
import { map } from 'rxjs/operators';
import { Task } from '../../../app.state';
import { RxInput } from '../../../shared/util/rx/rx-input';
import { RxComponent } from '../../../shared/util/rx/rx.component';

interface ComponentBState {
  tasks: Task[];
}

@Component({
  selector: 'app-component-b',
  standalone: true,
  imports: [RxLet],
  templateUrl: './component-b.component.html',
  styleUrl: './component-b.component.scss',
})
export class ComponentBComponent extends RxComponent<ComponentBState> {
  @Input() set tasks(tasks: RxInput<Task[]>) {
    this.setProperty('tasks', tasks);
  }

  readonly taskTitles$ = this.select(
    selectSlice(['tasks']),
    map(({ tasks }) => tasks.map((t) => t.label))
  );
}
