import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { HeaderComponent } from './components/header/header.component';
import { CalculatorComponent } from './views/calculator/calculator.component';
import { HomeComponent } from './views/home/home.component';
import { MethodsComponent } from './views/methods/methods.component';
import { TipsComponent } from './views/tips/tips.component';

@NgModule({
  declarations: [
    AppComponent,
    AppIconComponent,
    HeaderComponent,
    CalculatorComponent,
    HomeComponent,
    MethodsComponent,
    TipsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
