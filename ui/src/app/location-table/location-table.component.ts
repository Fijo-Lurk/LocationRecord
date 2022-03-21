import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { FormDialogComponent } from '../shared/form-dialog/form-dialog.component';
import { LocationService } from '../shared/service/location.service';
import { LocationData } from '../shared/location-data';

@UntilDestroy()
@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss'],
})
export class LocationTableComponent implements OnInit {
  constructor(
    public translateService: TranslateService,
    public dialog: MatDialog,
    private locationService: LocationService
  ) {}
  displayedColumns: string[] = [
    'customer_id',
    'environment',
    'app_id',
    'studio_url',
    'option',
  ];
  data: LocationData[] = [];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.locationService.findAll().subscribe((location: LocationData[]) => {
      this.data = location;
      this.dataSource.data = location;
    });
  }

  editColumn(element: LocationData) {
    this.dialog
      .open(FormDialogComponent, {
        data: element,
      })
      .afterClosed()
      .subscribe((isEditDone) => {
        if (isEditDone) {
          this.locationService
            .findAll()
            .pipe(untilDestroyed(this))
            .subscribe((value: LocationData[]) => {
              this.dataSource.data = value;
            });
        }
      });
  }

  deleteColumn(element: LocationData) {
    this.dialog
      .open(DeleteDialogComponent, {
        data: { value: element.customer_id },
        minWidth: '30vw',
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((deleted) => {
        if (deleted) {
          this.locationService.delete(element).subscribe(() => {
            const filterArr = this.dataSource.data.filter(
              (data) => data.customer_id !== element.customer_id
            );
            this.dataSource.data = filterArr;
          });
        }
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
