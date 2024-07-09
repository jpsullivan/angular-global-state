import { Observable } from 'rxjs';

export type RxInput<T> = Observable<T> | T;
