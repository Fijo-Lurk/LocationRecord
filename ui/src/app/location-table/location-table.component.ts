import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  currentLang = this.translateService.currentLang;
  intlCollator = new Intl.Collator(this.currentLang, {
    usage: 'sort',
  });
  displayedColumns: string[] = [
    'customerId',
    'environment',
    'appId',
    'studioUrl',
    'option',
  ];

  data: LocationData[] = [];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource(this.data);
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public translateService: TranslateService,
    public dialog: MatDialog,
    private locationService: LocationService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.locationService.locations$.pipe(untilDestroyed(this)).subscribe(() => {
      this.findAndUpdate();
    });
  }

  findAndUpdate() {
    this.locationService
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe((locations: LocationData[]) => {
        locations.forEach((location) => {
          location.environment =
            location.environment[0].toUpperCase() +
            location.environment.slice(1);
        });
        locations.sort((a, b) => {
          return (
            this.compare(a.customerId, b.customerId) ||
            this.compare(a.environment, b.environment)
          );
        });
        locations.sort((a, b) =>
          this.intlCollator.compare(a.customerId, b.customerId)
        );
        this.data = locations;
        this.dataSource.data = locations;

        this.isLoadingResults = false;
      });
  }

  editColumn(location: LocationData) {
    this.dialog
      .open(FormDialogComponent, {
        data: location,
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((isEditDone) => {
        if (isEditDone) {
          this.findAndUpdate();
          this.snackBar.open(
            this.translateService.instant(
              'form.genericeFormSuccessfulCompleted'
            ),
            '',
            {
              duration: 2000,
              panelClass: ['green-snackbar'],
            }
          );
        }
        return;
      });
  }

  deleteColumn(element: LocationData) {
    element.environment = element.environment.toLowerCase();
    this.dialog
      .open(DeleteDialogComponent, {
        data: { value: element.customerId },
        minWidth: '30vw',
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((deleted) => {
        if (deleted) {
          this.locationService
            .delete(element)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              const filterArr = this.dataSource.data.filter(
                (data) => data.customerId !== element.customerId
              );
              this.dataSource.data = filterArr;
            });
          this.snackBar.open(
            this.translateService.instant(
              'snackBar.successfullyDeleteLocation'
            ),

            '',
            {
              duration: 2000,
            }
          );
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

  compare(a: string, b: string) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
  }
}
