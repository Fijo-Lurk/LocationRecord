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
import { getLocaleEraNames, registerLocaleData } from '@angular/common';
import { environment } from 'src/environments/environment';

export function localeInitializer(translate: TranslateService) {
  return async () => {
    translate.setDefaultLang('en');
    if (localStorage.getItem('i18n') === 'se') {
      translate.use('se');
    }
    registerLocaleData(localeEs, localeEsExtra);
    registerLocaleData(localeSv, localeSvExtra);
  };
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainNavComponent,
    LanguageSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
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
