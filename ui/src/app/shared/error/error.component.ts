import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  message = this.translateService.instant('dialog.genericServicerError');

  constructor(
    private translateService: TranslateService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: string;
      code: number;
      retry: boolean;
      url: string;
      body: any;
    }
  ) {
    console.log(data.message);
  }

  onRetry() {
    this.http
      .get<{ message: string }>(this.data.url, this.data.body.studioUrl)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
