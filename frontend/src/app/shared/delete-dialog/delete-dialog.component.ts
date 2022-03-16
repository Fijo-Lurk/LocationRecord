import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationData } from 'src/app/location-table/location-data';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  @ViewChild('ok', { static: false }) okButton!: MatButton;
  @ViewChild('cancel', { static: false }) cancelButton!: MatButton;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      subMessage: string;
      value: LocationData;
    },
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.data.title =
      this.data.title ||
      this.translateService.instant('dialog.genericConfirmActionTitle');
    this.data.message =
      this.data.message ||
      this.translateService.instant('dialog.specificDeleteMessage');
    this.data.subMessage =
      this.data.subMessage ||
      this.translateService.instant('dialog.genericWarningOnDeleteMessage');
  }
}
