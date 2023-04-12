import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { DisplayMonthComponent } from './components/display-month/display-month.component';
import { HeaderComponent } from './components/header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { CreatePeriodComponent } from './components/create-period/create-period.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadComponent } from './components/upload/upload.component';
import { ChooseTypeComponent } from './components/choose-type/choose-type.component';
import { TestUploadComponent } from './components/test-upload/test-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    DisplayMonthComponent,
    HeaderComponent,
    CreatePeriodComponent,
    FooterComponent,
    UploadComponent,
    ChooseTypeComponent,
    TestUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
