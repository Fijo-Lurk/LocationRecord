import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { LocationData } from '../shared/location-data';
import { LocationService } from '../shared/service/location.service';

@UntilDestroy()
@Component({
  selector: 'app-create-table-data',
  templateUrl: './create-table-data.component.html',
  styleUrls: ['./create-table-data.component.scss'],
})
export class CreateTableDataComponent implements OnInit {
  environment = ['production', 'staging', 'development', 'sandbox1'];
  showForm = false;
  locations: LocationData[];
  appIds: string[] = [];
  private appIdNames: string[] = [];
  public appIdSuggestions: Observable<string[]>;

  appIdPattern = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i;
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
  findLocationMatchValidator: ValidatorFn = (control: AbstractControl) => {
    let validForm = true;
    const isMatch = this.locations.find(
      (location) =>
        location.customerId === control.value.customerId &&
        location.appId === control.value.appId &&
        location.environment === control.value.environment
    );
    if (isMatch) {
      Object.keys(this.locationForm.controls).forEach((key) => {
        this.locationForm.controls[key].setErrors({ invalidForm: true });
      });
      validForm = false;
    } else {
      validForm = true;
    }

    return validForm ? null : { invalidForm: true };
  };

  locationForm = new FormGroup({
    customerId: new FormControl('', [Validators.required]),
    environment: new FormControl('', [Validators.required]),
    appId: new FormControl('', [
      Validators.required,
      Validators.pattern(this.appIdPattern),
    ]),
    studioUrl: new FormControl('', [
      this.urlValidator,
      Validators.required,
      Validators.pattern('https?://([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
    ]),
  });

  constructor(
    private snackBar: MatSnackBar,
    public translateService: TranslateService,
    private locationService: LocationService
  ) {
    this.locationForm.setValidators(this.findLocationMatchValidator);
  }

  ngOnInit(): void {
    this.applicationSuggestions();
  }

  public onSubmit(form: FormGroupDirective) {
    form.value.studioUrl = this.normalizeUrl(form.value.studioUrl);
    form.value.appUd = form.value.appId.trim();
    form.value.customerId = form.value.customerId.trim();
    form.value.studioUrl = form.value.studioUrl.trim();
    this.locationService
      .create(form.value)
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
    this.showForm = false;
    this.locationForm.reset();
  }

  public onClear(): void {
    this.locationForm.reset();
  }

  applicationSuggestions() {
    this.appIdSuggestions = this.locationForm.get('appId').valueChanges.pipe(
      startWith(''),
      map((value) =>
        value
          ? this.appIdNames.filter((appId) =>
              appId.toLowerCase().includes(value.toLowerCase())
            )
          : []
      )
    );
    this.locationService
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe((locations: LocationData[]) => {
        this.locations = locations;
        const uniqueAppId = new Set(
          locations.map((location) => location.appId)
        );
        this.appIdNames = Array.from(uniqueAppId);
      });
  }
}
