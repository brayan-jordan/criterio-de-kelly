import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './views/calculator/calculator.component';
import { HomeComponent } from './views/home/home.component';
import { MethodsComponent } from './views/methods/methods.component';
import { TipsComponent } from './views/tips/tips.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'methods',
    component: MethodsComponent,
  },
  {
    path: 'tips',
    component: TipsComponent,
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
