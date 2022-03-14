import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTableDataComponent } from './create-table-data.component';

describe('CreateTableDataComponent', () => {
  let component: CreateTableDataComponent;
  let fixture: ComponentFixture<CreateTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTableDataComponent ]
    })
    .compileComponents();
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
