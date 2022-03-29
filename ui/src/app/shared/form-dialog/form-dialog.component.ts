import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LocationData } from 'src/app/shared/location-data';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { LocationService } from '../service/location.service';

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
    customer_id: new FormControl(this.data.customer_id, [Validators.required]),
    environment: new FormControl(this.data.environment, [Validators.required]),
    app_id: new FormControl(this.data.app_id),
    studio_url: new FormControl(this.data.studio_url, [Validators.required]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: LocationData,
    public translateService: TranslateService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {}

  onSubmit(form?: FormGroupDirective) {
    form.value.environment = form.value.environment.toLowerCase();
    this.locationService.update(this.data, form.value).subscribe();
  }
}
