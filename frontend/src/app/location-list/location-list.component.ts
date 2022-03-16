import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { FormDialogComponent } from '../shared/form-dialog/form-dialog.component';
import { LocationData } from './location-data';

const ELEMENT_DATA: LocationData[] = [
  {
    id: 1,
    customer_id: 'cust123',
    environment: 'dev',
    app_id: 'com.smithmicro.work',
    studio_url: 'H656565',
  },
  {
    id: 2,
    customer_id: 'cust123',
    environment: 'test',
    app_id: 'com.smithmicro.work',
    studio_url: ' "https://viewspot-home-cust123.....',
  },
  {
    id: 3,
    customer_id: 'Filip',
    environment: 'dev',
    app_id: 'com.smithmicro.work',
    studio_url: ' "https://viewspot-home-cust123.....',
  },
  {
    id: 4,
    customer_id: 'cust123',
    environment: 'dev',
    app_id: 'com.smithmicro.work',
    studio_url: 'H',
  },
  {
    id: 5,
    customer_id: 'test',
    environment: 'prod',
    app_id: 'com.smithmicro.work',
    studio_url: 'H23',
  },
  {
    id: 6,
    customer_id: 'woop',
    environment: 'test',
    app_id: 'com.smithmicro.work',
    studio_url: ' "https://viewspot-home-cust123.....',
  },
  {
    id: 7,
    customer_id: 'cust123',
    environment: 'dev',
    app_id: 'com.smithmicro.work',
    studio_url: 'H876',
  },
  {
    id: 8,
    customer_id: 'cust123',
    environment: 'dev',
    app_id: 'com.smithmicro.work',
    studio_url: 'H876',
  },
  {
    id: 9,
    customer_id: 'cust123',
    environment: 'dev',
    app_id: 'com.smithmicro.work',
    studio_url: 'H876',
  },
  {
    id: 10,
    customer_id: 'cust123',
    environment: 'dev',
    app_id: 'com.smithmicro.work',
    studio_url: 'H876',
  },
  {
    id: 11,
    customer_id: 'cust123',
    environment: 'dev',
    app_id: 'com.smithmicro.work',
    studio_url: 'H876',
  },
];

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent {
  constructor(
    public translateService: TranslateService,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = [
    'customer_id',
    'environment',
    'app_id',
    'studio_url',
    'option',
  ];
  dataToDisplay = [...ELEMENT_DATA];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editColumn(element: LocationData) {
    console.log('edit column with id of', element.id);
    this.dialog
      .open(FormDialogComponent, {
        data: element,
      })
      .afterClosed()
      .subscribe((isEdit) => {
        console.log(isEdit);
      });
  }

  deleteColumn(element: LocationData) {
    this.dialog
      .open(DeleteDialogComponent, {
        data: { value: element.customer_id },
        minWidth: '30vw',
      })
      .afterClosed()
      .subscribe((deleted) => {
        console.log('items is close', deleted);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
