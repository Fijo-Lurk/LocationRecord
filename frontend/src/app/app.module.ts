import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MainNavComponent, LanguageSelectorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
