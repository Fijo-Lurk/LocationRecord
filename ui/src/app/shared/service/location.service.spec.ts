/* tslint:disable:no-unused-variable */

import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { LocationService } from './location.service';

describe('Service: Location', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService, HttpClient, HttpHandler],
    });
  });

  it('should ...', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});
