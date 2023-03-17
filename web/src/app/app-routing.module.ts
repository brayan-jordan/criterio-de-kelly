import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './views/calculator/calculator.component';
import { MethodsComponent } from './views/methods/methods.component';
import { TipsComponent } from './views/tips/tips.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tips',
    pathMatch: 'full',
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
