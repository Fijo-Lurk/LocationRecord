import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from '../shared/service/location.service';

@UntilDestroy()
@Component({
  selector: 'app-create-table-data',
  templateUrl: './create-table-data.component.html',
  styleUrls: ['./create-table-data.component.scss'],
})
export class CreateTableDataComponent implements OnInit {
  environment = ['Production', 'Staging', 'Development', 'Sandbox1'];
  showForm = false;
  locationForm = new FormGroup({
    customer_id: new FormControl('', [Validators.required]),
    environment: new FormControl('', [Validators.required]),
    app_id: new FormControl('', [Validators.required]),
    studio_url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
      ),
    ]),
  });

  constructor(
    private snackBar: MatSnackBar,
    public translateService: TranslateService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {}

  public getForm(): void {
    this.showForm ? (this.showForm = false) : (this.showForm = true);
  }

  public onSubmit(form: FormGroupDirective) {
    form.value.environment = form.value.environment.toLowerCase();
    this.locationService
      .create(form.value)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.snackBar.open(
          this.translateService.instant('form.genericeFormSuccessfulCompleted'),
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
}
