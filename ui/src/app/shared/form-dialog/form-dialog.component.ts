import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { LocationService } from '../service/location.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@UntilDestroy()
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  @ViewChild('update', { static: false }) okButton!: MatButton;
  @ViewChild('cancel', { static: false }) cancelButton!: MatButton;
  environment = ['production', 'staging', 'development', 'sandbox1'];
  selectedEnvironment = this.data.environment;

  urlValidator: ValidatorFn = (control: AbstractControl) => {
    let validUrl = true;
    try {
      new URL(control.value);
    } catch {
      validUrl = false;
    }
    return validUrl ? null : { invalidUrl: true };
  };

  normalizeUrl(url: string): string {
    const validUrl = new URL(url);
    if (validUrl.pathname === '/') {
      validUrl.pathname = '';
    }
    return validUrl.toString();
  }

  public locationForm = new FormGroup({
    studioUrl: new FormControl(this.data.studioUrl, [
      Validators.required,
      this.urlValidator,
      Validators.pattern('https?://([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
    ]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customerId: string;
      environment: string;
      appId: string;
      studioUrl: string;
    },
    public translateService: TranslateService,
    private locationService: LocationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit(form: FormGroupDirective) {
    form.value.studioUrl = form.value.studio_url.trim();
    form.value.studioUrl = this.normalizeUrl(form.value.studioUrl);
    this.data.environment = this.data.environment.toLowerCase();
    this.locationService
      .update(this.data, form.value)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.locationService.locations =
          this.locationService.locations.concat(value);
        this.snackBar.open(
          this.translateService.instant('snackBar.formSuccessfullySubmitted'),
          '',
          {
            duration: 2000,
            panelClass: ['green-snackbar'],
          }
        );
      });
  }
}
