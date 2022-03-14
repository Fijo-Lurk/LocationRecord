import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-table-data',
  templateUrl: './create-table-data.component.html',
  styleUrls: ['./create-table-data.component.scss'],
})
export class CreateTableDataComponent implements OnInit {
  environment = ['dev', 'test', 'staging', 'prod'];
  showForm = false;
  tableForm = new FormGroup({
    customerId: new FormControl('', [Validators.required]),
    environment: new FormControl('', [Validators.required]),
    appId: new FormControl('', [Validators.required]),
    studioUrl: new FormControl('', [Validators.required]),
  });

  constructor(
    private snackBar: MatSnackBar,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  public getForm(): void {
    this.showForm ? (this.showForm = false) : (this.showForm = true);
  }

  public onSubmit(form: FormGroupDirective) {
    this.showForm = false;
    this.tableForm.reset();
    this.snackBar.open(
      this.translateService.instant('form.genericeFormSuccessfulCompleted'),
      '',
      {
        duration: 2000,
        panelClass: ['green-snackbar'],
      }
    );
  }

  public onClear(): void {
    this.tableForm.reset();
    3;
  }
}
