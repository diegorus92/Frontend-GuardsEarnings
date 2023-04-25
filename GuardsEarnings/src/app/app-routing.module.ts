import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardSelectorComponent } from './_components/guards/guard-selector/guard-selector.component';
import { GuardComponent } from './_components/guards/guard/guard.component';

const routes: Routes = [
  {path:'guard/selector', component:GuardSelectorComponent},
  {path:'guard', component:GuardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
