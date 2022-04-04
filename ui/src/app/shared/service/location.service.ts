import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LocationData } from 'src/app/shared/location-data';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  apiUrl: string = environment.apiUrl;
  locations$: Observable<LocationData[]>;
  private _locations$: BehaviorSubject<LocationData[]>;
  httpOptions = new HttpHeaders({
    'X-Api-Access-Key': environment.apiKey,
    'content-type': 'application/json',
  });

  constructor(private http: HttpClient) {
    this._locations$ = new BehaviorSubject<LocationData[]>([]);
    this.locations$ = this._locations$.asObservable();
  }

  get locations(): LocationData[] {
    return this._locations$.getValue();
  }

  set locations(nextLocation: LocationData[]) {
    this._locations$.next(nextLocation);
  }

  create(params: LocationData) {
    let API_URL = `${this.apiUrl}/customer/${params.customerId}/environment/${params.environment}/app/${params.appId}`;
    return this.http.post<LocationData>(
      API_URL,
      { studioUrl: params.studioUrl },
      {
        headers: this.httpOptions,
      }
    );
  }
  findAll() {
    return this.http.get(`${this.apiUrl}`);
  }

  findOne(params: LocationData) {
    let API_URL = `${this.apiUrl}/customer/${params.customerId}/environment/${params.environment}/app/${params.appId}`;
    return this.http.get(API_URL, { headers: this.httpOptions });
  }

  update(params: LocationData, newLocation: string): Observable<any> {
    let API_URL = `${this.apiUrl}/customer/${params.customerId}/environment/${params.environment}/app/${params.appId}`;
    return this.http.patch(API_URL, newLocation, {
      headers: this.httpOptions,
    });
  }

  delete(params: LocationData): Observable<any> {
    let API_URL = `${this.apiUrl}/customer/${params.customerId}/environment/${params.environment}/app/${params.appId}`;
    return this.http.delete(API_URL, { headers: this.httpOptions });
  }
}
