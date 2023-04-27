import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { RequestComponent } from './components/request/request.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'request/:id',
    component: RequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
