import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import localeSv from '@angular/common/locales/sv';
import localeSvExtra from '@angular/common/locales/extra/sv';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { registerLocaleData } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { FormDialogComponent } from './shared/form-dialog/form-dialog.component';
import { CreateTableDataComponent } from './create-table-data/create-table-data.component';
import { LocationTableComponent } from './location-table/location-table.component';

export function localeInitializer(translate: TranslateService) {
  return async () => {
    if (localStorage.getItem('i18n') === 'se') {
      translate.use('se');
    }
    registerLocaleData(localeEs, localeEsExtra);
    registerLocaleData(localeSv, localeSvExtra);
  };
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainNavComponent,
    LanguageSelectorComponent,
    LocationTableComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    CreateTableDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [TranslateService],
      useFactory: localeInitializer,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
