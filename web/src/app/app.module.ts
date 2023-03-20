import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { HeaderComponent } from './components/header/header.component';
import { CalculatorComponent } from './views/calculator/calculator.component';
import { MethodsComponent } from './views/methods/methods.component';
import { TipsComponent } from './views/tips/tips.component';
import { LoaderComponent } from './components/loader/loader.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { NotFoundDataComponent } from './components/not-found-data/not-found-data.component';

@NgModule({
  declarations: [
    AppComponent,
    AppIconComponent,
    HeaderComponent,
    CalculatorComponent,
    MethodsComponent,
    TipsComponent,
    LoaderComponent,
    InputComponent,
    ButtonComponent,
    NotFoundDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
