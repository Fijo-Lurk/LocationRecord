import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';

import { CreateTableDataComponent } from './create-table-data.component';

describe('CreateTableDataComponent', () => {
  let component: CreateTableDataComponent;
  let fixture: ComponentFixture<CreateTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTableDataComponent],
      imports: [
        AngularMaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { beforeClosed: () => of(true) } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
