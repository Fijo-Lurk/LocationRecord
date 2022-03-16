import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import * as enTranslation from '../assets/i18n/en.json';
import * as svTranslation from '../assets/i18n/se.json';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'location'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('location');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'location app is running!'
    );
  });

  it(`should check if the two objects has the same keys`, () => {
    const enTranslationsKeys = Object.keys(enTranslation[`default`]);
    const svTranslationsKeys = Object.keys(svTranslation[`default`]);
    expect(enTranslationsKeys).toEqual(svTranslationsKeys);
  });
});
