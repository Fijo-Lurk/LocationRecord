import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocationData } from 'src/app/shared/location-data';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  apiUrl: string = environment.apiUrl;

  httpOptions = new HttpHeaders({
    'x-api-key': environment.apiKey,
    'content-type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  create(params: LocationData) {
    let API_URL = `${this.apiUrl}/customer/${params.customer_id}/environment/${params.environment}/app/${params.app_id}`;
    return this.http.post<LocationData>(API_URL, params, {
      headers: this.httpOptions,
    });
  }

  findAll() {
    return this.http.get(`${this.apiUrl}`);
  }

  findOne(params: LocationData) {
    let API_URL = `${this.apiUrl}/customer/${params.customer_id}/environment/${params.environment}/app/${params.app_id}`;
    return this.http.get(API_URL, { headers: this.httpOptions });
  }

  update(params: LocationData, newLocation: LocationData): Observable<any> {
    let API_URL = `${this.apiUrl}/customer/${params.customer_id}/environment/${params.environment}/app/${params.app_id}`;
    return this.http.patch(API_URL, newLocation, { headers: this.httpOptions });
  }

  delete(params: LocationData): Observable<any> {
    let API_URL = `${this.apiUrl}/customer/${params.customer_id}/environment/${params.environment}/app/${params.app_id}`;
    return this.http.delete(API_URL, { headers: this.httpOptions });
  }
}
