import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardSelectorComponent } from './_components/guards/guard-selector/guard-selector.component';

const routes: Routes = [
  {path:'guard/selector', component:GuardSelectorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
