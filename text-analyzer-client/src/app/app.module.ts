import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { InputFormComponent } from './components/input-form/input-form.component';
import { TextAnalysisResultComponent } from './components/text-analysis-result/text-analysis-result.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { JsonFormatterDirective } from './directives/json-formatter.directive';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputFormComponent,
    TextAnalysisResultComponent,
    JsonFormatterDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
