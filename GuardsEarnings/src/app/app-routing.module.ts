import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardSelectorComponent } from './_components/guards/guard-selector/guard-selector.component';
import { GuardComponent } from './_components/guards/guard/guard.component';
import { WorkUpsertComponent } from './_components/works/work-upsert/work-upsert.component';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './_components/principal/principal/principal.component';
import { GuardUpsertComponent } from './_components/guards/guard-upsert/guard-upsert.component';

const routes: Routes = [
  {path:"", component:PrincipalComponent, pathMatch:"full"},
  {path:'guard/selector', component:GuardSelectorComponent},
  {path:'guard', component:GuardComponent},
  {path:'work-upsert', component:WorkUpsertComponent},
  {path:'guard-upsert', component:GuardUpsertComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
