import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { staticRequest } from '../../data-access/static-request';

type PreferencesResponse = Record<string, any>;

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private readonly http: HttpClient = inject(HttpClient);

  getUserPreferences = (): Observable<PreferencesResponse> =>
    this.http.get<PreferencesResponse>('/api/my-preferences');

  getUserPreferencesCached = staticRequest(this.getUserPreferences);
}
