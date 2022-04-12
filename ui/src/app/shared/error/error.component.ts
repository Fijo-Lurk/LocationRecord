import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  message = this.translateService.instant('dialog.genericServerError');

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
  ) {}

  onRetry() {
    this.http
      .get<{ message: string }>(this.data.url, this.data.body.studioUrl)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
