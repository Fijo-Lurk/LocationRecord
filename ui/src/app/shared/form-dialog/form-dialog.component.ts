import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { LocationService } from '../service/location.service';

@UntilDestroy()
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  @ViewChild('update', { static: false }) okButton!: MatButton;
  @ViewChild('cancel', { static: false }) cancelButton!: MatButton;
  environment = ['Production', 'Staging', 'Development', 'Sandbox1'];
  selectedEnvironment = this.data.environment;

  public locationForm = new FormGroup({
    studioUrl: new FormControl(this.data.studioUrl, [
      Validators.required,
      Validators.pattern(
        '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
      ),
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
    private locationService: LocationService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: FormGroupDirective) {
    this.data.environment = this.data.environment.toLowerCase();
    this.locationService
      .update(this.data, form.value)
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
