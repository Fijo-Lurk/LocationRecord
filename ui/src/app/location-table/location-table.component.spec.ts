import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';

import { LocationTableComponent } from './location-table.component';

describe('LocationListComponent', () => {
  let component: LocationTableComponent;
  let fixture: ComponentFixture<LocationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationTableComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
